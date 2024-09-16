import { Link, useNavigate,NavLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../utils";
import { useState } from "react";
export default function Header() {
  const [open , setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/logout',{});
      
      localStorage.removeItem('token');
      localStorage.removeItem('otp');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    // <nav class="navbar navbar-expand-lg bg-info-subtle">
    //   <div class="container-fluid">
    //     <Link class="navbar-brand fw-bolder fs-3" to='/home'><i class="bi bi-link-45deg"></i>Short URL</Link>
    //     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    //       <span class="navbar-toggler-icon"></span>
    //     </button>
    //     <div class="collapse navbar-collapse" id="navbarNavDropdown">
    //       <ul class="navbar-nav">
    //         <li class="nav-item">
    //           <NavLink className={({isActive})=>`nav-link ${isActive?"active":""}`} aria-current="page" to='/home'>Home</NavLink>
    //         </li>
    //         <li class="nav-item">
    //           <NavLink className={({isActive})=>`nav-link ${isActive?"active":""}`} to="/history">History</NavLink>
    //         </li>
    //         <li class="nav-item">
    //           <NavLink className={({isActive})=>`nav-link ${isActive?"active":""}`} to="/contact">Contact</NavLink>
    //         </li>
    //         <li class="nav-item ms-1">
    //           <button className='btn btn-primary' onClick={handleLogout}>Log Out</button>
    //         </li>
    //       </ul>
    //     </div>
        
    //   </div>
    //   <div className=" p-4">

    //       <div className="col-3 ">
    //       </div>
    //     </div>
    // </nav>
    <>
    <div className="w-screen bg-slate-900 ">
      <div className="md:flex item-center justify-between bg-slate-900  py-6 md:px-10 md:py-0 px-7">
        <div className="font-bold text-2xl cursur-pointer flex item-center md:py-4 text-white lg:my-auto">
          URL Encoder
        </div>


        <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-[#01263e] dark:text-white">
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <ul className={`md:flex md:item-center bg-slate-900 md:pd-0 absolute md:static md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all ease-in ${open ? 'top-20 ' : 'top-[-450px]'}`}>

          
          <li class="md:ml-0 text-xl lg:my-auto font-bold md:my-0 my-7 md:py-4 md:border-0 md:px-6 text-white ">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} aria-current="page" to='/home'>Home</NavLink>
          </li>
          <li class="md:ml-0 text-xl lg:my-auto font-bold md:my-0 my-7 md:py-4 md:border-0 md:px-6 text-white">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/history">History</NavLink>
          </li>
          <li class="md:ml-0 text-xl lg:my-auto font-bold md:my-0 my-7 md:py-4 md:border-0 md:px-6 text-white">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/contact">Contact</NavLink>
          </li>
          <li class="md:ml-0 text-xl lg:my-auto font-bold md:my-0 my-7 md:py-4 md:border-0 md:px-6 text-white">
            <button className='bg-slate-300 py-2 px-4 rounded-sm text-slate-900' onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </>
  )
}