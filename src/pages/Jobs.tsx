import { useEffect, useState } from "react";
import supabase from "../supabase.js";
import React from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from("jobs").select("*");
      if (error) console.error("Erreur:", error);
      else setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Offres d’emploi disponibles</h1>
      {jobs.length === 0 ? (
        <p>Aucune offre pour le moment...</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 bg-gray-100 rounded-md shadow">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-700">{job.company} - {job.location}</p>
              <p className="text-sm text-gray-500">Publié le : {new Date(job.postedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;