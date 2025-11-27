import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
            <div className="bg-white border-gray-300">
                <h1 className="text-6xl font-extrabold text-black mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">We’re Sorry, Page Not Found!</h2>
                <p className="text-gray-700 mb-6">
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>
                <NavLink
                    to="/"
                    className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-300"
                >
                    Back To Home Page
                </NavLink>
            </div>
        </div>
    );
};

export default ErrorPage;

