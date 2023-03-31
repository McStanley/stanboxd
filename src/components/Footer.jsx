import { Link } from 'react-router-dom';
import GithubLogo from '../assets/github.svg';
import './styles/Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer-content">
        <div className="Footer-top">
          <nav className="Footer-nav">
            <ul>
              <li>About</li>
              <li>News</li>
              <li>Pro</li>
              <li>Apps</li>
              <li>Podcast</li>
              <li>Year in Review</li>
              <li>Gift Guide</li>
              <li>Help</li>
              <li>Terms</li>
              <li>API</li>
              <li>Contact</li>
            </ul>
          </nav>
          <a
            href="https://github.com/McStanley/stanboxd"
            target="_blank"
            rel="noreferrer"
          >
            <img className="Footer-githubLogo" src={GithubLogo} alt="Github" />
          </a>
        </div>
        <p className="Footer-bottom">
          ©{' '}
          <a
            href="https://github.com/McStanley"
            target="_blank"
            rel="noreferrer"
          >
            Stanisław Olejniczak
          </a>
          . <Link to="/about/film-data">Film data</Link> from{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDb
          </a>
          . Inspired by{' '}
          <a href="https://letterboxd.com/" target="_blank" rel="noreferrer">
            Letterboxd
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
