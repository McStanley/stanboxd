import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Poster from './Poster';
import StarRating from './StarRating';
import './styles/FilmEntry.css';

function FilmEntry({ data, type }) {
  const releaseYear = data.release_date
    ? new Date(data.release_date).getFullYear()
    : null;

  const hasOriginalTitle =
    data.original_title &&
    data.original_title.toLowerCase() !== data.title.toLowerCase();

  return (
    <article className="FilmEntry">
      <div className="FilmEntry-posterContainer">
        <Poster
          id={data.id}
          path={data.poster_path}
          size="w154"
          altText={data.title}
        />
      </div>
      <div className="FilmEntry-details">
        <div className="FilmEntry-row">
          <Link to={`/film/${data.id}`}>
            <h3 className="FilmEntry-title">{data.title}</h3>
          </Link>
          <p className="FilmEntry-releaseYear">{releaseYear}</p>
        </div>
        <div className="FilmEntry-row">
          {type === 'search' && hasOriginalTitle && (
            <p className="FilmEntry-originalTitle">
              Original title: {data.original_title}
            </p>
          )}
          {type === 'popular' && <StarRating value={data.vote_average / 2} />}
        </div>
      </div>
    </article>
  );
}

FilmEntry.propTypes = {
  data: PropTypes.shape({
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    id: PropTypes.number,
    original_title: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
  type: PropTypes.oneOf(['popular', 'search']).isRequired,
};

export default FilmEntry;
