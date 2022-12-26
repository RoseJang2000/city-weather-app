import './Search.css';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const Search = ({ setUserLocation }) => {
  const [inputValue, setInputValue] = useState('');

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInputValue(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setUserLocation(inputValue);
  };

  return (
    <form className="weather_search" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Please enter location"
        className="search_input"
        onChange={onChange}
      />
      <span className="search_icon" onClick={onSubmit}>
        <FiSearch />
      </span>
    </form>
  );
};

export default Search;
