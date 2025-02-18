import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Menu, X, LogOut, User, Briefcase, MessageSquare, ChevronDown, LayoutDashboard, Settings } from "lucide-react";

interface NavbarConnectedProps {
  user: {
    avatar: string;
    name: string;
  } | null;
  onLogout: () => void;
}

const NavbarConnected = ({ user, onLogout }: NavbarConnectedProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
    setTimeout(() => navigate("/login"), 100);
  };

  const navLinks = [
    { to: "/jobs", label: "Offres", icon: <Briefcase className="h-5 w-5 inline mr-2" /> },
    { to: "/entreprises", label: "Entreprises", icon: null },
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
            <Link to="/messages" className="text-gray-600 hover:text-blue-600 transition-colors duration-200" onClick={handleNavigate}>
              <MessageSquare className="h-5 w-5 inline mr-2" /> Messages
            </Link>

            {/* Dropdown Profil */}
            {user && (
              <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
                  <img src={user.avatar || "/default-avatar.png"} alt="Profil" className="w-10 h-10 rounded-full border border-gray-300" />
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
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700">
                      <LogOut className="h-5 w-5 inline mr-2" /> Déconnexion
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <button onClick={() => { setIsMenuOpen(!isMenuOpen); setIsDropdownOpen(false); }} className="md:hidden p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
        <div className="px-4 py-3 space-y-3 bg-white">
          {navLinks.map(({ to, label, icon }) => (
            <Link key={to} to={to} onClick={handleNavigate} className="block text-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
              {icon && icon} {label}
            </Link>
          ))}
          <Link to="/messages" onClick={handleNavigate} className="block text-center text-gray-600 hover:text-blue-600">
            <MessageSquare className="h-5 w-5 inline mr-2" /> Messages
          </Link>

          {/* Mobile - Profil & Déconnexion */}
          {user && (
            <>
              <Link to="/dashboard" onClick={handleNavigate} className="block text-center text-gray-600 hover:text-blue-600">
                <LayoutDashboard className="h-5 w-5 inline mr-2" /> Tableau de bord
              </Link>
              <Link to="/profile" onClick={handleNavigate} className="block text-center text-gray-600 hover:text-blue-600">
                <User className="h-5 w-5 inline mr-2" /> Mon profil
              </Link>
              <Link to="/setting" onClick={handleNavigate} className="block text-center text-gray-600 hover:text-blue-600">
                <Settings className="h-5 w-5 inline mr-2" /> Paramètres
              </Link>
              <button onClick={handleLogout} className="w-full text-center px-4 py-2 rounded-xl text-red-600 font-medium hover:bg-red-50">
                <LogOut className="h-5 w-5 inline mr-2" /> Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarConnected;