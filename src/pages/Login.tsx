import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // La logique de connexion sera implémentée plus tard
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <GraduationCap className="h-12 w-12 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Connexion à IFRI Connect
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="votre.email@ifri-edu.bj"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Vous n'avez pas encore reçu vos identifiants ?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Contactez l'administration
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;