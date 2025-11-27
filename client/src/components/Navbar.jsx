import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { userContext } from "../App.jsx";

export default function Navbar() {
    const { state } = useContext(userContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const RenderMenu = () => {
        // Before login
        if (!state) {
            return (
                <>
                    <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Home</Link>
                    <Link to="/about" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">About</Link>
                    <Link to="/contact" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Contact</Link>
                    <Link to="/login" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Login</Link>
                    <Link to="/signup" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Registration</Link>
                </>
            );
        }
        // After login
        else {
            return (
                <>
                    <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Home</Link>
                    <Link to="/about" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">About</Link>
                    <Link to="/contact" className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Contact</Link>
                    <Link to="/logout" className="px-5 py-2.5 text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600">Logout</Link>
                </>
            );
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">W</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            WebApp
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-2">
                        <RenderMenu />
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                        >
                            {isMenuOpen ? "✖️" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 flex flex-col gap-2 px-4 py-2">
                    <RenderMenu />
                </div>
            )}
        </nav>
    );
}
