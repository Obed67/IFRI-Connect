import { useEffect, useState } from "react";
import supabase from "./../helper/supabaseClient";
import React from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("posted_date", { ascending: false }); // Trier par date décroissante

      if (error) {
        console.error("Erreur:", error);
      } else {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        💼 Offres d’emploi disponibles
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Chargement des offres...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">Aucune offre pour le moment...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.company} - {job.location}</p>

              {/* Date de publication */}
              <p className="text-xs text-gray-500 mt-2">
                🗓 Publié le : {job.posted_date ? new Date(job.posted_date).toLocaleDateString() : "Non précisé"}
              </p>

              {/* Type & Durée */}
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">{job.type || "Type non spécifié"}</span>
                {job.duration && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    ⏳ {job.duration}
                  </span>
                )}
              </div>

              {/* Bouton pour voir l'offre */}
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Voir l’offre 🔗
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;