import React, { useState } from "react";
import axios from "axios";
import "../ContributorsLogin/ContributorsLogin.css"; // Reuse the same CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/forgotpassword', { email });

      if (data.success) {
        toast.success("Password reset link sent to your email.", {
          position: "top-right",
          autoClose: 3000,
        });
        setMessage('Check your inbox for a reset link.');
      } else {
        setError('Error sending reset email.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='contributors-log-container container'>
      <ToastContainer />
      <div className="contributors-log-left">
        <div className="mt-4 text-white contributors-log-page-jumbo">
          <h1>Forgot Your Password?</h1>
          <p>No worries! Enter your email and we’ll send you a reset link.</p>
        </div>
      </div>

      <div className="contributors-log-right">
        <div className='contributors-log-right-form-data'>
          <form onSubmit={handleSubmit}>
            <p className='contributors-log-right-head'>Reset Password</p>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <input
              className='form-control mb-3'
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className='btn btn-warning w-100' type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
