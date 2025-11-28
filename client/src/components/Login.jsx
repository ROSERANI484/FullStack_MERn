import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Login = () => {

  const  {state, dispatch} = useContext(userContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),

      // YEH SABSE IMPORTANT LINE
      credentials: "include",
    });

    const data = await res.json().catch(() => null);

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({type:"USER",payload:false})
      window.alert("Login Successful");
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-15 sm:px-20 md:px-12 lg:px-20 py-33">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden transition-all duration-300">

        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center md:text-left">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm mb-6 text-center md:text-left">
            Please login to your account
          </p>

          <form method="POST" className="space-y-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-3.5 text-gray-600 text-sm"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-gray-800 placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-3.5 text-gray-600 text-sm"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-gray-800 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600 text-sm"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            <div className="flex justify-center md:justify-start">
              <button
                type="submit"
                onClick={loginUser}
                className="w-36 py-2 mt-3 text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-medium text-sm shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>

        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/685/590/non_2x/lady-at-desk-with-bouquet-semi-flat-color-character-working-figure-full-body-person-on-white-romantic-gift-isolated-modern-cartoon-style-illustration-for-graphic-design-and-animation-vector.jpg"
            alt="Login illustration"
            className="w-3/4 sm:w-2/3 md:w-4/5 h-auto object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
