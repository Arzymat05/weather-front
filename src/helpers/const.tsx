export const weatherApi = "https://weather-bak.onrender.com";
// export const weatherApi = "http://localhost:8000";

export interface Weather {
    id: number;
    name: string;
    temperature: string;
    day: string;
    humidity: string;
    pressure: number;
    wind: string;
    windSpeed: number;
}

export interface CreateWeather {
    name: string;
    temperature: number;
    day: string;
    humidity: number;
    pressure: number;
    wind: string;
    windSpeed: number;
}
export interface WeatherState {
    loading: boolean;
    weatherArr: Weather[];
    oneWeather: Weather | null;
    error: string;
    translatedWeatherArr: Weather[];
}
export interface WeatherData {
    name: string;
    temperature: string;
    humidity: string;
    pressure: string;
    wind: string;
}
