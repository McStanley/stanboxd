/* eslint-disable jsx-a11y/label-has-associated-control */

import { useId, useState } from 'react';
import { toast } from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { db, isUsernameAvailable } from '../firebase';
import checkUsernameValidity from '../utils/checkUsernameValidity';
import './styles/ProfileSettings.css';

function ProfileSettings({ uid, currentUsername }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState(currentUsername);
  const usernameInputId = useId();

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.activeElement.blur();
    toast.dismiss();

    if (username === currentUsername) return;

    try {
      checkUsernameValidity(username);
    } catch (error) {
      toast.error(error.message);
      return;
    }

    setIsSubmitting(true);

    const usernameLc = username.toLowerCase();
    const currentUsernameLc = currentUsername.toLowerCase();

    if (
      usernameLc === currentUsernameLc ||
      (await isUsernameAvailable(username))
    ) {
      const userRef = doc(db, 'users', uid);

      await updateDoc(userRef, {
        username,
        usernameLc,
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
