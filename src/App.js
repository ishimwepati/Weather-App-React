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

  return (
    <div className="container">
      <h1>WazaCode Weather App</h1>
      <h2>Enter a city name to get the weather</h2>
      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={getWeather}>Get Weather</button>
      <div id="weatherInfo">
        {error && <p>{error}</p>}
        {weatherData && (
          <div>
            <h2>
              {weatherData.name}, {weatherData.country}{' '}
              <img
                src={`https://flagcdn.com/w320/${weatherData.countryCode}.png`}
                alt={`${weatherData.country} flag`}
                width="30"
              />
            </h2>
            <p>{weatherData.description}</p>
            <p>Temperature: {weatherData.temp}°C</p>
            <p>Humidity: {weatherData.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
