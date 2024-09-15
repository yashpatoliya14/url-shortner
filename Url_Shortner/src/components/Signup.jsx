import axios from 'axios';
import React, { useState } from 'react';
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
        <div className="container ">
            <div className="row justify-content-center p-5">
            <div className="col-9 col-md-6 col-lg-4 border border-3 rounded p-lg-4 p-md-3 p-4 bg-info-subtle">
                    <div className='row justify-content-center '>
                        <div className="col-auto my-4">
                            <h1 className='h1' >Sign Up</h1>
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
                        <div className="row mb-3">
                            <label className="col-md-3 col-12 form-label fs-5">Username</label>
                            <div className="col-12">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name='username' 
                                    value={signup.username} 
                                    onChange={change}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary my-3">Sign up</button>
                    </form>
                    <div>
                            Already have an account? <Link to='/login'>Login</Link>
                    </div>
                    <br />
                    <div className='mb-3'>
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
