import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import supabase from "../../helper/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setErrors({});

    if (!email || !password || !firstName || !lastName) {
      setMessage("Tous les champs doivent être remplis.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(`❌ ${error.message}`, { position: "top-right", autoClose: 3000 });
      return;
    }

    if (data) {
      toast.success('🎉 Inscription réussie ! Vérifiez votre email.', { position: 'top-right', autoClose: 3000 });
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-[#f5f9ff] mt-10">
      <ToastContainer />
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-10 relative">
        <div className="max-w-xl">
          <h1 className="text-6xl font-extrabold text-[#007aed] mb-6">
            Bienvenue sur StageBox
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Rejoignez une communauté dynamique d'étudiants.
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-[#007aed]/10">
          <div className="flex justify-center mb-8">
            <div className="bg-[#007aed] p-3 rounded-xl">
              <Mail className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Créez votre compte</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-[#007aed]" />
                <input
                  type="text"
                  placeholder="Nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border border-[#007aed]/20 rounded-xl focus:ring-2 focus:ring-[#007aed] focus:border-[#007aed] transition-all duration-200"
                  required
                />
                {errors.lastName && <p className="text-[#ff7f04] text-sm mt-1">{errors.lastName}</p>}
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 text-[#007aed]" />
                <input
                  type="text"
                  placeholder="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border border-[#007aed]/20 rounded-xl focus:ring-2 focus:ring-[#007aed] focus:border-[#007aed] transition-all duration-200"
                  required
                />
                {errors.firstName && <p className="text-[#ff7f04] text-sm mt-1">{errors.firstName}</p>}
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-[#007aed]" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 px-4 py-3 border border-[#007aed]/20 rounded-xl focus:ring-2 focus:ring-[#007aed] focus:border-[#007aed] transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[#007aed]" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-4 py-3 border border-[#007aed]/20 rounded-xl focus:ring-2 focus:ring-[#007aed] focus:border-[#007aed] transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0d7100] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0d7100]/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#0d7100]/20"
            >
              S'inscrire
            </button>
          </form>

          {message && <span className="block text-center text-[#ff7f04] mt-4">{message}</span>}

          <p className="mt-6 text-center text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-[#007aed] hover:text-[#0079ed] font-medium">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;