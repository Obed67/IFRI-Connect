import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Register attempt:', formData);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <GraduationCap className="h-12 w-12 text-blue-600 animate-bounce" />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Inscription à IFRI Connect
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['lastName', 'firstName'].map((field, index) => (
            <div key={index} className="relative">
              <User className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name={field}
                placeholder={field === 'lastName' ? 'Nom' : 'Prénom'}
                value={formData[field]}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          ))}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
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
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            S'inscrire
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
