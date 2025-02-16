import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { to: "/offres", label: "Offres" },
    { to: "/entreprises", label: "Entreprises" }
  ];

  const authLinks = [
    { to: "/register", label: "Inscription" },
    { to: "/login", label: "Connexion" }
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group" onClick={handleNavigate}>
            <div className="p-2 rounded-lg bg-white transform group-hover:rotate-12 transition-all duration-300">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-bold text-xl text-blue-600">IFRI Connect</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            {authLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavigate}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-md ${
                  index === 0 
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ${
        isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
      }`}>
        <div className="px-4 py-3 space-y-3 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleNavigate}
              className="block text-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          {authLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleNavigate}
              className={`block text-center px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                index === 0 
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
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
