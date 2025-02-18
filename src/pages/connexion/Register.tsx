import { useState } from 'react';
import { GraduationCap, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../supabase'; // Import Supabase
import React from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L’email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        },
      });

      console.log("Réponse de Supabase :", data);

      if (error) {
        toast.error(`❌ ${error.message}`, { position: 'top-right', autoClose: 3000 });
      } else {
        toast.success('🎉 Inscription réussie ! Vérifiez votre email.', { position: 'top-right', autoClose: 3000 });
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      console.error("Erreur inattendue :", err);
      toast.error(`❌ Erreur : ${err.message}`, { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ToastContainer />
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-10 relative">
        <div className="max-w-xl">
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-6">
            Bienvenue sur IFRI Connect
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Rejoignez une communauté dynamique d'étudiants et d'enseignants.
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-3 rounded-xl">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Créez votre compte</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {['lastName', 'firstName'].map((field, index) => (
                <div key={index} className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name={field}
                    placeholder={field === 'lastName' ? 'Nom' : 'Prénom'}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                  {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {['password', 'confirmPassword'].map((field, index) => (
              <div key={index} className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name={field}
                  placeholder={field === 'password' ? 'Mot de passe' : 'Confirmer le mot de passe'}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300"
            >
              S'inscrire
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;