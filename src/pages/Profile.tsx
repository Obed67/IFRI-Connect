// import { Book, Award, Briefcase, GraduationCap } from 'lucide-react';

// const Profile = () => {
//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="bg-blue-600 h-32"></div>
//         <div className="px-8 pb-8">
//           <div className="relative">
//             <img
//               src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80"
//               alt="Photo de profil"
//               className="w-32 h-32 rounded-full border-4 border-white absolute -top-16"
//             />
//           </div>
          
//           <div className="mt-20">
//             <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
//             <p className="text-gray-600">Étudiant en 3ème année • Génie Logiciel</p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 mt-8">
//             <div className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
//                   <Book className="h-5 w-5 text-blue-600" />
//                   Compétences
//                 </h2>
//                 <div className="flex flex-wrap gap-2">
//                   {['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'SQL'].map((skill) => (
//                     <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
//                   <Award className="h-5 w-5 text-blue-600" />
//                   Certifications
//                 </h2>
//                 <ul className="space-y-3">
//                   <li className="flex items-center gap-4">
//                     <img src="https://images.unsplash.com/photo-1635350736475-c8cef4b21906?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64&q=80" 
//                          alt="AWS" 
//                          className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <h3 className="font-medium text-gray-900">AWS Cloud Practitioner</h3>
//                       <p className="text-sm text-gray-600">Obtenu en Mars 2024</p>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
//                   <Briefcase className="h-5 w-5 text-blue-600" />
//                   Expériences
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="border-l-2 border-blue-600 pl-4">
//                     <h3 className="font-medium text-gray-900">Stage - Développeur Full Stack</h3>
//                     <p className="text-sm text-gray-600">TechCorp • Juin - Août 2023</p>
//                     <p className="text-sm text-gray-600 mt-2">
//                       Développement d'une application web de gestion de projet
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
//                   <GraduationCap className="h-5 w-5 text-blue-600" />
//                   Formation
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="border-l-2 border-blue-600 pl-4">
//                     <h3 className="font-medium text-gray-900">Licence en Génie Logiciel</h3>
//                     <p className="text-sm text-gray-600">IFRI • 2021 - Présent</p>
//                     <p className="text-sm text-gray-600 mt-2">
//                       Spécialisation en développement web et mobile
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error.message);
        return;
      }
      setUser(data?.user);
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-700">
              👋 Bienvenue, {user.user_metadata?.firstName || "Prénom"} {user.user_metadata?.lastName || "Nom"} !
            </h1>
            <p className="text-gray-600 mt-2">Email: <span className="font-medium">{user.email}</span></p>
            <p className="text-gray-600">ID Utilisateur: <span className="font-medium">{user.id}</span></p>
            <p className="text-gray-600">Créé le: <span className="font-medium">{new Date(user.created_at).toLocaleDateString()}</span></p>

            {/* Autres métadonnées si disponibles */}
            {user.user_metadata?.phone && <p className="text-gray-600">Téléphone: <span className="font-medium">{user.user_metadata.phone}</span></p>}
            {user.user_metadata?.role && <p className="text-gray-600">Rôle: <span className="font-medium">{user.user_metadata.role}</span></p>}

          </>
        ) : (
          <h1 className="text-2xl font-bold text-red-500">Utilisateur non trouvé</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
