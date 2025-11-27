import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faUserTie,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",         
    password: "",
    cpassword: "",    
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    try {
      const res = await fetch("https://fullstack-mern-lebd.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          work,
          password,
          cpassword,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data) {
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      } else {
        window.alert("Registration Successful");
        console.log("Registration Successful");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error:", err);
      window.alert("Server Error! Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-6 pt-20">
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full flex overflow-hidden flex-wrap md:flex-nowrap">

        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign up</h2>
          <form method="POST" className="space-y-3" onSubmit={postData}>

            {/* Name */}
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-black text-sm" />
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputs}
                placeholder="Enter your name"
                className="w-full pl-8 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-black placeholder-black"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-black text-sm" />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputs}
                placeholder="Enter your email"
                className="w-full pl-8 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-black placeholder-black"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-3 text-black text-sm" />
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputs}
                placeholder="Enter your phone number"
                className="w-full pl-8 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-black placeholder-black"
              />
            </div>

            {/* Work */}
            <div className="relative">
              <FontAwesomeIcon icon={faUserTie} className="absolute left-3 top-3 text-black text-sm" />
              <input
                type="text"
                name="work"
                value={user.work}
                onChange={handleInputs}
                placeholder="Enter your work/profession"
                className="w-full pl-8 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-black placeholder-black"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-black text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleInputs}
                placeholder="Enter your password"
                className="w-full pl-8 pr-10 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-black placeholder-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-black text-sm"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-black text-sm" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="cpassword"
                value={user.cpassword}
                onChange={handleInputs}
                placeholder="Confirm your password"
                className="w-full pl-8 pr-10 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-black placeholder-black"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-black text-sm"
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-32 py-1.5 mt-3 text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-cyan-600 transition"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
          <img
            src="https://media.istockphoto.com/id/1384309939/vector/online-approved-application.jpg?s=612x612&w=0&k=20&c=CVA5bmM1FFEvVIc3gVkB0GQ6JqGQIFMhPcqUE61krxI="
            alt="Signup"
            className="w-3/5 sm:w-2/5 md:w-4/5 h-auto object-contain"
          />
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already registered?{" "}
            <a href="/login" className="text-cyan-600 font-medium hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

