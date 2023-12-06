export interface coordsInterface {
  lat: string;
  lon: string;
}

export interface cityInterface {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  main: WeatherMain;
  weather: WeatherDescription[];
  timezone: string;
}
