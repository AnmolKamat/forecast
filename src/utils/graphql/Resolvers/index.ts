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
  },
};

export default resolvers;
