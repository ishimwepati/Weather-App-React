import React, { useState } from 'react';
import './App.css';

const countryCodes = {
  "US": "United States",
  "GB": "United Kingdom",
  "CA": "Canada",
  "FR": "France",
  "DE": "Germany",
  "IN": "India",
  "JP": "Japan",
  "CN": "China",
  "BR": "Brazil",
  "ZA": "South Africa",
  "UG": "Uganda",
  // I'll add more Here 
};

function getCountryName(countryCode) {
  return countryCodes[countryCode] || countryCode;
}

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const getWeather = () => {
    const apiKey = "8245eed4c441b8a07f475891ed5ea959";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const countryName = getCountryName(data.sys.country);
        setWeatherData({
          name: data.name,
          country: countryName,
          countryCode: data.sys.country.toLowerCase(),
          description: data.weather[0].description,
          temp: data.main.temp,
          humidity: data.main.humidity,
        });
        setError('');
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
        setWeatherData(null);
      });
  };
