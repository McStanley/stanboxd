import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Poster.css';

function Poster({ id, path, size, altText }) {
  const posterEl = (
    <article className={`Poster ${id && 'Poster--clickable'}`}>
      <img src={`https://image.tmdb.org/t/p/${size}${path}`} alt={altText} />
    </article>
  );

  return id ? <Link to={`/film/${id}`}>{posterEl}</Link> : posterEl;
}

Poster.propTypes = {
  id: PropTypes.number,
  path: PropTypes.string.isRequired,
  size: PropTypes.string,
  altText: PropTypes.string,
};

Poster.defaultProps = {
  id: null,
  size: 'original',
  altText: '',
};

export default Poster;
