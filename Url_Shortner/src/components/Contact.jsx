import { useEffect } from "react";
import { Link } from "react-router-dom"
export default function Contact(){
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    return(
        
        <div className="flex lg:flex-row flex-col lg:h-[90vh] lg:p-16 xl:px-36 lg:px-10 p-5 justify-center">
            <div className="lg:bg-slate-900 lg:w-[80px] lg:flex lg:flex-col lg:justify-center lg:my-20 hidden">

            </div>
            {/* <div className="lg:w-1/2 w-full lg:p-20 p-2 flex flex-col justify-center gap-5 lg:bg-slate-200">
                <h1 className="lg:text-4xl text-2xl font-bold text-slate-900 my-6">Yash Patoliya</h1>
                <p className="lg:text-xl text-md leading-loose "></p>
                <p className="lg:text-xl text-md leading-loose "></p>
                <button className="p-4 lg:text-xl text-base bg-slate-900 text-white lg:my-6 hover:bg-slate-800">Download CV</button>
            </div> */}
            <div className="lg:bg-slate-900 lg:w-2/5 flex flex-col justify-center lg:my-20 lg:p-20 p-2 gap-7 m-2 lg:m-0 lg:text-white text-slate-900">
                <div className="flex flex-row justify-left gap-5 lg:text-2xl">
                    <i className="self-center fa-brands fa-github text-slate-900  lg:text-white"></i>
                    <a href="https://github.com/yashpatoliya14" target="_blank" className=" lg:text-2xl text-slate-900  lg:text-white truncate">Yash Patoliya</a>
                </div>
                <div className="flex flex-row justify-left gap-5 lg:text-2xl">
                    <i className="self-center fa-solid fa-envelope text-slate-900  lg:text-white"></i>
                    <a href="mailto:yashpatoliya14@gmail.com" target="https://mail.google.com/" className=" lg:text-2xl text-slate-900  lg:text-white truncate">yashpatoliya14@gmail.com</a>
                </div>
                <div className="flex flex-row justify-left gap-5 lg:text-2xl">
                    <i className="self-center fa-brands fa-linkedin text-slate-900  lg:text-white"></i>
                    <a href="https://www.linkedin.com/in/yash-patoliya-b810632b4/" target="_blank" className=" lg:text-2xl text-slate-900  lg:text-white truncate">linkedin/yash-patodiya</a>
                </div>
                <div className="flex flex-row justify-left gap-5 lg:text-2xl">
                    <i className="self-center fa-brands fa-whatsapp text-slate-900  lg:text-white"></i>
                    <a href="" target="_blank" className=" lg:text-2xl text-slate-900  lg:text-white truncate">+91 7043333359</a>
                </div>
            </div>
        </div>

    )
}