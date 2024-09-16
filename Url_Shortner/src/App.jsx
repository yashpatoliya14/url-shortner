import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';
import React, { useState } from 'react';
import 'react-toastify/ReactToastify.css';
import RefreshHandler from './refreshRouter.js';
import LoginSetPass from './components/LoginSetPass.jsx';
import Redirect from './components/Redirect.jsx';
import SignupVerification from './components/SignupVerification.jsx';
import Layout from './Layout.jsx';
import History  from './components/History.jsx';
import Contact from './components/Contact.jsx';
function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  // const PrivateRoute = ({ element }) => {
  //   return isAuthenticate ? element : <Navigate to='/login' />;
  // };
  let [urls, setUrls] = useState(null);

  return (

    <div className="App">

      {/* <RefreshHandler setIsAuthenticate={setIsAuthenticate} /> */}
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="login" element={<Login />} />
        <Route path="login/setpass" element={<LoginSetPass />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verification" element={<SignupVerification />} />
        <Route path='/' element={<Layout />}>
          <Route path="/:shortid" element={<Redirect />} />
          <Route path="home" element={<Home />} />
          <Route path="history" element={<History  />} />
          <Route path="contact" element={<Contact  />} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;

