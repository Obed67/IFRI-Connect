// import { useState } from 'react';
// import { GraduationCap, Mail, Lock } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email.includes('@')) {
//       newErrors.email = "L'email est invalide";
//     }
//     if (formData.password.length < 6) {
//       newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Login attempt:', formData);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Section de gauche */}
//       <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-10 relative">
//         <div className="max-w-xl">
//           <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-6">
//             Reconnectez-vous sur IFRI Connect
//           </h1>
//           <p className="text-2xl text-gray-600 mb-8">
//             Accédez à votre espace personnel et restez connecté avec votre communauté.
//           </p>
//         </div>
//       </div>

//       {/* Section de droite */}
//       <div className="flex-1 flex justify-center items-center p-6">
//         <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
//           <div className="flex justify-center mb-8">
//             <div className="bg-blue-600 p-3 rounded-xl">
//               <GraduationCap className="h-12 w-12 text-white" />
//             </div>
//           </div>

//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
//             Connexion
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                 required
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Mot de passe"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                 required
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300"
//             >
//               Se connecter
//             </button>
//           </form>

//           <p className="mt-6 text-center text-gray-600">
//             Vous n'avez pas de compte ?{' '}
//             <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
//               Inscrivez-vous
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { GraduationCap, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
     const [formData, setFormData] = useState({
          email: "",
          password: "",
     });

     const navigate = useNavigate();

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const validateForm = () => {
          let isValid = true;

          if (!formData.email.includes("@")) {
               toast.error("❌ L'email est invalide", {
                    position: "top-right",
                    autoClose: 3000,
               });
               isValid = false;
          }

          if (formData.password.length < 6) {
               toast.error(
                    "❌ Le mot de passe doit contenir au moins 6 caractères",
                    {
                         position: "top-right",
                         autoClose: 3000,
                    }
               );
               isValid = false;
          }

          return isValid;
     };

     const handleSubmit = (e) => {
          e.preventDefault();

          if (validateForm()) {
               const storedUsers =
                    JSON.parse(localStorage.getItem("users")) || [];

               const userExists = storedUsers.find(
                    (user) =>
                         user.email === formData.email &&
                         user.password === formData.password
               );

               if (userExists) {
                    localStorage.setItem(
                         "currentUser",
                         JSON.stringify(userExists)
                    );

                    toast.success(
                         "🎉 Connexion réussie ! Welcome to IFRI Connect.",
                         {
                              position: "top-right",
                              autoClose: 3000,
                         }
                    );

                    navigate("/dashboard");
               } else {
                    toast.error("❌ Email ou mot de passe incorrect", {
                         position: "top-right",
                         autoClose: 3000,
                    });
               }
          }
     };

     return (
          <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-white">
               <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-10">
                    <div className="max-w-xl">
                         <h1 className="text-6xl font-extrabold text-blue-800 mb-6">
                              Reconnectez-vous sur IFRI Connect
                         </h1>
                         <p className="text-2xl text-gray-600 mb-8">
                              Accédez à votre espace personnel et restez
                              connecté avec votre communauté.
                         </p>
                    </div>
               </div>
               <div className="flex-1 flex justify-center items-center p-6">
                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
                         <div className="flex justify-center mb-8">
                              <div className="bg-blue-600 p-3 rounded-xl">
                                   <GraduationCap className="h-12 w-12 text-white" />
                              </div>
                         </div>
                         <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                              Connexion
                         </h2>
                         <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="relative">
                                   <Mail className="absolute left-3 top-3 text-gray-400" />
                                   <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        required
                                   />
                              </div>
                              <div className="relative">
                                   <Lock className="absolute left-3 top-3 text-gray-400" />
                                   <input
                                        type="password"
                                        name="password"
                                        placeholder="Mot de passe"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        required
                                   />
                              </div>
                              <button
                                   type="submit"
                                   className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300"
                              >
                                   Se connecter
                              </button>
                         </form>
                         <p className="mt-6 text-center text-gray-600">
                              Vous n'avez pas de compte ?{" "}
                              <Link
                                   to="/register"
                                   className="text-blue-600 hover:text-blue-500 font-medium"
                              >
                                   Inscrivez-vous
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
};

export default Login;

