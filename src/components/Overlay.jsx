import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './styles/Overlay.css';

function Overlay({ children }) {
  return createPortal(
    <div className="Overlay">{children}</div>,
    document.getElementById('App')
  );
}

Overlay.propTypes = {
  children: PropTypes.node,
};

Overlay.defaultProps = {
  children: null,
};

export default Overlay;
