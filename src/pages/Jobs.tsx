import React, { useEffect, useState } from "react";
import supabase from "./../helper/supabaseClient";
import { Briefcase, Building, MapPin, Calendar, Clock, ExternalLink, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      
      // Récupérer le nombre total d'offres
      const { count } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true });
      
      setTotalCount(count || 0);

      // Récupérer les offres pour la page actuelle
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("posted_date", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("Erreur:", error);
      } else {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const jobStats = [
    { icon: <Briefcase />, label: "Offres totales", value: totalCount },
    { icon: <Building />, label: "Entreprises", value: new Set(jobs.map(job => job.company)).size },
    { icon: <MapPin />, label: "Villes", value: new Set(jobs.map(job => job.location)).size },
  ];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header avec titre */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              <span className="text-[#007aed]">💼 Offres d'emploi</span> disponibles
            </h1>
            <p className="text-gray-600 mt-2">
              {totalCount} offre{totalCount > 1 ? 's' : ''} disponible{totalCount > 1 ? 's' : ''}
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par titre, entreprise, lieu..."
                  className="w-full pl-12 pr-4 py-2 border border-[#007aed]/20 rounded-xl focus:ring-2 focus:ring-[#007aed] focus:border-[#007aed]"
                />
              </div>
              <button className="p-2 text-[#007aed] hover:bg-[#007aed]/10 rounded-lg transition-colors">
                <Filter className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {jobStats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#007aed]/10 rounded-lg">
                    {React.cloneElement(stat.icon, { className: "h-6 w-6 text-[#007aed]" })}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Liste des offres */}
          {loading ? (
            <div className="bg-white rounded-xl shadow-md p-8">
              <p className="text-center text-gray-600">Chargement des offres...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Aucune offre disponible pour le moment</p>
              <p className="text-gray-400 text-sm">Revenez plus tard pour découvrir de nouvelles opportunités</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
                          <div className="flex items-center space-x-2 mt-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-600">{job.location}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>Publié le : {job.posted_date ? new Date(job.posted_date).toLocaleDateString() : "Non précisé"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-[#007aed]/10 text-[#007aed] rounded-full text-sm">
                            {job.type || "Type non spécifié"}
                          </span>
                          {job.duration && (
                            <span className="px-3 py-1 bg-[#0d7100]/10 text-[#0d7100] rounded-full text-sm">
                              <Clock className="h-3 w-3 inline-block mr-1" />
                              {job.duration}
                            </span>
                          )}
                        </div>
                      </div>

                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full mt-6 px-4 py-2 bg-[#007aed] text-white rounded-lg hover:bg-[#0079ed] transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Voir l'offre
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#007aed] hover:bg-[#007aed]/10'
                  } transition-colors`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === pageNumber
                            ? 'bg-[#007aed] text-white'
                            : 'text-gray-600 hover:bg-[#007aed]/10'
                        } transition-colors`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="text-gray-400">...</span>
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="px-4 py-2 rounded-lg text-gray-600 hover:bg-[#007aed]/10 transition-colors"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#007aed] hover:bg-[#007aed]/10'
                  } transition-colors`}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;