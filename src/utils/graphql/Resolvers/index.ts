import unsplash from "@/utils/Unspash";

const getWeatherURI = "https://api.openweathermap.org/data/2.5/weather?";
const getCoordsURI = "http://api.openweathermap.org/geo/1.0/direct?";
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const resolvers = {
  Query: {
    getWeather: async (_: any, { lat, lon }: { lat: string; lon: string }) => {
      try {
        const response = await fetch(
          `${getWeatherURI}lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        if (response.ok) {
          const weatherData = await response.json();
          return weatherData;
        } else {
          return "error while getting weather data";
        }
      } catch (error) {
        console.error(error);
      }
    },
    getCoords: async (_: any, { query }: { query: string }) => {
      try {
        const response = await fetch(
          `${getCoordsURI}q=${query}&appid=${apiKey}&limit=15`
        );
        if (response.ok) {
          const cities = await response.json();
          return cities;
        }
      } catch (error) {
        console.error(error);
      }
    },
    getBg: async () => {
      try {
        const data: any = await unsplash.photos.getRandom({
          collectionIds: [
            "1319040",
            "1705422",
            "401922",
            "9663343",
            "1fmh8WnQtYg",
            "96625331",
            "627562",
          ],
          orientation: "landscape",
        });
        return data.response.urls.full;
      } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
