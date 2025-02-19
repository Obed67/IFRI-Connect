import React, { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";
import { UserCircle, Mail, Phone, Award, Briefcase, BookOpen, Share2, Plus, Building } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error.message);
        return;
      }
      setUser(data?.user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const profileStats = [
    { icon: <Briefcase />, label: "Expériences", value: experiences.length || "0" },
    { icon: <Award />, label: "Certificats", value: certificates.length || "0" },
    { icon: <BookOpen />, label: "Projets", value: projects.length || "0" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-600">Chargement du profil...</p>
          ) : user ? (
            <>
              {/* Profile Header Card */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-[#007aed]/10 rounded-full flex items-center justify-center">
                      <UserCircle className="h-12 w-12 text-[#007aed]" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">
                        {user.user_metadata?.firstName || "Prénom"} {user.user_metadata?.lastName || "Nom"}
                      </h1>
                      <div className="flex items-center space-x-2 text-gray-600 mt-1">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      {user.user_metadata?.phone && (
                        <div className="flex items-center space-x-2 text-gray-600 mt-1">
                          <Phone className="h-4 w-4" />
                          <span>{user.user_metadata.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="bg-[#007aed] text-white px-4 py-2 rounded-lg hover:bg-[#0079ed] transition-colors flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager le profil
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {profileStats.map((stat, index) => (
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

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Experiences and Projects Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Experiences Section */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Expériences professionnelles</h2>
                      <button className="bg-[#ff7f04] text-white px-4 py-2 rounded-lg hover:bg-[#ff7f04]/90 transition-colors flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </button>
                    </div>
                    {experiences.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                        <Building className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Aucune expérience ajoutée</p>
                        <p className="text-gray-400 text-sm">Commencez à construire votre parcours professionnel</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Liste des expériences ici */}
                      </div>
                    )}
                  </div>

                  {/* Projects Section */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Projets réalisés</h2>
                      <button className="bg-[#ff7f04] text-white px-4 py-2 rounded-lg hover:bg-[#ff7f04]/90 transition-colors flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </button>
                    </div>
                    {projects.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Aucun projet ajouté</p>
                        <p className="text-gray-400 text-sm">Montrez vos réalisations</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Liste des projets ici */}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Certificates Section */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Certificats</h2>
                      <button className="bg-[#ff7f04] text-white px-4 py-2 rounded-lg hover:bg-[#ff7f04]/90 transition-colors flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </button>
                    </div>
                    {certificates.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                        <Award className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Aucun certificat ajouté</p>
                        <p className="text-gray-400 text-sm">Mettez en valeur vos formations</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Liste des certificats ici */}
                      </div>
                    )}
                  </div>

                  {/* Skills Section */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Compétences</h2>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'Python', 'JavaScript', 'HTML/CSS'].map((skill, index) => (
                        <span key={index} className="bg-[#007aed]/10 text-[#007aed] px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500">Utilisateur non trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;