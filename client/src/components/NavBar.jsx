import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const menuItems = [
  { label: "My Notes", to: "/" },
  { label: "Create Note", to: "/create" },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loggedIn, setLoggedIn } = useAppContext();

  // Username auto-update
  const [username, setUsername] = useState(user && user.username ? user.username : "Guest");
  useEffect(() => {
    setUsername(user && user.username ? user.username : "Guest");
  }, [user]);

  // Current route to highlight active link
  const location = useLocation();

  // Logout handler
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/logout");
      if (data.success) {
        setLoggedIn(false);
        setUsername("Guest");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Logout failed! Server error.");
    }
  };

  // Highlight active link helper
  const isActive = (path) => location.pathname === path;

  // Close mobile menu when clicking nav links
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-white/10 backdrop-blur-sm px-8 py-4 text-white text-sm relative w-full shadow-lg z-50">
      
      {/* Logo with Notes Icon */}
      <Link to="/" className="flex items-center gap-3 group" onClick={handleNavLinkClick}>
        {/* Custom Notes Icon */}
        <div className="relative">
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 36 36" 
            fill="none" 
            className="group-hover:scale-110 transition-transform duration-300"
          >
            {/* Notebook pages */}
            <rect x="6" y="4" width="20" height="26" rx="2" fill="url(#gradient1)" />
            <rect x="8" y="6" width="16" height="22" rx="1" fill="rgba(255,255,255,0.1)" />
            
            {/* Lines on the page */}
            <line x1="10" y1="12" x2="22" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="10" y1="16" x2="20" y2="16" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="10" y1="20" x2="22" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="10" y1="24" x2="18" y2="24" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            
            {/* Pen icon */}
            <path d="M22 8l2 2-8 8-2-2 8-8z" fill="url(#gradient2)" />
            <circle cx="25" cy="7" r="1.5" fill="#FFD700"/>
            
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
        </div>
        
        {/* App Name */}
        <span className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Notezy
        </span>
      </Link>

      {/* Desktop Menu - SIMPLE WITH UNDERLINE ON HOVER */}
      <div className="hidden md:flex items-center gap-8 ml-10">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`relative px-4 py-3 font-medium transition-all duration-300
              ${isActive(item.to) 
                ? 'text-purple-300' 
                : 'text-gray-300 hover:text-white'
              }
            `}
          >
            {item.label}
            
            {/* Animated underline */}
            <span 
              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out
                ${isActive(item.to) 
                  ? 'w-full' 
                  : 'w-0 group-hover:w-full hover:w-full'
                }
              `}
            ></span>
          </Link>
        ))}
      </div>

      {/* Right-side buttons */}
      <div className="hidden md:flex items-center gap-5 ml-10">

        {/* Username display */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
          <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-300 font-medium">{username}</span>
        </div>

        {/* Login/Logout/Profile */}
        {loggedIn ? (
          <div className="relative inline-block group">
            {/* Profile Icon */}
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25 cursor-pointer hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                />
              </svg>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={logoutHandler}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 pointer-events-auto shadow-lg hover:shadow-red-500/25 hover:-translate-y-1"
              style={{ pointerEvents: "auto" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="md:hidden text-gray-400 hover:text-white ml-auto z-[60] p-2 rounded-lg hover:bg-white/10 transition-all duration-300 relative"
        aria-label="Mobile Menu Toggle"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isMobileMenuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop/Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-[55]"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Mobile Menu Content */}
          <div className="fixed top-[73px] left-0 right-0 bg-gradient-to-b from-gray-900/98 to-black/98 backdrop-blur-xl flex flex-col items-center gap-4 py-8 md:hidden text-white border-t border-white/10 shadow-2xl z-[56] max-h-[calc(100vh-73px)] overflow-y-auto">
            
            {/* Navigation Links */}
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`px-8 py-4 rounded-xl transition-all duration-300 text-lg font-medium ${
                  isActive(item.to) 
                    ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                onClick={handleNavLinkClick}
              >
                {item.label}
              </Link>
            ))}

            {/* Username Display */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/20 px-6 py-3 rounded-xl backdrop-blur-sm mt-4">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 font-medium text-lg">{username}</span>
            </div>

            {/* Login/Logout/Profile for Mobile */}
            {loggedIn ? (
              <button
                onClick={() => {
                  logoutHandler();
                  handleNavLinkClick();
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/25 mt-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25 mt-2"
                onClick={handleNavLinkClick}
              >
                Login
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
