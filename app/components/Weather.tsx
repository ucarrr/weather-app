"use client"; // Bu satırı ekleyin

import React, { useState } from "react";
import { getWeatherData } from "../services/WeatherService";
import Image from "next/image";
import img from "@/public/images/image1.png";
import { IoIosSearch } from "react-icons/io";

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
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
    <div className="flex w-full h-screen mt-28 items-center justify-center gap-10">
       
       {/* First Page */} 
      <div className="flex flex-row-reverse justify-center items-start w-5/6 gap-5">
        {/* <h1 className='text-black/50 text-[25px] font-semibold w-3/4'>Weather Forecast</h1> */}
        <div className="flex flex-col w-5/6 lg:w-1/3 items-start justify-start gap-3">
          <div className="flex gap-1 items-center">
            <div className="px-6 py-3 flex border border-lightGray w-[366px] rounded-lg items-center justify-between shadow-sm font-inter text-[14px] leading-[14px] font-normal">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              
            />
           <button  onClick={handleSearch}>
           <IoIosSearch size={20}  color="#DBDFE9"/>
           </button>
            </div>
           
          </div>
          <div className="flex flex-col items-center justify-center text-center  p-[40px] gap-4 font-inter text-lightDark border border-lightGray rounded-lg shadow-sm">
            <h1 className=" leading-[38.73px] text-[32px] font-bold ">
              Select a City
            </h1>
            <p className="text-[16px] font-normal leading-[19.36px]">
              Search and select a city to see results. Try typing the first
              letters of the city you want.
            </p>
          </div>
        </div>

        {/* foto */}
        <div className="flex w-5/6 lg:w-2/3 items-center justify-center">
          <Image
            src={img}
            alt="select city"
            width={640}
            height={454}
            layout="contain"
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="absolute w-5/6 lg:w-2/3 items-center justify-center">
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
                    <tr
                      key={index}
                      onClick={() => setSelectedDay(day)}
                      style={{ cursor: "pointer" }}
                    >
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
    </div>
  );
};

export default Weather;
