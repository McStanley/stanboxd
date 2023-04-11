import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchIcon from '../assets/search.svg';
import './styles/SearchBar.css';

function SearchBar() {
  const [value, setValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    setValue('');
  }, [location.pathname]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        className="SearchBar-input"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button className="SearchBar-submit" type="submit">
        <img className="SearchBar-icon" src={SearchIcon} alt="Search" />
      </button>
    </form>
  );
}

export default SearchBar;
