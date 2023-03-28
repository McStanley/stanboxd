import PropTypes from 'prop-types';
import './styles/Background.css';

function Background({ path }) {
  const imageURL = `https://image.tmdb.org/t/p/w1280${path}`;

  const styles = {
    backgroundImage: `url(${imageURL})`,
  };

  return (
    <div className="Background" style={styles}>
      <img className="Background-image" src={imageURL} alt="" />
    </div>
  );
}

Background.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Background;
