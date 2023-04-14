import { useEffect, useRef, useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import SearchIcon from '../assets/search.svg';
import './styles/SearchBar.css';

function SearchBar() {
  const [value, setValue] = useState('');
  const location = useLocation();
  const match = useMatch('/search/:category/:query');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    const newValue = match?.params.query || '';
    setValue(newValue);
  }, [location]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    inputRef.current.blur();
    submitRef.current.blur();

    navigate(`/search/films/${encodeURIComponent(value)}`);
  };

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        className="SearchBar-input"
        type="text"
        value={value}
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="SearchBar-submit" type="submit" ref={submitRef}>
        <img className="SearchBar-icon" src={SearchIcon} alt="Search" />
      </button>
    </form>
  );
}

export default SearchBar;
