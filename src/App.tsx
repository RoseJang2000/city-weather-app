import React from 'react';
import './App.css';
import Search from './components/Search';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TimezoneDate from './components/Date';
import { WeatherData } from './interfaces/AllTypes.interfaces';

const App = () => {
  const [weather, setWeather] = useState<WeatherData | undefined>(undefined);
  const [userLocation, setUserLocation] = useState('Seoul');
  const [imgUrl, setImgUrl] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userLocation.toLowerCase()}&appid=${
          process.env.REACT_APP_API_KEY
        }&units=metric`
      );
      const data = await res.data;
      setWeather({
        degrees: data.main.temp,
        location: data.name,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        country: data.sys.country,
        timezone: data.timezone,
      });
    } catch (err) {
      alert('Please enter a valid location');
    }
  };

  const fetchImg = async () => {
    fetch(`https://source.unsplash.com/featured/?${userLocation}`).then(
      (resp) => {
        setImgUrl(resp.url);
      }
    );
  };

  useEffect(() => {
    fetchImg();
    fetchData();
  }, [userLocation]);

  return (
    <>
      {weather && (
        <div
          className="App"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="weather_container">
            <Search setUserLocation={setUserLocation} />
            <div className="weather_location">
              <h3>Weather in {weather.location}</h3>
            </div>
            <div>
              <h1 className="weather_degrees">{weather.degrees} ˚C</h1>
            </div>
            <div className="weather_description">
              <div>
                <div className="weather_description_head">
                  <span className="weather_description_icon">
                    <img
                      src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                      alt="weather icon"
                    />
                  </span>
                  <h3>{weather.description}</h3>
                </div>
                <h3>Humidity: {weather.humidity}%</h3>
                <h3>Wind speed: {weather.wind} m/s</h3>
              </div>
              <TimezoneDate
                country={weather.country}
                timezone={weather.timezone}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
