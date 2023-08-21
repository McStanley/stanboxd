/* eslint-disable jsx-a11y/label-has-associated-control */

import { useId, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import './styles/PasswordRequest.css';

function PasswordRequest() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputId = useId();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!email) {
      toast.error('Please enter your email address to reset your password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, email);

      toast.success(
        'We’ve emailed you a link you can use to reset your password.'
      );
      navigate('/');
    } catch (error) {
      document.activeElement.blur();
      setEmail('');
      toast.error('Sorry, no users with that email address were found.');
    }

    setIsSubmitting(false);
  };

  return (
    <main className="PasswordRequest">
      <Helmet>
        <title>Reset Password • Stanboxd</title>
      </Helmet>
      <div className="PasswordRequest-content">
        <h2 className="PasswordRequest-header">Reset my password</h2>
        <p className="PasswordRequest-text">
          Enter your email address below, and we’ll send you a link to reset
          your password.
        </p>
        <form className="PasswordRequest-form">
          <label htmlFor={inputId}>Email address</label>
          <input
            type="email"
            id={inputId}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className={`PasswordRequest-button ${isSubmitting && 'disabled'}`}
            type="submit"
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

export default PasswordRequest;
