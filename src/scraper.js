import { chromium } from "playwright";
import supabase from "./helper/supabaseClient.js";

const getSupabaseTokenFromStorage = async () => {
  try {
    console.log("🔑 Tentative de récupération du token depuis Supabase Storage...");
    const { data, error } = await supabase.storage.from("tokens").download("userToken.json");

    if (error) {
      console.error("❌ Erreur lors de la récupération du token:", error.message);
      return null;
    }

    if (!data) {
      console.error("❌ Aucun fichier trouvé.");
      return null;
    }

    const tokenData = await data.text();
    const tokenJSON = JSON.parse(tokenData);

    if (!tokenJSON.access_token || !tokenJSON.refresh_token) {
      console.error("❌ Token invalide dans le fichier !");
      return null;
    }

    // Définir la session pour Supabase
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: tokenJSON.access_token,
      refresh_token: tokenJSON.refresh_token,
    });

    if (sessionError) {
      console.error("❌ Erreur lors de la définition de la session :", sessionError.message);
      return null;
    }

    console.log("✅ Session utilisateur établie !");
    return tokenJSON.access_token;
  } catch (error) {
    console.error("❌ Erreur inattendue lors de la récupération du token:", error.message);
    return null;
  }
};


const scrapeLinkedInJobs = async () => {
  console.log("🔎 Scraping en cours...");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.linkedin.com/jobs/search/?keywords=Developpeur%20React", {
      waitUntil: "domcontentloaded",
    });

    await page.waitForTimeout(5000); // Attente pour chargement complet

    const jobListings = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".job-search-card")).map((job) => {
        const titleElement = job.querySelector(".base-search-card__title");
        const companyElement = job.querySelector(".base-search-card__subtitle a");
        const locationElement = job.querySelector(".job-search-card__location");
        const linkElement = job.querySelector(".base-card__full-link");
        const typeElement = job.querySelector(".job-result-card__employment-type"); // CDI, CDD, Stage...
        const durationElement = job.querySelector(".job-result-card__duration"); // Ex : 6 mois
        const dateElement = job.querySelector(".job-search-card__listdate"); // Date de publication

        return {
          title: titleElement ? titleElement.innerText.trim() : "Non spécifié",
          company: companyElement ? companyElement.innerText.trim() : "Non spécifié",
          location: locationElement ? locationElement.innerText.trim() : "Non spécifié",
          type: typeElement ? typeElement.innerText.trim() : "Non spécifié",
          duration: durationElement ? durationElement.innerText.trim() : "Non spécifié",
          posted_date: dateElement ? dateElement.innerText.trim() : "Non spécifié",
          link: linkElement ? linkElement.href : "Non disponible",
        };
      });
    });

    console.log("📄 Jobs récupérés:", jobListings);
    await browser.close();
    return jobListings;
  } catch (error) {
    console.error("❌ Erreur pendant le scraping :", error.message);
    await browser.close();
    return [];
  }
};



async function saveJobsToSupabase(jobs) {
  try {
    const { data: user, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("❌ Erreur d'authentification:", authError?.message || "Utilisateur non connecté.");
      return { success: false, error: authError };
    }

    console.log("✅ Utilisateur authentifié :", user);

    // Préparation des données pour l'insertion
    const jobRecords = jobs.map((job) => ({
      title: job.title,           // ✅ Titre du poste
      company: job.company,       // ✅ Nom de l'entreprise
      location: job.location,     // ✅ Lieu de l'offre
      type: job.type,             // ✅ Type de contrat (CDI, CDD, Stage...)
      duration: job.duration,     // ✅ Durée de l'offre (si disponible)
      posted_date: job.posted_date, // ✅ Date de publication
      link: job.link,             // ✅ Lien vers l'offre
      user_id: user.id            // ✅ ID de l'utilisateur
    }));

    const { data, error } = await supabase
      .from("jobs")
      .insert(jobRecords)
      .select();

    if (error) {
      console.error("❌ Erreur lors de l’enregistrement :", error.message);
      return { success: false, error };
    }

    console.log("✅ Jobs enregistrés avec succès !", data);
    return { success: true, data };
  } catch (err) {
    console.error("❌ Erreur inattendue :", err);
    return { success: false, error: err };
  }
}



(async () => {
  console.log("🔑 Récupération du token depuis Supabase Storage...");
  const token = await getSupabaseTokenFromStorage();

  if (!token) {
    console.error("❌ Impossible d'exécuter le script sans token.");
    return;
  }

  console.log("🚀 Lancement du scraping...");
  const jobs = await scrapeLinkedInJobs();

  if (jobs.length > 0) {
    console.log("📡 Enregistrement des jobs dans Supabase...");
    await saveJobsToSupabase(jobs, token); // Décommente si tu veux enregistrer
  } else {
    console.log("⚠️ Aucune offre trouvée, vérifie la page LinkedIn.");
  }
})();
