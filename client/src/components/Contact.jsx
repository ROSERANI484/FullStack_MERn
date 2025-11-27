import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ------- GET USER DATA ------
  const userContact = async () => {
    try {
      const res = await fetch("http://localhost:5000/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log("User data fetched:", data);

      if (res.status !== 200) {
        console.log("Failed to fetch user data");
        return;
      }

      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    } catch (err) {
      console.log("Frontend fetch error:", err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();
      console.log(" Backend Response:", data);

      if (res.status === 201) {
        alert("Message sent successfully");
        console.log(" Message Saved:", message);

        setUserData({ ...userData, message: "" });
      } else {
        alert(data.error || "Something went wrong");
      }

    } catch (err) {
      console.log(" Contact form error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden mt-16">

        {/* Left Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-8 text-sm text-center md:text-left">
            We'd love to hear from you! Fill out the form or reach us through the contact details below.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl shadow-md">
              <FontAwesomeIcon icon={faEnvelope} className="text-cyan-600 text-lg" />
              <div>
                <p className="text-gray-800 font-semibold text-sm">Email</p>
                <p className="text-gray-600 text-sm">support@cbseguess.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl shadow-md">
              <FontAwesomeIcon icon={faPhone} className="text-cyan-600 text-lg" />
              <div>
                <p className="text-gray-800 font-semibold text-sm">Phone</p>
                <p className="text-gray-600 text-sm">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl shadow-md">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-cyan-600 text-lg" />
              <div>
                <p className="text-gray-800 font-semibold text-sm">Address</p>
                <p className="text-gray-600 text-sm">Ranchi, Jharkhand, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
            Send Us a Message
          </h2>

          <form className="space-y-5" onSubmit={contactForm}>
            <input type="text" name="name" value={userData.name} onChange={handleInput} placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input type="email" name="email" value={userData.email} onChange={handleInput} placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input type="text" name="phone" value={userData.phone} onChange={handleInput} placeholder="Your Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <textarea name="message" value={userData.message} onChange={handleInput} placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            ></textarea>

            <button type="submit"
              className="w-40 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
