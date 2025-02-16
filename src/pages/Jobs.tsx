import React from 'react';
import { Calendar, Clock, MapPin, Building2 } from 'lucide-react';

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: 'Développeur Full Stack',
      company: 'TechCorp Bénin',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64&q=80',
      location: 'Cotonou, Bénin',
      type: 'Stage',
      duration: '6 mois',
      postedAt: '2024-03-15',
      skills: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Data Scientist Junior',
      company: 'InnoSoft',
      logo: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64&q=80',
      location: 'Porto-Novo, Bénin',
      type: 'CDI',
      postedAt: '2024-03-14',
      skills: ['Python', 'Machine Learning', 'SQL']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Offres d'emploi et stages</h1>
        <p className="text-gray-600 mt-2">
          Trouvez les meilleures opportunités dans le secteur IT au Bénin
        </p>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={job.logo}
                  alt={`Logo ${job.company}`}
                  className="w-12 h-12 rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                      <div className="mt-2 space-y-2">
                        <p className="flex items-center text-gray-600">
                          <Building2 className="h-4 w-4 mr-2" />
                          {job.company}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.location}
                        </p>
                        {job.duration && (
                          <p className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {job.duration}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Publié le {new Date(job.postedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Postuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;