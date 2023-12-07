"use client";
import { SearchBar, WeatherContanier } from "@/Components";
import { cityInterface } from "@/Types";
import { queries } from "@/utils/graphql";
import { useQuery } from "@apollo/client";
import { Image } from "@nextui-org/image";
import { useEffect, useState } from "react";

const App = () => {
  const [city, setCity] = useState<cityInterface | null>({
    country: "IN",
    lat: 12.8698101,
    lon: 74.8430082,
    name: "Mangaluru",
    state: "Karnataka",
  });
  const cityOnChange = (city: cityInterface) => setCity(city);
  const { refetch: getBg, data } = useQuery(queries.GET_BG);
  const [bg, setBg] = useState("/bg.jpg");
  useEffect(() => {
    const fetchBg = async () => {
      const { data } = await getBg();
      setBg(data.getBg);
    };
    fetchBg();
  }, [city, getBg]);

  return (
    <div className="w-screen h-screen relative">
      <Image
        src={bg}
        alt="bg"
        className="rounded-none h-screen w-screen object-fill"
      />
      <div className="absolute  w-screen h-screen top-0 left-0 z-50">
        <div className="w-2/6 mx-auto mt-12">
          <SearchBar onChange={cityOnChange} />
        </div>

        <WeatherContanier city={city!} />
      </div>
    </div>
  );
};

export default App;
