import TMDBLogo from '../assets/tmdb.svg';
import './styles/FilmData.css';

function FilmData() {
  return (
    <article className="FilmData">
      <h2 className="FilmData-title">Film data</h2>
      <p className="FilmData-text">
        All film-related metadata used in Stanboxd, including actor, director
        and studio names, synopses, release dates, trailers and poster art is
        supplied by The Movie Database (TMDb).
      </p>
      <img className="FilmData-logo" src={TMDBLogo} alt="TMDB" />
      <p className="FilmData-notice">
        Stanboxd uses the TMDb API but is not endorsed or certified by TMDb.
      </p>
    </article>
  );
}

export default FilmData;
