import { Link } from 'react-router-dom';
import McStanley from '../assets/mcstanley.jpg';
import './styles/Author.css';

function Author() {
  return (
    <article className="Author">
      <h2 className="Author-title">Author</h2>
      <p className="Author-text">
        Stanboxd is crafted by a single developer in Warsaw, Poland, with no
        help from additional crew in Los Angeles, New York, Philadelphia and
        Delaware, USA.
      </p>
      <section className="Author-card">
        <img
          className="Author-photo"
          src={McStanley}
          alt="Stanisław Olejniczak"
        />
        <p className="Author-name">Stanisław Olejniczak</p>
        <p className="Author-role">Creator</p>
        <p className="Author-bio">
          Loves <Link to="/film/429203">The Old Man & the Gun</Link>, <br />
          <Link to="/film/4960">Synecdoche, New York</Link>,{' '}
          <Link to="/film/949">Heat</Link>, <br />
          <Link to="/film/622">The Ninth Gate</Link>
        </p>
      </section>
    </article>
  );
}

export default Author;
