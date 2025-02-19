import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import {
  Briefcase, Users, Award, Mail, GraduationCap,
  UserCircle, Bell, Search, BookOpen, Building,
  ChevronRight, Bookmark, Clock, TrendingUp, Database
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (session) {
        setUser(session.user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Erreur session:", error.message);
      navigate("/login");
    }
  };

  const stats = [
    { icon: <Briefcase />, label: "Stages disponibles", value: "145", change: "+12%" },
    { icon: <Users />, label: "Entreprises partenaires", value: "50", change: "+5%" },
    { icon: <Award />, label: "Compétences validées", value: "28", change: "+3%" },
    { icon: <BookOpen />, label: "Projets publiés", value: "12", change: "+2%" }
  ];

  const recentInternships = [
    {
      company: "Tech Solutions",
      position: "Développeur Full Stack",
      type: "Stage - 6 mois",
      location: "Cotonou, Bénin"
    },
    {
      company: "Digital Innovation",
      position: "Data Analyst",
      type: "Stage - 4 mois",
      location: "Porto-Novo, Bénin"
    },
    {
      company: "Web Agency",
      position: "UX/UI Designer",
      type: "Stage - 3 mois",
      location: "Cotonou, Bénin"
    }
  ];

  const latestActivities = [
    "Nouveau projet ajouté : Application mobile de gestion de tâches",
    "Certification obtenue : React Advanced",
    "Stage validé chez Tech Solutions",
    "Nouveau badge : Expert JavaScript"
  ];

  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      {/* Main Content */}
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des stages, entreprises, compétences..."
                className="w-full pl-12 pr-4 py-2 border border-[#007aed]/20 rounded-xl focus:ring-2 focus:ring-[#007aed] focus:border-[#007aed]"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#007aed]/10 rounded-lg">
                    {React.cloneElement(stat.icon, { className: "h-6 w-6 text-[#007aed]" })}
                  </div>
                  <span className="text-[#0d7100] text-sm font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Internships */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Stages récents</h2>
                  <button className="text-[#007aed] hover:text-[#0079ed] font-medium flex items-center">
                    Voir tout <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentInternships.map((internship, index) => (
                    <div key={index} className="border border-[#007aed]/10 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{internship.position}</h3>
                          <p className="text-gray-600">{internship.company}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">{internship.type}</span>
                            <span className="text-sm text-gray-500">{internship.location}</span>
                          </div>
                        </div>
                        <button className="text-[#007aed] hover:text-[#0079ed]">
                          <Bookmark className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Showcase */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Vos projets</h2>
                  <button className="bg-[#0d7100] text-white px-4 py-2 rounded-lg hover:bg-[#0d7100]/90 transition-colors">
                    Nouveau projet
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-[#007aed]/10 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800">Application mobile de gestion</h3>
                    <p className="text-gray-600 text-sm mt-2">React Native, Firebase</p>
                    <div className="flex items-center space-x-2 mt-4">
                      <Database className="h-4 w-4 text-[#007aed]" />
                      <span className="text-sm text-gray-500">En cours</span>
                    </div>
                  </div>
                  <div className="border border-[#007aed]/10 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800">API REST e-commerce</h3>
                    <p className="text-gray-600 text-sm mt-2">Node.js, MongoDB</p>
                    <div className="flex items-center space-x-2 mt-4">
                      <Award className="h-4 w-4 text-[#0d7100]" />
                      <span className="text-sm text-gray-500">Terminé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-[#007aed]/10 rounded-full flex items-center justify-center mb-4">
                    <UserCircle className="h-12 w-12 text-[#007aed]" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{user?.email}</h2>
                  <p className="text-gray-600 mb-4">Étudiant en Informatique</p>
                  <button className="w-full bg-[#007aed] text-white px-4 py-2 rounded-lg hover:bg-[#0079ed] transition-colors">
                    Éditer le profil
                  </button>
                </div>
              </div>

              {/* Latest Activities */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Activités récentes</h2>
                <div className="space-y-4">
                  {latestActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-[#007aed]/10 rounded-full">
                        <Clock className="h-4 w-4 text-[#007aed]" />
                      </div>
                      <p className="text-gray-600 text-sm">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;