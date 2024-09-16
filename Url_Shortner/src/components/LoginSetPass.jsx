import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import axiosInstance, { handleError, handleSuccess } from '../utils';
import { useNavigate, Link } from 'react-router-dom';

function LoginSetPass() {
    const [loginSetPass, setLoginSetPass] = useState({
        otp: ''
    });
    const [timer, setTimer] = useState(0);

    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/home');
        }
    },[])
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
            console.log(res);
            

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
            const { msg, status,token} = res.data;
            
            if (status) {
                handleSuccess(msg);
                localStorage.setItem('token',token);
                navigate('/home');
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
            <div className="bg-gray-900 h-screen flex justify-center">
                <div className="flex w-screen">
                    <div className="hidden w-0 h-0 lg:h-screen lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:p-20">
                        <h1 className="text-slate-400 text-7xl font-bold pb-5 tracking-widest">
                            Verify Your
                        </h1>
                        <h1 className="text-slate-400 text-7xl font-bold tracking-widest">
                            Email!
                        </h1>
                    </div>
                    <div className="bg-gray-100 opacity-70 h-screen lg:w-1/2 w-full p-5 lg:p-24 flex justify-center flex-col">
                        <div className="w-full px-10">
                            {/* <div>
                            <button className="bg-slate-400 p-2" onClick={handleBack}>
                                Back
                            </button>
                        </div> */}
                            <h1 className="text-5xl font-bold my-6">Verification</h1>
                            <p className="text-xl text-slate-400 my-8">
                                Please check your mail for OTP.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col my-6">
                                    <label className="text-xl text-slate-400 py-2">Enter OTP:</label>
                                    
                                        <input
                                            type="text"
                                            className="w-full border-2 text-xl font-semibold border-slate-400 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-gray-800"
                                            name="otp"
                                            onChange={change}
                                            value={loginSetPass.otp}
                                        />
                                    
                                </div>
                                <button type="submit" className="bg-slate-800 w-full text-white rounded-xl text-xl py-5 my-6 hover:bg-slate-700">
                                    Verify
                                </button>
                                <hr className="w-full h-1 bg-slate-200 my-6"></hr>
                                <button
                                    type="button"
                                    className="text-center text-slate-400 w-[20%] text-lg relative bottom-10 left-[40%] bg-gray-100"
                                    onClick={handleResend}
                                    disabled={timer > 0}
                                >
                                    {timer > 0 ? `Resend (${timer})` : "Resend"}
                                </button>
                            </form>
                            <ToastContainer />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginSetPass;
