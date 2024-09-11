"use client";

import React, { useState } from "react";
import { getWeatherData } from "../services/WeatherService";
import Image from "next/image";
import img from "@/public/images/image1.png";
import { IoIosSearch } from "react-icons/io";

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      setSelectedDay(data.data[0]); // İlk günü varsayılan olarak seç
    } catch (err) {
      setError("City not found or API request failed.");
    } finally {
      setLoading(false);
    }
  };

  const getDayOfWeek = (dateStr: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  return (
    <div className="flex w-full h-screen mt-28 items-start justify-center gap-10 ">

      {/* First Page */}
      {weatherData === null && (
        <div className="flex flex-col lg:flex-row h-screen justify-start lg:justify-center w-[95%] gap-10 lg:gap-5 mt-0 items-center lg:items-start" >
          {/* foto */}
          <div className="flex w-3/5 lg:w-2/3 items-center justify-center">
            <Image
              src={img}
              alt="select city"
              width={640}
              height={454}
              layout="contain"
            />
          </div>

          {/* search input */}
          <div className="flex flex-col w-5/6 lg:w-1/3 items-center lg:items-start justify-center lg:justify-start gap-7 lg:gap-3">
            <div className="flex items-center lg:items-start w-full justify-center lg:justify-start">
              <div className="px-4 py-2 lg:px-6 xl:py-3 flex border border-lightGray w-7/10 sm:w-2/3 lg:w-full xl:w-[360px] rounded-lg items-center justify-between shadow-sm font-inter text-[14px] leading-[14px] font-normal">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search a City"
                  className="w-2/3 bg-transparent focus:outline-none"
                />
                <button 
                  className="flex items-center justify-center h-10 rounded-lg"
                  onClick={handleSearch}>
                  <IoIosSearch size={20} color="#DBDFE9" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-[20px] lg:p-[30px] xl:p-[40px] gap-4 w-7/10 sm:w-2/3 lg:w-full xl:w-[360px] font-inter text-lightDark border border-lightGray rounded-lg shadow-sm">
              <h1 className="leading-normal xl:leading-[38.73px] text-[20px] lg:text-[28px] xl:text-[32px] font-bold w-full">
                Select a City
              </h1>
              <p className="text-[13px] lg:text-[15px] xl:text-[16px] font-normal leading-normal xl:leading-[19.36px] w-full">
                Search and select a city to see results. Try typing the first
                letters of the city you want.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Second Page */}
      <div className="absolute w-full mt-28 items-center justify-center gap-10">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {weatherData !== null && (
          <div className="absolute w-5/6 lg:w-2/3 items-center justify-center">
            <>
              <table>
                <thead>
                  <tr>
                    <th colSpan={4}>Weather Forecast for {weatherData.city_name}</th>
                  </tr>
                  <tr>
                    <th>Days</th>
                    <th>Dates</th>
                    <th>Lowest Temp.</th>
                    <th>Highest Temp.</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherData.data.map((day: any, index: number) => (
                    <tr
                      key={index}
                      onClick={() => setSelectedDay(day)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{getDayOfWeek(day.datetime)}</td> {/* Günün adı */}
                      <td>{day.datetime}</td> {/* Tarih */}
                      <td>{day.low_temp}°C</td> {/* En düşük sıcaklık */}
                      <td>{day.high_temp}°C</td> {/* En yüksek sıcaklık */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
