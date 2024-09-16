import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import axiosInstance, { handleError, handleSuccess } from '../utils';
import Joi from 'joi';

function Signup() {
    const [signup, setSignup] = useState({
        email: '',
        password: '',
        username: ''
    });
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/home');
        }
    },[])
    // Joi schema for validation
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required(),
        username: Joi.string().min(3).required()
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the data using Joi
        const { error } = schema.validate(signup);
        if (error) {
            // Extract the error messages
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return handleError(errorMessage);
        }

        try {
            // const res = await axios.post('/api/auth/signup', signup);
            // const { msg, success } = res.data;
            // console.log(res.data);
            
            // if (success) {
                
                    const res= await axiosInstance.post('/api/auth/login/setpass',signup);
                    
                    localStorage.setItem('email', signup.email);
                    localStorage.setItem('password', signup.password);
                    localStorage.setItem('username', signup.username);


                    handleSuccess("Sent OTP in your E-mail" )
                    setTimeout(()=>{
                        navigate('/verification');
                    },1000)
            // } else {
                // handleError(msg || 'Signup failed. Please try again.');
            // }
        } catch (error) {

                // Handle server error
                console.log(error);
                handleError('An error occurred. Please try again.');
            
        }
    };

    const change = (e) => {
        const { name, value } = e.target;
        setSignup({ ...signup, [name]: value });
    };

    return (
        <div className="bg-gray-900 h-screen flex ">
            <div className="lg:h-screen lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:p-20 hidden h-0 w-0">
                <h1 className="text-slate-400 text-7xl font-bold pb-5 tracking-widest">
                    Welcome to
                </h1>
                <h1 className="text-slate-400 text-7xl font-bold tracking-widest">
                    Url Encoder!
                </h1>
            </div>
            <div className="bg-gray-100 opacity-70 h-screen lg:w-1/2 lg:p-24 w-full p-10 flex justify-center flex-col">
                <div className="w-full px-10">
                    <h1 className="text-5xl font-bold my-6">Sign Up</h1>
                    <p className="text-xl text-slate-400 my-8">
                        Welcome! Please create your account.
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
                            <label className="text-xl text-slate-400 py-2">Password</label>
                            <input
                                type="password"
                                className="w-full border-2 text-xl font-semibold border-slate-400 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-gray-800"
                                name="password"
                                onChange={change}
                            />
                        </div>
                        <div className="flex flex-col my-6">
                            <label className="text-xl text-slate-400 py-2">Username</label>
                            <input
                                type="text"
                                className="w-full border-2 text-xl font-semibold border-slate-400 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-gray-800"
                                name="username"
                                value={signup.username}
                                onChange={change}
                            />
                        </div>
                        <button type="submit" className="bg-slate-800 w-full text-white rounded-xl text-xl py-5 my-6 hover:bg-slate-700">
                            Sign up
                        </button>
                    </form>
                    <div className="py-7">
                        <span className="text-slate-400  text-lg">
                        Already have an account? <Link to="/login" className="text-slate-900 font-semibold">Login</Link>
                        </span>
                    </div>
                    <br />
                    <div>
                        <span>
                            {/* <Link to='/login/setpass' onClick={check}>forgot password ? </Link> */}
                        </span>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Signup;
