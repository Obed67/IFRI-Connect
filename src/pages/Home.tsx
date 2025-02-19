import { Briefcase, Users, Award, Mail, ArrowUpRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const statistics = [
    { number: "500+", label: "Étudiants inscrits" },
    { number: "50+", label: "Entreprises partenaires" },
    { number: "200+", label: "Offres de stages" },
    { number: "100%", label: "Taux d'insertion" }
  ];

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />, 
      title: "Networking étudiant",
      description: "Échangez avec vos pairs et développez votre réseau professionnel"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />, 
      title: "Portfolio digital",
      description: "Mettez en valeur vos compétences et certifications"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-600" />, 
      title: "Opportunités ciblées",
      description: "Accédez aux meilleures offres du secteur IT"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      {/* <Link to="/register">Register</Link>
      <br></br>
      <Link to="/login">Login</Link> */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
          Bienvenue sur IFRI Connect
        </h1>
        <p className="text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
          La plateforme qui propulse votre carrière dans le numérique
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition">
            Créer mon profil
          </button>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition">
            Explorer les opportunités
          </button>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-4 gap-8 max-w-7xl mx-auto mb-24">
        {statistics.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-xl text-center transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <button className="text-blue-600 font-semibold flex items-center group">
              En savoir plus
              <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
            </button>
          </div>
        ))}
      </div>
      
      {/* Call to Action */}
      <div className="text-center bg-blue-50 rounded-2xl p-12 max-w-7xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-6">Prêt à lancer votre carrière ?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Rejoignez la communauté IFRI Connect et accédez aux meilleures opportunités du secteur IT
        </p>
        <div className="flex justify-center gap-6">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition flex items-center">
            <Mail className="mr-2" />
            Créer un compte
          </button>
          <button className="text-blue-600 font-semibold flex items-center group">
            En savoir plus
            <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
