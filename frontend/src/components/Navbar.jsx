import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout + redirect
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur border-b shadow-sm">
      <div className="relative max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="text-xl font-semibold text-black">
          Mithaas
        </Link>

        {/* Sweet headline (centered on larger screens) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <h2 className="font-extrabold text-sm md:text-lg lg:text-2xl 
            bg-clip-text text-transparent bg-gradient-to-r 
            from-pink-500 via-yellow-400 to-green-400 whitespace-nowrap"
          >
            {["Get", "all", "the", "sweets", "you", "want"].map((word, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-1">
                <span className="text-sm md:text-base lg:text-lg">
                  {["🍩", "🍰", "🍫", "🍦", "🍮", "🍯"][i % 6]}
                </span>
                <span>{word}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Auth Controls */}
        <div className="flex items-center gap-3">
          {!user ? (
            // Guest links
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 
                           bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md text-sm font-medium text-pink-600 
                           bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors"
              >
                Register
              </Link>
            </div>
          ) : (
            // Logged-in user section
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">{user.name}</span>
                  </span>
                </div>

                {/* User avatar (initial) */}
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">
                  {(user.name || "U")[0]?.toUpperCase()}
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md 
                           bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 4.5A1.5 1.5 0 014.5 3h6a1.5 1.5 0 011.5 1.5V6a.5.5 0 01-1 0V4.5A.5.5 0 0010.5 4h-6a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h6a.5.5 0 00.5-.5V14a.5.5 0 011 0v1.5A1.5 1.5 0 0110.5 17h-6A1.5 1.5 0 013 15.5v-11z"
                    clipRule="evenodd"
                  />
                  <path d="M13.854 8.146a.5.5 0 00-.708.708L14.293 10H8.5a.5.5 0 000 1h5.793l-1.147 1.146a.5.5 0 00.708.708l2-2a.5.5 0 000-.708l-2-2z" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
