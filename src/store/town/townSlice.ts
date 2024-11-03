import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOne, getTowns } from "./townAction";
import { WeatherState } from "../../helpers/const";
import { Weather } from "../../helpers/const";

const initialState: WeatherState = {
    loading: false,
    weatherArr: [],
    oneWeather: null,
    error: "",
    translatedWeatherArr: [],
};

const townSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setTranslatedWeatherArr: (state, action) => {
            state.translatedWeatherArr = action.payload;
        },
        clearOne: (state) => {
            state.oneWeather = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTowns.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getTowns.fulfilled,
                (state, action: PayloadAction<Weather[]>) => {
                    state.loading = false;
                    state.weatherArr = action.payload;
                    state.error = "";
                }
            )
            .addCase(getTowns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching towns";
            })
            .addCase(getOne.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getOne.fulfilled, (state, action) => {
                state.oneWeather = action.payload;
            })
            .addCase(getOne.rejected, (state) => {
                state.error = "error";
            });
    },
});

export const { setTranslatedWeatherArr, clearOne } = townSlice.actions;
export default townSlice.reducer;
