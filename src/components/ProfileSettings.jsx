/* eslint-disable jsx-a11y/label-has-associated-control */

import { useId, useState } from 'react';
import { toast } from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { db, isUsernameAvailable } from '../firebase';
import './styles/ProfileSettings.css';

function ProfileSettings({ uid, currentUsername }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameValue, setUsernameValue] = useState(currentUsername);
  const usernameInputId = useId();

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.activeElement.blur();
    toast.dismiss();

    if (usernameValue === currentUsername) return;

    if (usernameValue === '') {
      toast.error('Username cannot be empty.');
      return;
    }

    if (usernameValue.startsWith(' ')) {
      toast.error('Username cannot start with a space.');
      return;
    }

    if (usernameValue.endsWith(' ')) {
      toast.error('Username cannot end with a space.');
      return;
    }

    if (/\s\s/.test(usernameValue)) {
      toast.error('Username cannot have consecutive spaces.');
      return;
    }

    if (usernameValue.length > 24) {
      toast.error('Maximum username length is 24 characters.');
      return;
    }

    setIsSubmitting(true);

    const usernameValueLc = usernameValue.toLowerCase();
    const currentUsernameLc = currentUsername.toLowerCase();

    if (
      usernameValueLc === currentUsernameLc ||
      (await isUsernameAvailable(usernameValue))
    ) {
      const userRef = doc(db, 'users', uid);

      await updateDoc(userRef, {
        username: usernameValue,
        usernameLc: usernameValueLc,
      });

      toast.success('Username changed successfully.');
    } else {
      toast.error('This username is already taken.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="ProfileSettings">
      <p className="ProfileSettings-title">Profile</p>
      <form className="ProfileSettings-form" onSubmit={handleSubmit}>
        <div className="ProfileSettings-inputContainer">
          <label htmlFor={usernameInputId}>Username</label>
          <input
            type="text"
            id={usernameInputId}
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
        </div>
        <div className="ProfileSettings-buttons">
          <button
            className={`ProfileSettings-saveButton ${
              isSubmitting && 'disabled'
            }`}
            type="submit"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

ProfileSettings.propTypes = {
  uid: PropTypes.string.isRequired,
  currentUsername: PropTypes.string.isRequired,
};

export default ProfileSettings;
