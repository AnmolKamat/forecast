import { gql } from "graphql-tag";

const typeDefs = gql`
  type Coord {
    lon: Float
    lat: Float
  }

  type Weather {
    id: Int
    main: String
    description: String
    icon: String
  }

  type Main {
    temp: Float
    feels_like: Float
    temp_min: Float
    temp_max: Float
    pressure: Int
    humidity: Int
    sea_level: Int
    grnd_level: Int
  }

  type Wind {
    speed: Float
    deg: Int
    gust: Float
  }

  type Rain {
    _1h: Float
  }

  type Clouds {
    all: Int
  }

  type Sys {
    type: Int
    id: Int
    country: String
    sunrise: Int
    sunset: Int
  }

  type WeatherData {
    coord: Coord
    weather: [Weather]
    base: String
    main: Main
    visibility: Int
    wind: Wind
    rain: Rain
    clouds: Clouds
    dt: Int
    sys: Sys
    timezone: Int
    id: Int
    name: String
    cod: Int
  }
  type City {
    name: String
    lat: Float
    lon: Float
    country: String
    state: String
  }
  type Query {
    hello: String
    getWeather(lat: String, lon: String): WeatherData
    getCoords(query: String): [City]
    getBg: String
  }
`;

export default typeDefs;
