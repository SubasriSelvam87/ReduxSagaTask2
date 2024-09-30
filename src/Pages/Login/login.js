// // components/Login.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginRequest } from '../../Redux/Action/action';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Directly access the auth state without using authSelector
//     const authState = useSelector((state) => state.auth); // Ensure auth is part of the state
//     const loading = authState?.loading;
//     const error = authState?.error;
//     const loggedIn = authState?.loggedIn; // Access loggedIn

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(loginRequest({ username, password })); // Pass credentials as an object
//     };

//     // Add debug log and trigger navigation
//     useEffect(() => {
//         console.log('loggedIn state:', loggedIn); // Debugging the auth state
//         if (loggedIn) {
//             navigate('/Form'); // Redirect to Form page
//         }
//     }, [loggedIn, navigate,authState]);

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Username: </label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password: </label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//     );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import images from "./images/logo2.jpeg";
// import './login.css';
// import myImage from "../myImage/Free Vector _ Illustration with programmer working.jpeg";
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import "./login.css"


const Login = ({ onLogin }) => {
  const defaultUsername = "qwertyuiop";
  const defaultPassword = "asdfghjkl";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateCredentials = () => {
    return username === defaultUsername && password === defaultPassword;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateCredentials()) {
      toast.success("Login successful!");

      setTimeout(() => {
        onLogin();
        navigate("/Form");
      }, 2000);
    } else {
      toast.error("Invalid username or password!");
    }
  };

  return (
    <div className="card   mx-auto mt-5 loginCard">
      <div className=" container-fluid">
        <div className=" row d-flex">
          <div className="col-lg-6 col-md-6 mt-3">
            <img
              src={images}
              alt="Social Media Marketing"
              className="img-fluid"
            />
          </div>

          <div className="col-lg-6 col-md-6 login-form d-flex flex-column justify-content-center">
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar
            />

            <h2 className="text-center  mb-3">Welcome to Shopping!</h2>
            <p className="text-center star">Login your account by filling the form below</p>

            <form onSubmit={handleLogin} autoComplete="off" className="px-4">
              <div className=" mx-auto d-block">
                <label htmlFor="username" className="form-label">
                  Enter Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              {/* <div className="d-flex justify-content-between">
                <a href="/recovery" className="text-muted">
                  Recovery Password
                </a>
              </div> */}

              <button type="submit" className="loginButton w-100 mt-4">
                Sign In
              </button>

              <h6 className="text-center mt-3">
                <strong>Or Continue With</strong>
              </h6>
              <div className="d-flex justify-content-center mt-3">
              <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer">
                <FaApple size={40} color="#8fbedc" className="mx-3" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={40} color="#8fbedc" className="mx-3" />
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <FaGoogle size={40} color="#8fbedc" className="mx-3" />
              </a>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
