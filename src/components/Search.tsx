import React from 'react';
import './Search.css';
import { FiSearch, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Search = ({
  setUserLocation,
}: {
  setUserLocation: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [inputValue, setInputValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setInputValue(value);
  };

  const onClear = () => {
    setInputValue('');
  };

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    setUserLocation(inputValue);
  };

  return (
    <form className="weather_search" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="ex) London, New York, Berlin,..."
        className="search_input"
        value={inputValue}
        onChange={onChange}
      />
      {inputValue && (
        <span className="clear_icon" onClick={onClear}>
          <FiX />
        </span>
      )}
      <span className="search_icon" onClick={onSubmit}>
        <FiSearch />
      </span>
    </form>
  );
};

export default Search;
