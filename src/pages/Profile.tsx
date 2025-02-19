import React, { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";
import { UserCircle, Mail, Phone, Award, Briefcase, BookOpen, Share2, Plus, Building, X, Pencil, Facebook, Send, MessageSquare, MessageCircle, Linkedin } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);

  // États pour gérer l'affichage des modales
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState({
    linkedin: "",
    discord: "",
    contact: "",
    whatsapp: "",
    telegram: "",
    facebook: "",
  });

  // États pour les formulaires
  const [experienceForm, setExperienceForm] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const [certificateForm, setCertificateForm] = useState({
    title: "",
    issued_by: "",
    issue_date: "",
  });

  // Récupérer l'utilisateur connecté
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error.message);
        return;
      }
      setUser(data?.user);
      setLoading(false);

      // Récupérer les informations du profil après avoir défini l'utilisateur
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", data?.user?.id)
        .single();

      if (profileError) {
        console.error("Erreur lors de la récupération du profil:", profileError.message);
      } else {
        setProfile(profileData);
        setProfileForm({
          linkedin: profileData?.linkedin || "",
          discord: profileData?.discord || "",
          contact: profileData?.contact || "",
          whatsapp: profileData?.whatsapp || "",
          telegram: profileData?.telegram || "",
          facebook: profileData?.facebook || "",
        });
      }
    };
    fetchUser();
  }, []);

  // Récupérer les expériences, projets et certificats depuis Supabase
  useEffect(() => {
    if (user) {
      fetchExperiences();
      fetchProjects();
      fetchCertificates();
    }
  }, [user]);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Erreur lors de la récupération des expériences:", error.message);
    } else {
      setExperiences(data);
    }
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Erreur lors de la récupération des projets:", error.message);
    } else {
      setProjects(data);
    }
  };

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Erreur lors de la récupération des certificats:", error.message);
    } else {
      setCertificates(data);
    }
  };

  // Gestion des formulaires
  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("experiences")
      .insert([{ ...experienceForm, user_id: user.id }])
      .select();

    if (error) {
      console.error("Erreur lors de l'ajout de l'expérience:", error.message);
    } else {
      setExperiences([...experiences, data[0]]);
      setShowExperienceModal(false);
      setExperienceForm({
        title: "",
        company: "",
        start_date: "",
        end_date: "",
        description: "",
      });
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("projects")
      .insert([{ ...projectForm, user_id: user.id }])
      .select();

    if (error) {
      console.error("Erreur lors de l'ajout du projet:", error.message);
    } else {
      setProjects([...projects, data[0]]);
      setShowProjectModal(false);
      setProjectForm({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
      });
    }
  };

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("certificates")
      .insert([{ ...certificateForm, user_id: user.id }])
      .select();

    if (error) {
      console.error("Erreur lors de l'ajout du certificat:", error.message);
    } else {
      setCertificates([...certificates, data[0]]);
      setShowCertificateModal(false);
      setCertificateForm({
        title: "",
        issued_by: "",
        issue_date: "",
      });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("user_profiles")
      .upsert([{ ...profileForm, user_id: user.id }])
      .select();

    if (error) {
      console.error("Erreur lors de la mise à jour du profil:", error.message);
    } else {
      setProfile(data[0]);
      setShowEditProfileModal(false);
    }
  };

  // Statistiques du profil
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
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowEditProfileModal(true)}
                      className="bg-[#007aed] text-white px-4 py-2 rounded-lg hover:bg-[#0079ed] transition-colors flex items-center"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Éditer le profil
                    </button>
                    <button className="bg-[#007aed] text-white px-4 py-2 rounded-lg hover:bg-[#0079ed] transition-colors flex items-center">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager le profil
                    </button>
                  </div>
                </div>

                {/* Affichage des informations du profil */}
                <div className="mt-4 space-y-2">
                  {profile?.linkedin && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Linkedin className="h-4 w-4" />
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        LinkedIn
                      </a>
                    </div>
                  )}
                  {profile?.discord && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MessageCircle className="h-4 w-4" />
                      <span>Discord: {profile.discord}</span>
                    </div>
                  )}
                  {profile?.contact && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>Contact: {profile.contact}</span>
                    </div>
                  )}
                  {profile?.whatsapp && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MessageSquare className="h-4 w-4" />
                      <span>WhatsApp: {profile.whatsapp}</span>
                    </div>
                  )}
                  {profile?.telegram && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Send className="h-4 w-4" />
                      <span>Telegram: {profile.telegram}</span>
                    </div>
                  )}
                  {profile?.facebook && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Facebook className="h-4 w-4" />
                      <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Facebook
                      </a>
                    </div>
                  )}
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
                      <button
                        onClick={() => setShowExperienceModal(true)}
                        className="bg-[#ff7f04] text-white px-4 py-2 rounded-lg hover:bg-[#ff7f04]/90 transition-colors flex items-center"
                      >
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
                        {experiences.map((exp) => (
                          <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-bold text-gray-800">{exp.title}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-gray-500 text-sm">
                              {new Date(exp.start_date).toLocaleDateString()} -{" "}
                              {new Date(exp.end_date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Projects Section */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Projets réalisés</h2>
                      <button
                        onClick={() => setShowProjectModal(true)}
                        className="bg-[#ff7f04] text-white px-4 py-2 rounded-lg hover:bg-[#ff7f04]/90 transition-colors flex items-center"
                      >
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
                        {projects.map((project) => (
                          <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-bold text-gray-800">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                            <p className="text-gray-500 text-sm">
                              {new Date(project.start_date).toLocaleDateString()} -{" "}
                              {new Date(project.end_date).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
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
                      <button
                        onClick={() => setShowCertificateModal(true)}
                        className="bg-[#ff7f04] text-white px-4 py-2 rounded-lg hover:bg-[#ff7f04]/90 transition-colors flex items-center"
                      >
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
                        {certificates.map((cert) => (
                          <div key={cert.id} className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-bold text-gray-800">{cert.title}</h3>
                            <p className="text-gray-600">{cert.issued_by}</p>
                            <p className="text-gray-500 text-sm">
                              {new Date(cert.issue_date).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
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

              {/* Modales pour ajouter des éléments */}
              {showExperienceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Ajouter une expérience</h2>
                      <button onClick={() => setShowExperienceModal(false)} className="text-gray-600 hover:text-gray-800">
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <form onSubmit={handleExperienceSubmit}>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Titre"
                          value={experienceForm.title}
                          onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Entreprise"
                          value={experienceForm.company}
                          onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                        <input
                          type="date"
                          placeholder="Date de début"
                          value={experienceForm.start_date}
                          onChange={(e) => setExperienceForm({ ...experienceForm, start_date: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                        <input
                          type="date"
                          placeholder="Date de fin"
                          value={experienceForm.end_date}
                          onChange={(e) => setExperienceForm({ ...experienceForm, end_date: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                        <textarea
                          placeholder="Description"
                          value={experienceForm.description}
                          onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          rows="4"
                          required
                        />
                      </div>
                      <button type="submit" className="mt-6 bg-[#007aed] text-white px-4 py-2 rounded-lg hover:bg-[#0079ed] transition-colors">
                        Enregistrer
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {showProjectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Ajouter un projet</h2>
                      <button onClick={() => setShowProjectModal(false)} className="text-gray-600 hover:text-gray-800">
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <form onSubmit={handleProjectSubmit}>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Titre"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                        <textarea
                          placeholder="Description"
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          rows="4"
                          required
                        />
                        <input
                          type="date"
                          placeholder="Date de début"
                          value={projectForm.start_date}
                          onChange={(e) => setProjectForm({ ...projectForm, start_date: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                        <input
                          type="date"
                          placeholder="Date de fin"
                          value={projectForm.end_date}
                          onChange={(e) => setProjectForm({ ...projectForm, end_date: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                      </div>
                      <button type="submit" className="mt-6 bg-[#007aed] text-white px-4 py-2 rounded-lg hover:bg-[#0079ed] transition-colors">
                        Enregistrer
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {showEditProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Éditer le profil</h2>
                      <button onClick={() => setShowEditProfileModal(false)} className="text-gray-600 hover:text-gray-800">
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <form onSubmit={handleProfileSubmit}>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Lien LinkedIn"
                          value={profileForm.linkedin}
                          onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Discord"
                          value={profileForm.discord}
                          onChange={(e) => setProfileForm({ ...profileForm, discord: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Contact"
                          value={profileForm.contact}
                          onChange={(e) => setProfileForm({ ...profileForm, contact: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="WhatsApp"
                          value={profileForm.whatsapp}
                          onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Telegram"
                          value={profileForm.telegram}
                          onChange={(e) => setProfileForm({ ...profileForm, telegram: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Facebook"
                          value={profileForm.facebook}
                          onChange={(e) => setProfileForm({ ...profileForm, facebook: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <button type="submit" className="mt-6 bg-[#007aed] text-white px-4 py-2 rounded-lg hover:bg-[#0079ed] transition-colors">
                        Enregistrer
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {showCertificateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Ajouter un certificat</h2>
                      <button onClick={() => setShowCertificateModal(false)} className="text-gray-600 hover:text-gray-800">
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <form onSubmit={handleCertificateSubmit}>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Titre"
                          value={certificateForm.title}
                          onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Organisme"
                          value={certificateForm.issued_by}
                          onChange={(e) => setCertificateForm({ ...certificateForm, issued_by: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                        <input
                          type="date"
                          placeholder="Date d'obtention"
                          value={certificateForm.issue_date}
                          onChange={(e) => setCertificateForm({ ...certificateForm, issue_date: e.target.value })}
                          className="w-full p-2 border border-gray-200 rounded-lg"
                          required
                        />
                      </div>
                      <button type="submit" className="mt-6 bg-[#007aed] text-white px-4 py-2 rounded-lg hover:bg-[#0079ed] transition-colors">
                        Enregistrer
                      </button>
                    </form>
                  </div>
                </div>
              )}
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