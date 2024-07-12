import React, { useState, useEffect } from 'react';
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
  // I'll add more Country Codes 
};

function getCountryName(countryCode) {
  return countryCodes[countryCode] || countryCode;
}

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoordinates(latitude, longitude);
      }, error => {
        console.error(error);
        setError("Failed to fetch location. Please enter a city name.");
      });
    } else {
      setError("Geolocation is not supported by this browser. Please enter a city name.");
    }
  }, []);

  const getWeatherByCoordinates = (lat, lon) => {
    const apiKey = "8245eed4c441b8a07f475891ed5ea959";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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
    <div className="right">
      <div className='right-title'>
        <h3>WazaCode Weather App  </h3>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name"
          id='inputCity'
        />
        <button onClick={getWeather} id="getWeather">Get Weather</button>
      </div>

      <div id="weatherInfo">
        {error && <p>{error}</p>}
        {weatherData && (
          <div>
            <p className='temperature'> {weatherData.temp}°C</p>
            <p>{weatherData.description}</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <h2>
              {weatherData.name}, {weatherData.country}{' '}
              <img
                src={`https://flagcdn.com/w320/${weatherData.countryCode}.png`}
                alt={`${weatherData.country} flag`}
                width="30"
              />
            </h2>
            
            
          </div>
        )}
      </div>
      </div>
      <div className='left'>
        Hello
      </div>
    </div>
  );
}

export default App;
