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
      icon: <Users className="h-8 w-8 text-[#007aed]" />,
      title: "Networking étudiant",
      description: "Échangez avec vos pairs et développez votre réseau professionnel"
    },
    {
      icon: <Award className="h-8 w-8 text-[#007aed]" />,
      title: "Portfolio digital",
      description: "Mettez en valeur vos compétences et certifications"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-[#007aed]" />,
      title: "Opportunités ciblées",
      description: "Accédez aux meilleures offres du secteur IT"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f9ff]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="animate-fade-in">
          <h1 className="text-7xl font-extrabold text-[#007aed] mb-8">
            Bienvenue sur StageBox
          </h1>
          <p className="text-2xl text-gray-700 max-w-2xl mx-auto mb-12">
            La plateforme qui propulse votre carrière dans le numérique
          </p>
          <div className="flex justify-center gap-6">
            <Link to={'/register'}>
              <button className="bg-[#007aed] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0079ed] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#007aed]/20">
                Créer mon profil
              </button>
            </Link>
            <Link to={'/jobs'}>
              <button className="bg-[#ff7f04] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#ff7f04]/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#ff7f04]/20">
                Explorer les opportunités
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-32 px-6">
        {statistics.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-[#007aed]/10">
            <div className="text-5xl font-bold text-[#007aed] mb-4">{stat.number}</div>
            <div className="text-gray-700 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32 px-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#007aed]/10">
            <div className="mb-6 bg-[#007aed]/5 w-16 h-16 rounded-xl flex items-center justify-center">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 mb-6">{feature.description}</p>
            <button className="text-[#007aed] font-semibold flex items-center group">
              En savoir plus
              <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </button>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-[#007aed]/5 rounded-3xl p-16 max-w-7xl mx-auto mb-24 mx-6">
        <h2 className="text-4xl font-bold mb-6 text-[#007aed]">
          Prêt à lancer votre carrière ?
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
          Rejoignez la communauté StageBox et accédez aux meilleures opportunités du secteur IT
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
          <Link to={'/register'}>
            <button className="bg-[#0d7100] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0d7100]/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#0d7100]/20 flex items-center">
              <Mail className="mr-2" />
              Créer un compte
            </button>
          </Link>
          <button className="text-[#007aed] font-semibold flex items-center group">
            En savoir plus
            <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;