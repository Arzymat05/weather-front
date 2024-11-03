// townAction.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Weather, weatherApi } from "../../helpers/const";
import { RootState } from "../store";
import { setTranslatedWeatherArr } from "./townSlice";
import { WeatherData } from "../../helpers/helpers";
import { CreateWeather } from "../../helpers/const";
import { translate } from "@vitalets/google-translate-api";

export const getTowns = createAsyncThunk(
    "town/getTowns",
    async (lang: string, { getState }) => {
        const state = getState() as RootState;

        const res = await axios.get(`${weatherApi}/get/${lang}`);
        return res.data;
    }
);

export { setTranslatedWeatherArr };

export const createTown = createAsyncThunk(
    "town/createTown",
    async ({
        weatherEng,
        weatherRu,
    }: {
        weatherEng: CreateWeather;
        weatherRu: CreateWeather;
    }) => {
        const createEngObj = [
            {
                name: weatherEng.name,
                temperature: weatherEng.temperature,
                humidity: weatherEng.humidity,
                pressure: weatherEng.pressure,
                wind: weatherEng.wind,
                windSpeed: weatherEng.windSpeed,
            },
        ];
        const createRuObj = [
            {
                name: weatherRu.name,
                temperature: weatherRu.temperature,
                humidity: weatherRu.humidity,
                pressure: weatherRu.pressure,
                wind: weatherRu.wind,
                windSpeed: weatherRu.windSpeed,
            },
        ];
        console.log(createRuObj);
        console.log(createEngObj);

        await axios.post(`${weatherApi}/create/ru`, createRuObj);
        await axios.post(`${weatherApi}/create/eng`, createEngObj);
    }
);

export const editTown = createAsyncThunk(
    "town/createTown",
    async ({
        weatherEng,
        weatherRu,
        nameObj,
    }: {
        weatherEng: CreateWeather;
        weatherRu: CreateWeather;
        nameObj: { name: string; lang: string };
    }) => {
        const createEngObj = {
            name: weatherEng.name,
            temperature: weatherEng.temperature,
            humidity: weatherEng.humidity,
            pressure: weatherEng.pressure,
            wind: weatherEng.wind,
            windSpeed: weatherEng.windSpeed,
        };
        const createRuObj = {
            name: weatherRu.name,
            temperature: weatherRu.temperature,
            humidity: weatherRu.humidity,
            pressure: weatherRu.pressure,
            wind: weatherRu.wind,
            windSpeed: weatherRu.windSpeed,
        };

        const { lang, name } = nameObj;
        console.log(lang, name, createRuObj);

        if (lang == "eng") {
            console.log(createEngObj);

            await axios.patch(
                `${weatherApi}/update/${name}/${lang}`,
                createEngObj
            );
        }

        await axios.patch(`${weatherApi}/update/${name}/${lang}`, createRuObj);
    }
);

export const deleteOne = createAsyncThunk(
    "town/deleteTown",
    async (nameObj: { name: string; lang: string }) => {
        const { name, lang } = nameObj;
        await axios.delete(`${weatherApi}/delete/${name}/${lang}`);
    }
);

export const getOne = createAsyncThunk(
    "town/getOne",
    async (getOneObj: { name: string; lang: string }) => {
        const res = await axios.get(
            `${weatherApi}/get/${getOneObj.name}/${getOneObj.lang}`
        );
        return res.data;
    }
);

export const translateWeatherData = async (weatherArr: Weather[]) => {
    try {
        const translations = await Promise.all(
            weatherArr.map(async (weather) => {
                const result = await translate(weather.name, { to: "ru" });
                console.log(result);

                return {
                    ...weather,
                    translatedName: result.text,
                };
            })
        );

        return translations;
    } catch (error) {
        console.error("Translation error:", error);
        return [];
    }
};
