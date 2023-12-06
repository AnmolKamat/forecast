import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useQuery } from "@apollo/client";
import { queries } from "@/utils/graphql";
import { cityInterface } from "@/Types";
import { Spinner } from "@nextui-org/react";

type Props = {
  onChange: (city: cityInterface) => void;
};

const SearchBar = ({ onChange }: Props) => {
  const [value, setValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<cityInterface[]>([]);
  const { refetch: getCoords, loading } = useQuery(queries.GET_COORDS);
  const search = async () => {
    setShowResults(true);
    const { data } = await getCoords({ query: value });
    setResults(data.getCoords);
  };
  const handleClick = (city: cityInterface) => {
    onChange(city);
    setShowResults(false);
    setValue("");
    setResults([]);
  };
  return (
    <div className="relative">
      <Input
        label="Search"
        type="text"
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-white/60",
            "backdrop-blur-xl",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search city ..."
        endContent={
          <Search onClick={search} color="#000" className=" cursor-pointer" />
        }
        value={value}
        onValueChange={setValue}
        onKeyUp={(e) => {
          if (e.key === "enter" || e.keyCode === 13) search();
        }}
      />

      {showResults === true && (
        <div className="w-full bg-white/60 backdrop-blur-xl text-black rounded-xl absolute p-3 top-20 shadow-xl flex flex-col gap-2  z-10 scroll-bar">
          <X
            className="absolute top-2 right-2 z-50 cursor-pointer"
            onClick={() => setShowResults(false)}
          />
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="font-bold text-xl ">Select City : </h1>
              {results.map((city, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(city)}
                  className="bg-white/20 backdrop-blur-xl p-2 rounded-xl z-40"
                >
                  <h1 className="text-black text-lg font-bold">{city.name}</h1>
                  <p className=" text-slate-800">
                    {city.state},{city.country}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
