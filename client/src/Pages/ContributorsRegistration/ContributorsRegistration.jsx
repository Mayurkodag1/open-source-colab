import React, { useState } from 'react';
import axios from 'axios';
import "../ContributorsRegistration/ContributorsRegistration.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContributorsRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: '' });
    setServerError('');
  };

  const validateFields = () => {
    const errors = {};
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!email.trim()) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    if (!confirmPassword) errors.confirmPassword = 'Confirm password is required';
    if (password && confirmPassword && password !== confirmPassword)
      errors.confirmPassword = 'Passwords do not match';

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
      await axios.post('http://localhost:3000/api/auth/contributor/register', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      toast.success('🎉 Registration successful! Redirecting...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      setFieldErrors({});

      setTimeout(() => {
        navigate("/contributors-login");
      }, 5000); // wait 5 seconds before redirect

    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        setServerError(error.response.data.errors[0].msg);
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className='contributors-reg-container container'>
      <ToastContainer />
      <div className="contributors-reg-left">
        <div className="mt-4 text-white contributors-reg-page-jumbo">
          <h1>Collaborate on Open Source</h1>
          <p>
            Connect with contributors, maintainers, and mentors in a seamless and interactive environment.
            Find the perfect project for your skills.
          </p>
        </div>
      </div>

      <div className="contributors-reg-right">
        <div className='contributors-reg-right-form-data'>
          <form onSubmit={handleSubmit}>
            <p className='contributors-reg-right-head'>Contributors Registration</p>

            {serverError && <div className="alert alert-danger">{serverError}</div>}

            <input
              className='form-control mb-1'
              type='text'
              name='firstName'
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
            />
            {fieldErrors.firstName && <small className="text-danger">{fieldErrors.firstName}</small>}

            <input
              className='form-control mb-1'
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
            />
            {fieldErrors.lastName && <small className="text-danger">{fieldErrors.lastName}</small>}

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
              className='form-control mb-1'
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
            {fieldErrors.password && <small className="text-danger">{fieldErrors.password}</small>}

            <input
              className='form-control mb-3'
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {fieldErrors.confirmPassword && <small className="text-danger">{fieldErrors.confirmPassword}</small>}

            <button className='btn btn-warning w-100' type='submit'>Register</button>

            <p className="mt-3">
              Already have an account?
              <Link className='contributors-reg-right-link' to="/contributors-login"> Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContributorsRegistration;
