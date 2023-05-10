/* eslint-disable jsx-a11y/label-has-associated-control */

import { useId, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { confirmPasswordReset, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './styles/PasswordReset.css';

function PasswordReset() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const oobCode = searchParams.get('oobCode');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordId = useId();
  const confirmPasswordId = useId();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    document.activeElement.blur();

    if (!password) {
      toast.error('Please enter a valid new password.');
      return;
    }

    if (!confirmPassword) {
      toast.error('Please enter a valid confirm new password.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error(
        'The passwords you entered were not identical. Please try again.'
      );
      return;
    }

    if (password.length < 6) {
      toast.error('Your new password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      await confirmPasswordReset(auth, oobCode, password);
      await signOut(auth);

      toast.success(
        'Your password has been changed. You may now sign in with your new password.'
      );
    } catch (error) {
      toast.error(
        'There was an error processing your request. Try generating a new password reset link.'
      );
    }

    navigate('/');
  };

  return (
    <main className="PasswordReset">
      <div className="PasswordReset-content">
        <h2 className="PasswordReset-header">Reset password</h2>
        <p className="PasswordReset-text">
          Reset the Stanboxd password for {email}...
        </p>
        <form className="PasswordReset-form">
          <label htmlFor={passwordId}>New password</label>
          <input
            type="password"
            id={passwordId}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor={confirmPasswordId}>Confirm password</label>
          <input
            type="password"
            id={confirmPasswordId}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className={`PasswordReset-button ${isSubmitting && 'disabled'}`}
            type="submit"
            onClick={handleSubmit}
          >
            Reset password
          </button>
        </form>
      </div>
    </main>
  );
}

export default PasswordReset;
