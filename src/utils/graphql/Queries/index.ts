import gql from "graphql-tag";

const GET_COORDS = gql`
  query GetCoords($query: String) {
    getCoords(query: $query) {
      name
      lat
      lon
      country
      state
    }
  }
`;

const GET_WEATHER = gql`
  query GetWeather($lat: String, $lon: String) {
    getWeather(lat: $lat, lon: $lon) {
      main {
        temp
        feels_like
        temp_min
        temp_max
        pressure
        humidity
        sea_level
        grnd_level
      }
      weather {
        id
        main
        description
        icon
      }
      timezone
    }
  }
`;

const queries = { GET_COORDS, GET_WEATHER };

export default queries;
