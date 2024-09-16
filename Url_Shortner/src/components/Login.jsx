import axios from 'axios';
import Joi from 'joi'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import axiosInstance from '../utils';
function Login() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home');
        }
    }, [])
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const change = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    }



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
        <div className="bg-gray-900 h-screen flex justify-center">
            {loading ? (
                <div className="row mt-5 justify-content-center">
                    <div className="col-auto">
                        <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex w-screen">
                    <div className="lg:h-screen h-0 w-0 lg:w-1/2 hidden lg:flex lg:flex-col lg:justify-center lg:p-20">
                        <h1 className="text-slate-400 text-7xl font-bold pb-5 tracking-widest">Welcome</h1>
                        <h1 className="text-slate-400 text-7xl font-bold tracking-widest">Back!</h1>
                    </div>
                    <div className="bg-gray-100 opacity-70 h-screen w-full lg:w-1/2 lg:p-24 p-10 flex justify-center flex-col">
                        <div className="w-full px-10">
                            <h1 className="text-5xl font-bold my-6">
                                Login
                            </h1>
                            <p className="text-xl text-slate-400 my-8">
                                Welcome back! Please login to your account.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col my-6">
                                    <label className="text-xl text-slate-400 py-2">Email</label>

                                    <input
                                        type="email"
                                        className="w-full border-2 text-xl font-semibold border-slate-400 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-gray-800"
                                        name="email"
                                        onChange={change}
                                    />
                                </div>
                                <div className="flex flex-col my-6">
                                    <label className="text-xl text-slate-400 py-2">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="w-full border-2 text-xl font-semibold border-slate-400 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-gray-800"
                                        name="password"
                                        onChange={change}
                                    />

                                </div>

                                <span className="block py-5">
                                    <Link to="/login/setpass" className="text-slate-400 text-lg flex justify-end" onClick={check}>
                                        forgot password ?{" "}
                                    </Link>
                                </span>
                                <button type="submit" className="bg-slate-800 w-full text-white rounded-xl text-xl py-5 my-6 hover:bg-slate-700">
                                    Login
                                </button>
                            </form>
                            <div className="py-10">
                                <span className="text-slate-400  text-lg">
                                    Don't have account? <Link to="/signup" className="text-slate-900 font-semibold">Signup</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>

    );
}

export default Login;
