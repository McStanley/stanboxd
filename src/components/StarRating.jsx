import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import './styles/StarRating.css';

function StarRating({ value, setValue }) {
  const isInteractive = !!setValue;

  const handleChange = (_e, newValue) => newValue && setValue(newValue);

  const sxStyles = {
    '& .MuiRating-iconEmpty': {
      visibility: isInteractive ? 'visible' : 'hidden',
    },
    '& .MuiRating-iconFilled': {
      color: '#00e054',
    },
    '& .MuiRating-iconHover': {
      color: '#40bcf4',
    },
  };

  return (
    <div className="StarRating">
      {isInteractive && value && (
        <button
          className="StarRating-delete"
          type="button"
          onClick={() => setValue(null)}
        >
          ×
        </button>
      )}

      <Rating
        precision={0.5}
        size={isInteractive ? 'large' : 'small'}
        sx={sxStyles}
        value={value}
        readOnly={!isInteractive}
        onChange={isInteractive ? handleChange : null}
      />
    </div>
  );
}

StarRating.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
};

StarRating.defaultProps = {
  value: null,
  setValue: null,
};

export default StarRating;
