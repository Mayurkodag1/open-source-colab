import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedForm = localStorage.getItem("adminRegForm");
    if (savedForm) {
      setFormData(JSON.parse(savedForm));
    }
  }, []);

  // Save to localStorage on form data change
  useEffect(() => {
    localStorage.setItem("adminRegForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: '' });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      Object.values(errors).forEach(msg =>
        toast.error(msg, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        })
      );
      return;
    }

    toast.success('🎉 Form is valid! You’re ready to integrate API or continue.', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

    // Optional: clear form and localStorage
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    localStorage.removeItem("adminRegForm");
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
            <p className='contributors-reg-right-head'>Admin Registration</p>

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
              <Link className='contributors-reg-right-link' to="/admin-login"> Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistration;
