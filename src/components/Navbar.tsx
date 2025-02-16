import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, Briefcase, MessageSquare, User, Bell, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-white p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-bold text-xl">IFRI Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/companies" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors">
              <Building2 className="h-5 w-5" />
              <span>Entreprises</span>
            </Link>
            <Link to="/jobs" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors">
              <Briefcase className="h-5 w-5" />
              <span>Offres</span>
            </Link>
            <Link to="/messages" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            <div className="relative group">
              <Bell className="h-5 w-5 cursor-pointer hover:text-blue-200 transition-colors" />
              <div className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </div>
            </div>
            <Link to="/profile" className="flex items-center space-x-2">
              <div className="relative">
                <img 
                  src="/api/placeholder/32/32"
                  alt="Profile" 
                  className="h-8 w-8 rounded-full border-2 border-white hover:border-blue-200 transition-colors"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            </Link>
            <Link to="/login" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transform hover:scale-105 transition-all shadow-md">
              Connexion
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/companies"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              <Building2 className="h-5 w-5" />
              <span>Entreprises</span>
            </Link>
            <Link
              to="/jobs"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              <Briefcase className="h-5 w-5" />
              <span>Offres</span>
            </Link>
            <Link
              to="/messages"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Profil</span>
            </Link>
            <Link
              to="/login"
              className="block text-center bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 mt-4"
            >
              Connexion
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;