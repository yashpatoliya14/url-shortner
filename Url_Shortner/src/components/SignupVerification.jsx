import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import axiosInstance, { handleError, handleSuccess } from '../utils';
import { useNavigate, Link } from 'react-router-dom';

function SignupVerification() {
    const [loginSetPass, setLoginSetPass] = useState({
        otp: ''
    });
    const [timer, setTimer] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        // Get OTP expiration time from localStorage
        const expirationTime = localStorage.getItem('otpExpiration');
        if (expirationTime) {
            const remainingTime = Math.max(0, expirationTime - Date.now());
            setTimer(Math.floor(remainingTime / 1000));
            // Update the timer every second
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            // Clear interval if the timer runs out
            return () => clearInterval(interval);
        }
    }, []);

    const change = (e) => {
        const { name, value } = e.target;
        setLoginSetPass({ ...loginSetPass, [name]: value });
    };

    function handleBack(e){
        e.preventDefault();
        navigate('/login');
    }

    async function handleResend(e) {
        e.preventDefault();
        
        try {
            const email = localStorage.getItem('email');
            const res = await axiosInstance.post('/api/auth/login/setpass', { email });

            // Set new OTP expiration time (5 seconds from now)
            const expirationTime = Date.now() + 5 * 1000; // 5 seconds
            localStorage.setItem('otpExpiration', expirationTime);
            
            // Reset the timer
            setTimer(5);

            handleSuccess("OTP resent successfully!");
        } catch (error) {
            console.error("An error occurred while resending OTP", error);
            handleError("An error occurred while resending OTP");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Check if OTP is still valid
        const expirationTime = localStorage.getItem('otpExpiration');
        // if (Date.now() > expirationTime) {
        //     return handleError("OTP has expired. Please request a new one.");
        // }

        try {
            const res = await axiosInstance.post('/api/auth/login/verify', loginSetPass);
            const { msg, status,otp } = res.data;
            const email = localStorage.getItem('email')
            const password = localStorage.getItem('password')
            const username = localStorage.getItem('username')
            console.log(password);
            
                        
            if (status) {
                const res = await axiosInstance.post('/api/auth/signup',{email:email,password:password,username:username});
                const { msg, success } = res.data;
                console.log(res.data);
                if(success){
                    handleSuccess(msg);
                    setTimeout(()=>{
                        navigate('/login');
                    },1000)
                }
            } else {
                handleError(msg);
                console.error("Verification failed", msg);
            }
        } catch (error) {
            console.error("An error occurred during OTP verification", error);
            handleError("An error occurred during OTP verification");
        }
    }

    return (
        <>
            <div className="container mt-3">
                <div className='row justify-content-center'>
                    <div>
                        <button className='btn btn-primary' onClick={handleBack}>Back</button>
                    </div>
                    
                </div>
                <div className="row justify-content-center ">
                    <div className="col-7 col-lg-4 p-lg-4 p-md-3  bg-info-subtle rounded">
                        <h1 className='h1 my-5'>Send Verification Mail</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3 mt-2">
                                <label className="col form-label fs-5">Enter OTP:</label>
                                <div className="col-12">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="otp"
                                        onChange={change} 
                                        value={loginSetPass.otp}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary my-3">Verify</button>
                            <br />
                            <button 
                                type="button" 
                                className="btn btn-secondary my-3" 
                                onClick={handleResend}
                                disabled={timer > 0}
                            >
                                {timer > 0 ? `Resend (${timer})` : 'Resend'}
                            </button>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupVerification;
