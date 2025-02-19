import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import React from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  const authLinks = [
    { to: "/register", label: "Register" },
    { to: "/login", label: "Login" }
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group" onClick={handleNavigate}>
            <div className="p-2 rounded-lg bg-white transform group-hover:rotate-12 transition-all duration-300">
              <GraduationCap className="h-6 w-6 text-[#007aed]" />
            </div>
            <span className="font-bold text-xl text-[#007aed]">StageBox</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {authLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavigate}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-md ${
                  index === 0 
                    ? 'bg-[#007aed] text-white hover:bg-[#007aed]/90 hover:shadow-[#007aed]/20'
                    : 'bg-white text-[#007aed] border-2 border-[#007aed] hover:bg-[#007aed]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#007aed] hover:bg-[#007aed]/5 transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ${
        isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
      }`}>
        <div className="px-4 py-3 space-y-3 bg-white">
          {authLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleNavigate}
              className={`block text-center px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                index === 0 
                  ? 'bg-[#ff7f04] text-white hover:bg-[#ff7f04]/90 hover:shadow-[#ff7f04]/20'
                  : 'bg-white text-[#007aed] border-2 border-[#007aed] hover:bg-[#007aed]/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;