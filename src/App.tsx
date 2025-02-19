// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import Companies from "./pages/Companies";
// import Jobs from "./pages/Jobs";
// import Messages from "./pages/Messages";
// import Login from "./pages/connexion/Login";
// import Register from "./pages/connexion/Register";

// function App() {
//      return (
//           <Router>
//                <div className="min-h-screen bg-gray-50 flex flex-col">
//                     <Navbar />
//                     <main className="container mx-auto px-4 py-8 flex-grow">
//                          <Routes>
//                               <Route path="/" element={<Home />} />
//                               <Route path="/profile" element={<Profile />} />
//                               <Route path="/companies" element={<Companies />} />
//                               <Route path="/jobs" element={<Jobs />} />
//                               <Route path="/messages" element={<Messages />} />
//                               <Route path="/login" element={<Login />} />
//                               <Route path="/register" element={<Register />} />
//                          </Routes>
//                     </main>
//                     <Footer />
//                </div>
//                <ToastContainer position="top-right" autoClose={3000} />
//           </Router>
//      );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import MainLayout from "./components/layout/Layout";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import Companies from "./pages/Companies";
// import Jobs from "./pages/Jobs";
// import Messages from "./pages/Messages";
// import Login from "./pages/connexion/Login";
// import Register from "./pages/connexion/Register";
// import { useEffect, useState } from "react";
// import supabase from './supabase'; // Import Supabase
// import React from 'react';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       setIsAuthenticated(!!user);
//     };

//     checkUser();
//   }, []);

//   return (
//     <Router>
//       <MainLayout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {/* Routes protégées */}
//           {isAuthenticated ? (
//             <>
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/companies" element={<Companies />} />
//               <Route path="/jobs" element={<Jobs />} />
//               <Route path="/messages" element={<Messages />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/" replace />} />
//           )}
//         </Routes>
//       </MainLayout>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Register from "./pages/connexion/Register";
// import Login from "./pages/connexion/Login";
// import Dashboard from "./pages/Dashboard";
// import Wrapper from "./pages/Wrapper";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* home */}
//         <Route path="/" element={<Home />} />

//         {/* register */}
//         <Route path="/register" element={<Register />} />

//         {/* login */}
//         <Route path="/login" element={<Login />} />

//         {/* dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <Wrapper>
//               <Dashboard />
//             </Wrapper>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/connexion/Register";
import Login from "./pages/connexion/Login";
import Dashboard from "./pages/Dashboard";
import Wrapper from "./pages/Wrapper";
import Navbar from "./components/Navbar";
import NavbarConnected from "./components/NavbarConnected";
import Messages from "./pages/Messages";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
import Companies from "./pages/Companies";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home */}
        <Route
          path="/"
          element={
            <>
              <Navbar /> {/* Affiche la Navbar uniquement sur la page d'accueil */}
              <Home />
            </>
          }
        />

        {/* register */}
        <Route path="/register" element={
          <>
            <Navbar /> {/* Affiche la Navbar uniquement sur la page d'inscription */}
            <Register />
          </>
        }
        />

        {/* login */}
        <Route path="/login" element={
          <>
            <Navbar /> {/* Affiche la Navbar uniquement sur la page de connexion */}
            <Login />
          </>
        }
        />

        {/* dashboard */}
        <Route
          path="/dashboard"
          element={
            <Wrapper>
              <>
                <NavbarConnected />
                <Dashboard />
              </>

            </Wrapper>
          }
        />

        <Route
          path="/messages"
          element={
            <Wrapper>
              <NavbarConnected />
              <Messages />
            </Wrapper>
          }
        />

        <Route
          path="/profile"
          element={
            <Wrapper>
              <NavbarConnected />
              <Profile />
            </Wrapper>
          }
        />

        {/* <Route
          path="/settings"
          element={
            <Wrapper>
              <NavbarConnected />
              <Settings />
            </Wrapper>
          }
        /> */}

        <Route
          path="/jobs"
          element={
            <Wrapper>
              <NavbarConnected />
              <Jobs />
            </Wrapper>
          }
        />

        <Route
          path="/entreprises"
          element={
            <Wrapper>
              <NavbarConnected />
              <Companies />
            </Wrapper>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;