"use client";

import React, { useState } from "react";
import { getWeatherData } from "../services/WeatherService";
import Image from "next/image";
import img from "@/public/images/image1.png";
import imgError from "@/public/images/image2.png"; // Hata resmi
import imgCloud from "@/public/images/cloud.png"; 
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
      setWeatherData(null); 
    } finally {
      setLoading(false);
    }
  };

  const getDayOfWeek = (dateStr: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const getFormattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex w-full h-screen mt-28 items-start justify-center gap-10">
      {/* Soldaki Resim veya Tablo */}
      <div className="flex flex-col lg:flex-row h-screen justify-start lg:justify-center w-[95%] gap-10 lg:gap-5 mt-0 items-center lg:items-start">
        {weatherData === null && !error ? (
          // Başlangıçtaki Fotoğraf (başlangıçta görünen)
          <div className="flex w-3/5 lg:w-2/3 items-center justify-center">
            <Image
              src={img}
              alt="select city"
              width={640}
              height={454}
              layout="contain"
            />
          </div>
        ) : weatherData === null && error ? (
          // Hata Fotoğrafı (city bulunamazsa görünen)
          <div className="flex w-3/5 lg:w-2/3 items-center justify-center">
            <Image
              src={imgError}
              alt="city not found"
              width={640}
              height={454}
              layout="contain"
            />
          </div>
        ) : (
          // Tablonun geleceği kısım (şehri bulduğunda)
          <div className="flex w-5/6 lg:w-2/3 items-center justify-center font-inter ">
            <table className="">
              <thead>
                <tr>
                  <th className="text-[16px] font-semibold leading-[16px] text-[#071437] h-[16px]" colSpan={4}>Weather Forecast for {weatherData.city_name}</th>
                </tr>
                <tr className="text-[13px] leading-[14px] font-normal text-[#4B5675] h-[40px] ">
                  <th>Days</th>
                  <th>Dates</th>
                  <th>Lowest Temp.</th>
                  <th>Highest Temp.</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.data.map((day: any, index: number) => (
                  <tr
                  className="text-[14px] leading-[14px] text-[#252F4A] font-normal"
                    key={index}
                    onClick={() => setSelectedDay(day)}
                    style={{ cursor: "pointer" }}
                  >
                    <td >{getDayOfWeek(day.datetime)}</td> {/* Günün adı */}
                    <td>{day.datetime}</td> {/* Tarih */}
                    <td>{day.low_temp}°C</td> {/* En düşük sıcaklık */}
                    <td>{day.high_temp}°C</td> {/* En yüksek sıcaklık */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sağdaki Search Box ve Weather Kartı */}
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

          {/* Weather Card */}
          

          {/* Error message */}
          <div className="flex flex-col items-center justify-center text-center p-[20px] lg:p-[30px] xl:p-[40px] gap-4 w-7/10 sm:w-2/3 lg:w-full xl:w-[360px] font-inter text-lightDark border border-lightGray rounded-lg shadow-sm">
            <h1 className="leading-normal xl:leading-[38.73px] text-[20px] lg:text-[28px] xl:text-[32px] font-bold w-full">
              {error ? "Does Not Exist" : weatherData ? weatherData.city_name : "Select a City"}
            </h1>
            {selectedDay && (
            <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
              <div className="text-5xl font-bold mb-2">{Math.round(selectedDay.temp)} °C</div>
              <div className="text-lg font-semibold">{weatherData.city_name}</div>
              <div className="text-sm text-gray-500">
                {getFormattedDate(selectedDay.datetime)}, {getDayOfWeek(selectedDay.datetime)}
              </div>
              <div className="flex items-center justify-center mt-4">
                <Image 
                  src={imgCloud}
                  alt={selectedDay.weather.description}
                  width={50}
                  height={50}
                />
                <div className="text-sm text-gray-600 ml-2">{selectedDay.weather.description}</div>
              </div>
            </div>
          )}
            <p className="text-[13px] lg:text-[15px] xl:text-[16px] font-normal leading-normal xl:leading-[19.36px] w-full">
              {error ? "The city you searched for could not be found." : weatherData ? "" : "Search and select a city to see results. Try typing the first letters of the city you want."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
