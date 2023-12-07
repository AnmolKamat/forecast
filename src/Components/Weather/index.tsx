import { WeatherData, cityInterface } from "@/Types";
import { IconKey, icons } from "@/utils/Icons";
import { queries } from "@/utils/graphql";
import { useQuery } from "@apollo/client";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  city: cityInterface;
};

const WeatherContanier = ({ city }: Props) => {
  const {
    refetch: getWeather,
    data: weatherData,
    loading,
  } = useQuery(queries.GET_WEATHER, {
    variables: { lat: city.lat, lon: city.lon },
  });
  const [weather, setWeather] = useState<WeatherData>(weatherData);
  useEffect(() => {
    const fetchWeather = async () => {
      const { data } = await getWeather({
        lat: city.lat.toString(),
        lon: city.lon.toString(),
      });
      setWeather(data.getWeather);
    };
    fetchWeather();
  }, [city, getWeather]);
  const countryName = new Intl.DisplayNames(["en"], { type: "region" });
  const getTimeAndDate = (timezoneOffset: number) => {
    const currentDate = new Date();
    const utcMilliseconds =
      currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
    const shiftedMilliseconds = utcMilliseconds + timezoneOffset * 1000;
    const shiftedDate = new Date(shiftedMilliseconds);

    let hours = shiftedDate.getHours();
    const minutes = shiftedDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours || 12;

    const day = shiftedDate.getDate();
    const month = shiftedDate.toLocaleString("en-us", { month: "short" });
    const year = shiftedDate.getFullYear();
    return {
      time: { h: hours, m: minutes.toString().padStart(2, "0"), ampm: ampm },
      date: `${day} ${month} ${year}`,
    };
  };

  const [currentTime, setCurrentTime] = useState(
    getTimeAndDate(weather && +weather.timezone).time
  );
  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeAndDate(weather && +weather.timezone).time;
      setCurrentTime(time);
      setIsBlinking((prevBlinking) => !prevBlinking);
    }, 1000);

    return () => clearInterval(interval);
  }, [weather]);
  return (
    <div className="flex mt-24 mx-4 justify-between -z-20">
      <div className="bg-white/30 backdrop-blur-xl text-black w-fit rounded-xl p-8 min-w-[30rem] shadow-2xl ">
        {loading ? (
          <div className="h-44 flex justify-center items-center">
            <Spinner size="lg" color="default" />
          </div>
        ) : (
          <>
            {weather && (
              <>
                <div className="flex items-center">
                  <Image
                    src={
                      icons[`icon_${weather.weather[0].icon}` as IconKey].src
                    }
                    alt="icons"
                    width={200}
                    height={200}
                    className=" drop-shadow-2xl"
                  />
                  <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-xl capitalize">
                      {weather.weather[0].description}
                    </h1>
                    <h1 className="text-5xl">
                      {Math.floor(weather.main.temp - 273.15)}
                      <span className="text-xl">°C</span>
                    </h1>
                    <p>
                      Feels like {Math.floor(weather.main.feels_like - 273.15)}
                      <span>°C</span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="bg-white/30 backdrop-blur-xl text-black w-fit rounded-xl p-8 min-w-[30rem] text-end shadow-2xl ">
        {loading ? (
          <div className="h-44 flex justify-center items-center">
            <Spinner size="lg" color="default" />
          </div>
        ) : (
          <>
            <h1 className=" font-bold text-3xl">{city.name}</h1>
            <h1 className="text-xl">
              {city.state && `${city.state},`} {countryName.of(city.country)}
            </h1>
            <h1 className={`font-light text-[4rem] `}>
              {currentTime.h}
              <span className=" w-14">{isBlinking ? ":" : <>&nbsp;</>}</span>
              {currentTime.m} {currentTime.ampm}
            </h1>
            <h1 className="text-xl">
              {getTimeAndDate(weather && +weather.timezone).date}
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherContanier;
