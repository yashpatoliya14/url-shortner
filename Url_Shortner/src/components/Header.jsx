import { Link, useNavigate,NavLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../utils";
export default function Header() {

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
    <nav class="navbar navbar-expand-lg bg-info-subtle">
      <div class="container-fluid">
        <Link class="navbar-brand fw-bolder fs-3" to='/home'><i class="bi bi-link-45deg"></i>Short URL</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NavLink className={({isActive})=>`nav-link ${isActive?"active":""}`} aria-current="page" to='/home'>Home</NavLink>
            </li>
            <li class="nav-item">
              <NavLink className={({isActive})=>`nav-link ${isActive?"active":""}`} to="/history">History</NavLink>
            </li>
            <li class="nav-item">
              <NavLink className={({isActive})=>`nav-link ${isActive?"active":""}`} to="/contact">Contact</NavLink>
            </li>
            <li class="nav-item ms-1">
              <button className='btn btn-primary' onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </div>
        
      </div>
      <div className=" p-4">

          <div className="col-3 ">
          </div>
        </div>
    </nav>
  )
}