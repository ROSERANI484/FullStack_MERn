import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700 text-white py-8 mt-auto w-full shadow-inner">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

                <p className="text-sm md:text-base">
                    © 2025 <span className="font-semibold">CBSEGuess</span>. All Rights Reserved.
                </p>

                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a
                        href="#"
                        className="hover:text-yellow-300 transition-colors duration-300 text-sm md:text-base"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="hover:text-yellow-300 transition-colors duration-300 text-sm md:text-base"
                    >
                        Terms of Use
                    </a>
                    <a
                        href="#"
                        className="hover:text-yellow-300 transition-colors duration-300 text-sm md:text-base"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


