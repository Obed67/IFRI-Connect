import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  GraduationCap, Menu, X, LogOut, User, Briefcase, 
  MessageSquare, ChevronDown, LayoutDashboard, Settings 
} from "lucide-react";
import React from "react";
import supabase from "../helper/supabaseClient";


const NavbarConnected = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  const handleNavigate = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { to: "/jobs", label: "Offres", icon: <Briefcase className="h-5 w-5 inline mr-2" /> },
    { to: "/entreprises", label: "Entreprises", icon: null },
    { to: "/messages", label: "Messages", icon: <MessageSquare className="h-5 w-5 inline mr-2" /> },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={handleNavigate}>
            <div className="p-2 rounded-lg bg-white transform group-hover:rotate-12 transition-all duration-300">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-bold text-xl text-blue-600">IFRI Connect</span>
          </Link>

          {/* Liens Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                onClick={handleNavigate}
              >
                {icon} {label}
              </Link>
            ))}

            {/* Dropdown Profil toujours affiché */}
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
                <img 
                  src="/default-avatar.png" 
                  alt="Profil" 
                  className="w-10 h-10 rounded-full border border-gray-300" 
                />
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  <Link to="/dashboard" onClick={handleNavigate} className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
                    <LayoutDashboard className="h-5 w-5 inline mr-2" /> Tableau de bord
                  </Link>
                  <Link to="/profile" onClick={handleNavigate} className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
                    <User className="h-5 w-5 inline mr-2" /> Mon profil
                  </Link>
                  <Link to="/setting" onClick={handleNavigate} className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
                    <Settings className="h-5 w-5 inline mr-2" /> Paramètres
                  </Link>
                  <button onClick={signOut} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <LogOut className="h-5 w-5 inline mr-2" /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bouton Menu Mobile */}
          <button onClick={() => { setIsMenuOpen(!isMenuOpen); setIsDropdownOpen(false); }} className="md:hidden p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarConnected;