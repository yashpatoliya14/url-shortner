import axios from 'axios';
import Joi from 'joi'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import axiosInstance from '../utils';
function Login() {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const [loading,setLoading]=useState(false);

    const change = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    }


    const navigate = useNavigate()

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required()
    });

    async function check(e) {
        e.preventDefault(); // Prevent default link behavior
        if (!login.email) {
            return handleError('Please enter your email to reset the password');
        }
        try {

            setLoading(true);
            const res = await axiosInstance.post('/api/auth/login/setpass', login);
            setLoading(false);
            console.log(res);
            
            const { otp } = res.data
            handleSuccess('OTP sent to your email for password reset');
            setTimeout(() => {

                navigate('/login/setpass')
            }, 2000)
            localStorage.setItem('email', login.email);
        } catch (err) {
            console.error(err);
            handleError('Failed to send OTP, please try again.');
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = schema.validate(login);

        if (error) {
            // Extract the error messages
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return handleError(errorMessage);
        }

        try {
            if (!login.email || !login.password) {
                return handleError('Fill the all fields and enter correct info')

            }
            if (!login.email.includes('.')) {
                return handleError('Enter a valid email address');
            }

            setLoading(true)
            const res = await axiosInstance.post('/api/auth/login', login);
            setLoading(false)
            console.log(res);
            const { msg, success, token } = res.data;
            if (success) {
                handleSuccess("Login Successful")
                setTimeout(() => {
                    navigate('/home')
                }, 2000)
                localStorage.setItem('token', token)

            } else if (error) {
                handleError(msg || 'Login failed. Please try again.');
            }
            // You can show a success message or redirect the user here
        } catch (err) {
            setLoading(false);
            console.error(err);
            handleError("User not found! Try again or sign up.");
        }
    }

    return (

        <div className="container  rounded mt-3">
        {loading?
            <div className="row mt-5 justify-content-center">
                <div className="col-auto">
                <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
                </div>
            </div>

        :

            <div className="row justify-content-center mt-md-5">

                <div className="col-9 col-md-6 col-lg-4 border border-3 rounded p-lg-4 p-md-3 p-4 bg-info-subtle">
                    <div className='row justify-content-center '>
                        <div className="col-auto my-4">
                            <h1 className='h1' >Login</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3 my-3">
                            <label className="col-md-3 col-12 form-label fs-5 ">Email</label>
                            <div className="col-12">
                                <input type="email" className="form-control" name='email' onChange={change} />
                            </div>
                        </div>
                        <div className="row mb-3 my-3">
                            <label className="col-md-3 col-12 form-label fs-5">Password</label>
                            <div className="col-12">
                                <input type="password" className="form-control" name='password' onChange={change} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary my-3">Sign in</button>
                    </form>
                    <div className='my-1'>
                    <span>
                        Don't have account ? <Link to='/signup'>Sign up</Link>
                    </span>
                    </div>

                    <br />
                    <div className='mb-3'>
                    <span>
                        <Link to='/login/setpass' onClick={check}>forgot password ? </Link>
                    </span>
                    </div>

                </div>
            </div>
}
                    <ToastContainer />
        </div>
        
    );
}

export default Login;
