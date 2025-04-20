import React, { useState, useContext } from 'react';
import axios from 'axios';
import "../ContributorsLogin/ContributorsLogin.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Components/AuthContext/AuthContext';

function ContributorsLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: '' });
    setServerError('');
  };

  const validateFields = () => {
    const errors = {};
    const { email, password } = formData;

    if (!email.trim()) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/contributor/login',
        formData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );


      console.log('Login Success:', response.data);
      
      login(response.data.token);





      toast.success(' Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false,
      });

      setFormData({ email: '', password: '' });
      setFieldErrors({});

      setTimeout(() => {
        navigate('/contributors-page');
      }, 3000);
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      if (error.response?.data?.errors) {
        setServerError(error.response.data.errors[0].msg);
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    }
  };


  return (
    <div className='contributors-log-container container'>
      <ToastContainer />
      <div className="contributors-log-left">
        <div className="mt-4 text-white contributors-log-page-jumbo">
          <h1>Collaborate on Open Source</h1>
          <p>Connect with contributors, maintainers, and mentors in a seamless and interactive environment. Find the perfect project for your skills.</p>
        </div>
      </div>
      <div className="contributors-log-right">
        <div className='contributors-log-right-form-data'>
          <form onSubmit={handleSubmit}>
            <p className='contributors-log-right-head'>Contributors Login</p>

            {serverError && <div className="alert alert-danger">{serverError}</div>}

            <input
              className='form-control mb-1'
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && <small className="text-danger">{fieldErrors.email}</small>}

            <input
              className='form-control mb-3'
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
            {fieldErrors.password && <small className="text-danger">{fieldErrors.password}</small>}

            <button className='btn btn-warning w-100' type='submit'>Login</button>

            <div className='mt-3'>
              <Link className='maintainers-log-right-link' to="/contributor-reset-password">Forget Password?</Link>
            </div>
            <p className="mt-3">
              Don't have an account? <Link className='contributors-log-right-link' to="/contributors-registration">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContributorsLogin;
