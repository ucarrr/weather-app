import axios from 'axios';

// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=0f3a086dfaed47a8ba132d264d6852e5
const API_KEY = '0f3a086dfaed47a8ba132d264d6852e5';
const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
//https://api.weatherbit.io/v2.0/forecast/daily?city=antalya&key=0f3a086dfaed47a8ba132d264d6852e5&days=7
export const getWeatherData = async (city: string) => {
    try {
        const response = await axios.get(`${BASE_URL}?city=${city}&key=${API_KEY}&days=7`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};
