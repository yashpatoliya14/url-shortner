import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({setIsAuthenticate}){
    let navigate = useNavigate();
    let location = useLocation();
  
  if(localStorage.getItem('token') || localStorage.getItem('otp')){
    setIsAuthenticate(true);
    if(location.pathname==='/' || location.pathname==='/login' || location.pathname==='/signup'){
      navigate('/home',{replace:false});
    }
  }
  return (null)

}

export default RefreshHandler