import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import Clipboard from '../assets/clipboard.svg';
import './styles/Share.css';

function Share({ url }) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const inputRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsHovered(false), 1500);
  };

  const selectInputText = () => {
    inputRef.current.select();
  };

  const copyToClipboard = async () => {
    const text = inputRef.current.value;

    selectInputText();

    await navigator.clipboard.writeText(text);

    toast.success('Link copied to clipboard.', {
      id: 'clipboard',
    });
  };

  return (
    <div
      className="Share"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isHovered && 'Share'}
      {isHovered && (
        <>
          <input
            className="Share-input"
            type="text"
            value={url}
            readOnly
            onFocus={selectInputText}
            ref={inputRef}
          />
          <button
            className="Share-button"
            type="button"
            onClick={copyToClipboard}
          >
            <img src={Clipboard} alt="Clipboard" />
          </button>
        </>
      )}
    </div>
  );
}

Share.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Share;
