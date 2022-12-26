import './App.css';
import Search from './components/Search';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TimezoneDate from './components/Date';

const App = () => {
  const [degrees, setDegrees] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [country, setCountry] = useState('');
  const [userLocation, setUserLocation] = useState('Seoul');
  const [timezone, setTimezone] = useState(null);
  const [imgUrl, setImgUrl] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userLocation.toLowerCase()}&appid=${
          process.env.REACT_APP_API_KEY
        }&units=metric`
      );
      const data = await res.data;

      setDegrees(data.main.temp);
      setLocation(data.name);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCountry(data.sys.country);
      setTimezone(data.timezone);
    } catch (err) {
      alert('Please enter a valid location');
    }
  };

  const fetchImg = async () => {
    fetch(`https://source.unsplash.com/featured/?${userLocation}`).then((resp) => {
      setImgUrl(resp.url);
    });
  };

  useEffect(() => {
    fetchImg();
    fetchData();
  }, [userLocation]);

  return (
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
          <h3>Weather in {location}</h3>
        </div>
        <div>
          <h1 className="weather_degrees">{degrees} ˚C</h1>
        </div>
        <div className="weather_description">
          <div>
            <div className="weather_description_head">
              <span className="weather_description_icon">
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
              </span>
              <h3>{description}</h3>
            </div>
            <h3>Humidity: {humidity}%</h3>
            <h3>Wind speed: {wind} m/s</h3>
          </div>
          <TimezoneDate country={country} timezone={timezone} />
        </div>
      </div>
    </div>
  );
};

export default App;
