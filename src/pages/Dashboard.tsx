import React, { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userName, setUserName] = useState(""); // Ajout du nom de l'utilisateur

  const fetchSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (data.session) {
        console.log("✅ Utilisateur connecté:", data.session.user);
        const { access_token, refresh_token, user } = data.session;

        if (access_token && refresh_token) {
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
        }

        // Récupération du nom de l'utilisateur
        setUserName(user?.user_metadata?.full_name || user?.email || "Utilisateur");
      } else {
        console.log("⚠️ Aucun utilisateur connecté.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de la récupération de la session:", error.message);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="mt-32 text-center">
      <h1 className="text-2xl font-semibold text-gray-700">
        👋 Bienvenue, {userName} !
      </h1>
      <button 
        onClick={signOut} 
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default Dashboard;
