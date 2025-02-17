// import { useState } from 'react';
// import { GraduationCap, Mail, Lock, User } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Register attempt:', formData);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Section de gauche */}
//       <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-10 relative">
//         <div className="max-w-xl">
//           <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-6">
//             Bienvenue sur IFRI Connect
//           </h1>
//           <p className="text-2xl text-gray-600 mb-8">
//             Rejoignez une communauté dynamique d'étudiants et d'enseignants. Découvrez une nouvelle façon d'apprendre et de collaborer.
//           </p>
//           <div className="space-y-6">
//             <div className="flex items-center space-x-4">
//               <div className="bg-blue-600 p-3 rounded-xl">
//                 <User className="h-6 w-6 text-white" />
//               </div>
//               <p className="text-xl text-gray-600">Profils personnalisés</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="bg-blue-600 p-3 rounded-xl">
//                 <Mail className="h-6 w-6 text-white" />
//               </div>
//               <p className="text-xl text-gray-600">Communication simplifiée</p>
//             </div>
//           </div>
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
//             Créez votre compte
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { name: 'lastName', placeholder: 'Nom' },
//                 { name: 'firstName', placeholder: 'Prénom' }
//               ].map((field, index) => (
//                 <div key={index} className="relative">
//                   <User className="absolute left-3 top-3 text-gray-400" />
//                   <input
//                     type="text"
//                     name={field.name}
//                     placeholder={field.placeholder}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                     required
//                   />
//                 </div>
//               ))}
//             </div>

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
//             </div>

//             {[
//               { name: 'password', placeholder: 'Mot de passe' },
//               { name: 'confirmPassword', placeholder: 'Confirmer le mot de passe' }
//             ].map((field, index) => (
//               <div key={index} className="relative">
//                 <Lock className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="password"
//                   name={field.name}
//                   placeholder={field.placeholder}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   required
//                 />
//                 {errors[field.name] && (
//                   <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
//                 )}
//               </div>
//             ))}

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300"
//             >
//               S'inscrire
//             </button>
//           </form>

//           <p className="mt-6 text-center text-gray-600">
//             Vous avez déjà un compte ?{' '}
//             <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
//               Connectez-vous
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from 'react';
import { GraduationCap, Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.email === formData.email)) {
      newErrors.email = 'Cet email est déjà utilisé';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      toast.success('🎉 Inscription réussie ! Vous pouvez maintenant vous connecter.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ToastContainer />
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-10 relative">
        <div className="max-w-xl">
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-6">
            Bienvenue sur IFRI Connect
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Rejoignez une communauté dynamique d'étudiants et d'enseignants.
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Créez votre compte</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[{ name: 'lastName', placeholder: 'Nom' }, { name: 'firstName', placeholder: 'Prénom' }].map((field, index) => (
                <div key={index} className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              ))}
            </div>

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

            {[{ name: 'password', placeholder: 'Mot de passe' }, { name: 'confirmPassword', placeholder: 'Confirmer le mot de passe' }].map((field, index) => (
              <div key={index} className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300"
            >
              S'inscrire
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

