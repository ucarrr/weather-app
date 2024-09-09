"use client";  // Bu satırı ekleyin

import React, { useState } from 'react';
import { getWeatherData } from '../services/WeatherService';

const Weather: React.FC = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<any[]>([]);
    const [selectedDay, setSelectedDay] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getWeatherData(city);
            setWeatherData(data.data);
            setSelectedDay(data.data[0]); // İlk günü varsayılan olarak seç
        } catch (err) {
            setError("City not found or API request failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex w-full bg-slate-100 flex-col h-screen mt-28 items-center justify-start gap-10'>
            <h1 className='text-black/50 text-[25px] font-semibold w-3/4'>Weather  Forecast</h1>
            <div className='flex items-center gap-4'>
            <input
            className='px-6 py-3 flex'
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button className='lg:text-[18px] text-[15px] leading-normal px-6 py-1 hover:bg-slate-500 hover:text-white rounded-md border border-gray-600' onClick={handleSearch}>Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

           <div className="flex w-5/6">
           {weatherData.length > 0 && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Temperature (°C)</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weatherData.map((day, index) => (
                                <tr key={index} onClick={() => setSelectedDay(day)} style={{ cursor: 'pointer' }}>
                                    <td>{day.datetime}</td>
                                    <td>{day.temp}</td>
                                    <td>{day.weather.description}</td>
                                    
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                    {selectedDay && (
                        <div>
                            <h2>Details for {selectedDay.datetime}</h2>
                            <p>Temperature: {selectedDay.temp}°C</p>
                            <p>Weather: {selectedDay.weather.description}</p>
                        </div>
                    )}
                </>
            )}
           </div>
        </div>
    );
};

export default Weather;
