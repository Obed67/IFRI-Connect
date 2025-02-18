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


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Companies from "./pages/Companies";
import Jobs from "./pages/Jobs";
import Messages from "./pages/Messages";
import Login from "./pages/connexion/Login";
import Register from "./pages/connexion/Register";
import { useEffect, useState } from "react";
import supabase from './supabase'; // Import Supabase
import React from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };

    checkUser();
  }, []);

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Routes protégées */}
          {isAuthenticated ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/messages" element={<Messages />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;