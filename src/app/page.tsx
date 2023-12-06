"use client";
import { SearchBar, WeatherContanier } from "@/Components";
import { cityInterface } from "@/Types";
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

  return (
    <div className="w-screen h-screen relative">
      <Image
        src="/bg.jpg"
        alt="bg"
        className="rounded-none h-screen w-screen object-cover"
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
