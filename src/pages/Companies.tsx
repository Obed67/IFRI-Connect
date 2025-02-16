import React from 'react';
import { MapPin, Globe, Users } from 'lucide-react';

const Companies = () => {
  const companies = [
    {
      id: 1,
      name: 'TechCorp Bénin',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128&q=80',
      location: 'Cotonou, Bénin',
      domain: 'Développement Web & Mobile',
      employees: '50-100',
      description: 'Leader dans le développement de solutions digitales au Bénin'
    },
    {
      id: 2,
      name: 'InnoSoft',
      logo: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128&q=80',
      location: 'Porto-Novo, Bénin',
      domain: 'Intelligence Artificielle & Big Data',
      employees: '20-50',
      description: 'Spécialiste en solutions d\'IA pour les entreprises'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Entreprises IT au Bénin</h1>
        <p className="text-gray-600 mt-2">
          Découvrez les entreprises technologiques qui recrutent au Bénin
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={company.logo}
                  alt={`Logo ${company.name}`}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{company.name}</h2>
                  <div className="mt-2 space-y-2">
                    <p className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {company.location}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <Globe className="h-4 w-4 mr-2" />
                      {company.domain}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {company.employees} employés
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{company.description}</p>
              <div className="mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Voir les offres
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;