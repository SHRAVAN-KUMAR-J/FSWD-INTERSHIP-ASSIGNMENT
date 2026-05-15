import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [searchHistory, setSearchHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const convertTemperature = (temp, toUnit) => {
    if (toUnit === 'fahrenheit') {
      return (temp * 9/5 + 32).toFixed(1);
    }
    return temp.toFixed(1);
  };

  const getTemperatureUnit = () => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  const fetchWeather = async (searchCity = city) => {
    if (!searchCity.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecast(null);

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1`
      );
      
      if (!geoResponse.ok) {
        throw new Error('Failed to fetch location data');
      }

      const geoData = await geoResponse.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${searchCity}" not found`);
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherJson = await weatherResponse.json();
      
      const forecastResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      if (forecastResponse.ok) {
        const forecastJson = await forecastResponse.json();
        setForecast(forecastJson.daily);
      }
      
      const weatherCodeMap = {
        0: { desc: 'Clear sky', emoji: '☀️' },
        1: { desc: 'Mainly clear', emoji: '🌤️' },
        2: { desc: 'Partly cloudy', emoji: '⛅' },
        3: { desc: 'Overcast', emoji: '☁️' },
        45: { desc: 'Fog', emoji: '🌫️' },
        48: { desc: 'Rime fog', emoji: '🌫️' },
        51: { desc: 'Light drizzle', emoji: '🌧️' },
        53: { desc: 'Moderate drizzle', emoji: '🌧️' },
        55: { desc: 'Dense drizzle', emoji: '🌧️' },
        61: { desc: 'Slight rain', emoji: '☔' },
        63: { desc: 'Moderate rain', emoji: '☔' },
        65: { desc: 'Heavy rain', emoji: '🌧️' },
        71: { desc: 'Slight snow', emoji: '🌨️' },
        73: { desc: 'Moderate snow', emoji: '🌨️' },
        75: { desc: 'Heavy snow', emoji: '❄️' },
        77: { desc: 'Snow grains', emoji: '❄️' },
        80: { desc: 'Rain showers', emoji: '🌧️' },
        81: { desc: 'Moderate showers', emoji: '🌧️' },
        82: { desc: 'Violent showers', emoji: '🌊' },
        85: { desc: 'Snow showers', emoji: '🌨️' },
        86: { desc: 'Heavy snow showers', emoji: '❄️' },
        95: { desc: 'Thunderstorm', emoji: '⛈️' },
        96: { desc: 'Thunderstorm with hail', emoji: '⛈️' },
        99: { desc: 'Heavy thunderstorm', emoji: '⛈️' },
      };

      const currentWeather = weatherJson.current_weather;
      const humidityIndex = weatherJson.hourly?.time?.findIndex(
        (time) => time === currentWeather.time
      );
      const humidity = humidityIndex >= 0
        ? weatherJson.hourly.relativehumidity_2m[humidityIndex]
        : weatherJson.hourly?.relativehumidity_2m?.[0] ?? '--';

      const weatherInfo = weatherCodeMap[currentWeather.weathercode] || 
                         { desc: 'Unknown', emoji: '🌡️' };

      const newWeatherData = {
        city: name,
        country: country,
        temperature: currentWeather.temperature,
        windspeed: currentWeather.windspeed,
        humidity,
        description: weatherInfo.desc,
        emoji: weatherInfo.emoji,
        lat: latitude,
        lon: longitude
      };

      setWeatherData(newWeatherData);
      setLastUpdated(new Date().toLocaleTimeString());

      setSearchHistory(prev => {
        const filtered = prev.filter(item => 
          item.city.toLowerCase() !== name.toLowerCase()
        );
        return [{ city: name, country }, ...filtered].slice(0, 5);
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const handleHistoryClick = (historyCity) => {
    setCity(historyCity);
    fetchWeather(historyCity);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('weatherSearchHistory');
  };

  const refreshWeather = () => {
    if (weatherData) {
      fetchWeather(weatherData.city);
    }
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'} dashboard-horizontal`}>
      {/* Left Sidebar - Search & Controls */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h1>
            ⛅ Weather
            <span>API</span>
          </h1>
          <div className="header-controls">
            <button onClick={toggleUnit} className="unit-toggle" title="Toggle unit">
              {unit === 'celsius' ? '°C' : '°F'}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="search-card">
          <div className="input-wrapper">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
              className={error ? 'error' : ''}
            />
            {city && (
              <button type="button" className="clear-input" onClick={() => setCity('')}>
                ✕
              </button>
            )}
          </div>
          <button type="submit" disabled={loading} className="search-button">
            🔍
          </button>
          {weatherData && (
            <button type="button" onClick={refreshWeather} className="refresh-button" disabled={loading}>
              ↻
            </button>
          )}
        </form>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="search-history">
            <div className="history-header">
              <span>Recent:</span>
              <button onClick={clearHistory} className="clear-history">Clear</button>
            </div>
            <div className="history-items">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(item.city)}
                  className="history-item"
                >
                  {item.city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        {lastUpdated && (
          <div className="last-updated-sidebar">
            Updated: {lastUpdated}
          </div>
        )}
      </div>

      {/* Main Content Area - Weather Display */}
      <div className="dashboard-main">
        {/* Loading State */}
        {loading && (
          <div className="loading-skeleton horizontal">
            <div className="loading-icon"></div>
            <div className="loading-lines">
              <div className="loading-line short"></div>
              <div className="loading-line medium"></div>
              <div className="loading-line"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="error-card horizontal">
            <div className="error-icon">⚠️</div>
            <div className="error-details">
              <h3>Error</h3>
              <p>{error}</p>
              {weatherData && (
                <button onClick={refreshWeather} className="retry-button">
                  Retry
                </button>
              )}
            </div>
          </div>
        )}

        {/* Success State - Horizontal Layout */}
        {weatherData && !loading && !error && (
          <div className="weather-content-horizontal">
            {/* Main Weather Info */}
            <div className="weather-main-horizontal">
              <div className="city-info">
                <h2 className="city-name">
                  {weatherData.city}
                  <span className="country">{weatherData.country}</span>
                </h2>
                <div className="weather-description">
                  <span className="weather-emoji">{weatherData.emoji}</span>
                  <span>{weatherData.description}</span>
                </div>
              </div>

              <div className="temperature-info">
                <div className="temp-value">
                  {convertTemperature(weatherData.temperature, unit)}
                  <small>{getTemperatureUnit()}</small>
                </div>
              </div>

              <div className="weather-stats">
                <div className="stat-item">
                  <div className="stat-label">💨 Wind</div>
                  <div className="stat-value">{weatherData.windspeed} <small>km/h</small></div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">💧 Humidity</div>
                  <div className="stat-value">{weatherData.humidity}<small>%</small></div>
                </div>
              </div>
            </div>

            {/* Forecast Section - Horizontal Scroll */}
            {forecast && (
              <div className="forecast-section-horizontal">
                <button 
                  className="forecast-toggle"
                  onClick={() => setShowForecast(!showForecast)}
                >
                  {showForecast ? '▼' : '▶'} {showForecast ? 'Hide' : 'Show'} Forecast
                </button>
                
                {showForecast && (
                  <div className="forecast-scroll">
                    {forecast.time.map((date, index) => {
                      const weatherCodeMap = {
                        0: { emoji: '☀️' }, 1: { emoji: '🌤️' }, 2: { emoji: '⛅' },
                        3: { emoji: '☁️' }, 45: { emoji: '🌫️' }, 51: { emoji: '🌧️' },
                        61: { emoji: '☔' }, 71: { emoji: '🌨️' }, 95: { emoji: '⛈️' },
                      };
                      const weatherInfo = weatherCodeMap[forecast.weathercode[index]] || { emoji: '🌡️' };
                      return (
                        <div key={date} className="forecast-card">
                          <div className="forecast-day">
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="forecast-emoji">{weatherInfo.emoji}</div>
                          <div className="forecast-temps">
                            <span className="forecast-max">
                              {convertTemperature(forecast.temperature_2m_max[index], unit)}°
                            </span>
                            <span className="forecast-min">
                              {convertTemperature(forecast.temperature_2m_min[index], unit)}°
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons-horizontal">
              <button className="action-button" onClick={() => {
                const weatherText = `${weatherData.city}: ${weatherData.temperature}°C, ${weatherData.description}`;
                navigator.clipboard.writeText(weatherText);
                alert('Copied!');
              }}>
                📋 Copy
              </button>
              <button className="action-button" onClick={() => {
                window.open(`https://www.google.com/maps/search/?api=1&query=${weatherData.lat},${weatherData.lon}`, '_blank');
              }}>
                🗺️ Map
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;