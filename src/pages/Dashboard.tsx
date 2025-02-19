import React, { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // ✅ Fonction pour récupérer le token de session Supabase
  const fetchSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (data.session) {
        console.log("✅ Utilisateur connecté:", data.session.user);

        const { access_token, refresh_token } = data.session;

        if (access_token && refresh_token) {
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
        } else {
          console.log("⚠️ Tokens manquants dans la session.");
        }
      } else {
        console.log("⚠️ Aucun utilisateur connecté.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de la récupération de la session:", error.message);
    }
  };

  // ✅ Fonction pour sauvegarder le token dans Supabase Storage
  const saveTokenToStorage = async (access_token, refresh_token) => {
    if (!access_token || !refresh_token) {
      console.log("⚠️ Aucun token valide à sauvegarder.");
      return;
    }

    try {
      const { error } = await supabase.storage.from("tokens").upload(
        "userToken.json",
        JSON.stringify({ access_token, refresh_token }),
        { upsert: true, contentType: "application/json" }
      );

      if (error) throw error;
      console.log("✅ Token sauvegardé dans Supabase Storage");
      console.log(access_token);
      console.log(refresh_token);
    } catch (error) {
      console.error("❌ Erreur lors de l'enregistrement du token:", error.message);
    }
  };

  // 🔄 Exécution automatique au chargement du Dashboard
  useEffect(() => {
    fetchSession();
  }, []);

  // 🔄 Sauvegarde automatique du token lorsqu'il est récupéré
  useEffect(() => {
    if (accessToken && refreshToken) {
      saveTokenToStorage(accessToken, refreshToken);
    }
  }, [accessToken, refreshToken]);

  // 📌 Lancer le scraping
  const scrapeJobs = async () => {
    if (!accessToken) {
      console.error("❌ Aucun token trouvé, impossible de lancer le scraping.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/scrape-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      console.log("📌 Résultat du scraping :", data);
    } catch (error) {
      console.error("❌ Erreur lors du scraping :", error.message);
    }
  };

  // 🔄 Déconnexion
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="mt-32">
      <h1>Hello, you are logged in.</h1>
      <button onClick={scrapeJobs} disabled={!accessToken}>
        Scraper LinkedIn
      </button>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Dashboard;
