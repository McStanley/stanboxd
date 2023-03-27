import './styles/Header.css';

function Header() {
  return (
    <header className="Header">
      <h1 className="Header-title">Stanboxd</h1>
      <ul className="Header-list">
        <li>Sign in</li>
        <li>Create account</li>
        <li>Films</li>
        <li>Members</li>
      </ul>
      <input className="Header-search" type="text" name="search" id="search" />
    </header>
  );
}

export default Header;
