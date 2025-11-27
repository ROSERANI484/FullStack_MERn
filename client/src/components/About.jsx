import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [userData, setUserData] = useState({});  // ✅ state for dynamic data
  const navigate = useNavigate();

  const callAboutpage = async () => {
    try {
      const res = await fetch("http://localhost:5000/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",  // ✅ cookies send karne ke liye
      });

      if (res.status !== 200) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setUserData(data);  // ✅ server se aaye data ko state me set karo
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutpage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-6 py-30">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 border border-gray-300 rounded-2xl p-10 shadow-lg bg-white">

        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="w-32 h-32 rounded-full border border-gray-400 mb-2"
          />

          <h2 className="text-2xl font-bold text-black">{userData.name || "Loading..."}</h2>
          <p className="text-sm font-medium text-gray-700">{userData.work || "Work"}</p>

          <div className="w-full mt-4 space-y-2 text-black">
            <p><strong>ID:</strong> {userData._id || "#"}</p>
            <p><strong>Name:</strong> {userData.name || "-"}</p>
            <p><strong>Profession:</strong> {userData.work || "-"}</p>
            <p><strong>Email:</strong> {userData.email || "-"}</p>
            <p><strong>Phone:</strong> {userData.phone || "-"}</p>
          </div>

          <button className="mt-5 border border-black px-5 py-2 rounded-md text-sm font-medium hover:bg-black hover:text-white transition duration-300">
            Edit Profile
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[2px] bg-black mx-auto"></div>

        {/* Right Column */}
        <div className="flex flex-col justify-center md:pl-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-400 pb-2 text-black">
            Work Links
          </h2>

          <div className="flex flex-col space-y-3 text-black">
            {userData.workLinks?.map((link, index) => (
              <span key={index} className="border border-gray-400 px-4 py-2 rounded-md text-sm font-medium">{link}</span>
            )) || (
                <>
                  <span className="border border-gray-400 px-4 py-2 rounded-md text-sm font-medium">Web Developer</span>
                  <span className="border border-gray-400 px-4 py-2 rounded-md text-sm font-medium">Figma Designer</span>
                </>
              )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
