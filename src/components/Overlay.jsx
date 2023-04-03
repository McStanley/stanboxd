import PropTypes from 'prop-types';
import './styles/Overlay.css';

function Overlay({ children }) {
  return <div className="Overlay">{children}</div>;
}

Overlay.propTypes = {
  children: PropTypes.node,
};

Overlay.defaultProps = {
  children: null,
};

export default Overlay;
