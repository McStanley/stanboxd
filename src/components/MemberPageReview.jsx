import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Poster from './Poster';
import StarRating from './StarRating';
import './styles/MemberPageReview.css';

function MemberPageReview({
  filmId,
  filmTitle,
  filmRelease,
  posterPath,
  rating,
  text,
}) {
  const releaseYear = filmRelease ? new Date(filmRelease).getFullYear() : null;

  return (
    <article className="MemberPageReview">
      <div className="MemberPageReview-posterContainer">
        <Poster id={filmId} path={posterPath} size="w92" altText={filmTitle} />
      </div>
      <div className="MemberPageReview-main">
        <div className="MemberPageReview-header">
          <Link to={`/film/${filmId}`}>
            <p className="MemberPageReview-filmTitle">{filmTitle}</p>
          </Link>
          <p className="MemberPageReview-filmReleaseYear">{releaseYear}</p>
        </div>
        {rating ? (
          <StarRating value={rating} />
        ) : (
          <p className="MemberPageReview-noRating">⸺</p>
        )}
        <p className="MemberPageReview-text">{text}</p>
      </div>
    </article>
  );
}

MemberPageReview.propTypes = {
  filmId: PropTypes.number.isRequired,
  filmTitle: PropTypes.string.isRequired,
  filmRelease: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default MemberPageReview;
