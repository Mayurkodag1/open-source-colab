import React, { useState } from 'react';
import "../AdminLogin/AdminLogin.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    // Hardcoded admin credentials
    const validEmail = "admin@gmail.com";
    const validPassword = "admin";

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: '' });
    };

    // Validate fields before submitting
    const validateFields = () => {
        const errors = {};
        const { email, password } = formData;

        if (!email.trim()) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';

        return errors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateFields();

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            // Show error toast for each field
            if (errors.email) {
                toast.error(errors.email, { position: "top-right", autoClose: 3000 });
            }
            if (errors.password) {
                toast.error(errors.password, { position: "top-right", autoClose: 3000 });
            }
            return;
        }

        // Simulate login
        if (formData.email === validEmail && formData.password === validPassword) {
            localStorage.setItem("adminLogin", true);
            toast.success('Login successful! Redirecting...', {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
            setTimeout(() => {
                navigate('/admin-home');
            }, 3000);
        } else {
            toast.error('Invalid email or password.', {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        }
    };

    return (
        <div className='admin-login-container'>
            <ToastContainer />
            <div className='admin-login-form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-center'>
                        <p className='admin-login-head'>Admin Login</p>
                    </div>
                    <input
                        className='form-control mb-1'
                        type='text'
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

                    <div className='d-flex justify-content-center mt-3'>
                        <button className='btn btn-warning' type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
