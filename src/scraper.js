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

    const pageHTML = await page.content();
    // console.log("📄 Contenu de la page HTML :", pageHTML);

    const jobListings = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".base-search-card__title"))
        .map((el) => el.innerText.trim());
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
  console.log("🔑 Utilisateur actuel :", supabase.auth.getUser());

  try {
    const { data: user, error: authError } = await supabase.auth.getUser();

    if (authError || !user?.user) {
      console.error("❌ Erreur d'authentification:", authError?.message || "Utilisateur non connecté.");
      return { success: false, error: authError };
    }

    console.log("✅ Utilisateur authentifié :", user.user);
    const { data: session } = await supabase.auth.getSession();
console.log("🔍 Session en cours :", session);


    // Ajout de user_id dans chaque job
    const jobRecords = jobs.map((job) => ({
      title: job,
      user_id: user.user.id, // Ajout du user_id obligatoire
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
