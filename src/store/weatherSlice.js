// features/weather/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CITIES_STORAGE_KEY = 'weatherCities';

function saveCitiesToLocalStorage(cities) {
    localStorage.setItem(CITIES_STORAGE_KEY, JSON.stringify(cities));
}

function loadCitiesFromLocalStorage() {
    const citiesData = localStorage.getItem(CITIES_STORAGE_KEY);
    return citiesData ? JSON.parse(citiesData) : [];
}

const API_KEY = '03fc9f292e854987998173950241104'

// Async thunk to fetch weather data for a city
export const fetchWeatherDataForCity = createAsyncThunk(
    'weather/fetchWeatherDataForCity',
    async (city, { rejectWithValue }) => {
        try {
            const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`);

            const country = weatherResponse.data.location.country

            // Fetch country code from REST Countries API
            const countryUrl = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
            const countryResponse = await axios.get(countryUrl);
            const countryCode = countryResponse.data[0].cca2;  // ISO 3166-1 alpha-2 code

            return {
                ...weatherResponse.data,
                countryCode
            };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    cities: loadCitiesFromLocalStorage(),
    forecasts: {},
    loading: false,
    error: null,
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        removeCity(state, action) {
            const cityName = action.payload.toLocaleLowerCase('en-US')
            state.cities = state.cities.filter(city => city.name.toLocaleLowerCase('en-US') !== cityName);
            saveCitiesToLocalStorage(state.cities);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherDataForCity.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWeatherDataForCity.fulfilled, (state, action) => {
                const existingIndex = state.cities.findIndex(city => city.weather.location.name === action.meta.arg);
                if (existingIndex !== -1) {
                    state.cities[existingIndex] = {
                        name: action.meta.arg,
                        weather: action.payload
                    };
                } else {
                    state.cities.push({
                        name: action.meta.arg,
                        weather: action.payload
                    });
                }
                saveCitiesToLocalStorage(state.cities);
                state.loading = false;
            })
            .addCase(fetchWeatherDataForCity.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});




export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
