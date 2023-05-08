/* eslint-disable jsx-a11y/label-has-associated-control */

import { useId, useState } from 'react';
import { toast } from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { db, isUsernameAvailable } from '../firebase';
import './styles/ProfileSettings.css';

function ProfileSettings({ uid, username }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameValue, setUsernameValue] = useState(username);
  const usernameInputId = useId();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.dismiss();

    if (usernameValue !== username) {
      if (usernameValue === '') {
        toast.error('Username cannot be empty.');
      } else if (await isUsernameAvailable(usernameValue)) {
        const userRef = doc(db, 'users', uid);

        await updateDoc(userRef, {
          username: usernameValue,
        });

        toast.success('Username changed successfully.');
      } else {
        toast.error('This username is already taken.');
      }
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
  username: PropTypes.string.isRequired,
};

export default ProfileSettings;
