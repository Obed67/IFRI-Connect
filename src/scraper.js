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


// const scrapeLinkedInJobs = async () => {
//   console.log("🔎 Scraping en cours...");

//   const browser = await chromium.launch({ headless: true });
//   const page = await browser.newPage();

//   try {
//     await page.goto("https://www.linkedin.com/jobs/search/?keywords=Developpeur%20React", {
//       waitUntil: "domcontentloaded",
//     });

//     await page.waitForTimeout(5000); // Attente pour chargement complet

//     const jobListings = await page.evaluate(() => {
//       return Array.from(document.querySelectorAll(".job-search-card")).map((job) => {
//         const titleElement = job.querySelector(".base-search-card__title");
//         const companyElement = job.querySelector(".base-search-card__subtitle a");
//         const locationElement = job.querySelector(".job-search-card__location");
//         const linkElement = job.querySelector(".base-card__full-link");
//         const typeElement = job.querySelector(".job-result-card__employment-type"); // CDI, CDD, Stage...
//         const durationElement = job.querySelector(".job-result-card__duration"); // Ex : 6 mois
//         const dateElement = job.querySelector(".job-search-card__listdate"); // Date de publication

//         return {
//           title: titleElement ? titleElement.innerText.trim() : "Non spécifié",
//           company: companyElement ? companyElement.innerText.trim() : "Non spécifié",
//           location: locationElement ? locationElement.innerText.trim() : "Non spécifié",
//           type: typeElement ? typeElement.innerText.trim() : "Non spécifié",
//           duration: durationElement ? durationElement.innerText.trim() : "Non spécifié",
//           posted_date: dateElement ? dateElement.innerText.trim() : "Non spécifié",
//           link: linkElement ? linkElement.href : "Non disponible",
//         };
//       });
//     });

//     console.log("📄 Jobs récupérés:", jobListings);
//     await browser.close();
//     return jobListings;
//   } catch (error) {
//     console.error("❌ Erreur pendant le scraping :", error.message);
//     await browser.close();
//     return [];
//   }
// };



const MAX_DAYS_AGO = 7; // Modifier selon tes besoins

const scrapeLinkedInJobs = async () => {
  console.log("🔎 Scraping en cours...");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.linkedin.com/jobs/search/?keywords=Developpeur%20React", {
      waitUntil: "domcontentloaded",
    });

    console.log("📄 Chargement de la page terminé...");

    // 🔽 Scroll plusieurs fois pour charger toutes les offres
    let previousHeight = 0;
    for (let i = 0; i < 5; i++) {
      console.log(`⬇️ Scroll ${i + 1}...`);
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.waitForTimeout(3000);

      let newHeight = await page.evaluate(() => document.body.scrollHeight);
      if (newHeight === previousHeight) break;
      previousHeight = newHeight;
    }

    // 📌 Scraper les offres visibles
    const jobListings = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".job-search-card")).map((job) => {
        const titleElement = job.querySelector(".base-search-card__title");
        const companyElement = job.querySelector(".base-search-card__subtitle a");
        const locationElement = job.querySelector(".job-search-card__metadata span");
        const linkElement = job.querySelector(".base-card__full-link");
        const dateElement = job.querySelector(".job-search-card__listdate");

        return {
          title: titleElement ? titleElement.innerText.trim() : "Non spécifié",
          company: companyElement ? companyElement.innerText.trim() : "Non spécifié",
          location: locationElement ? locationElement.innerText.trim() : "Non spécifié",
          posted_date: dateElement ? dateElement.innerText.trim() : "Non spécifié",
          link: linkElement ? linkElement.href : "Non disponible",
        };
      });
    });

    console.log(`📌 Nombre total d'offres récupérées : ${jobListings.length}`);

    // 🔍 Filtrer par date de publication
    const recentJobs = jobListings.filter((job) => {
      if (job.posted_date === "Non spécifié") return true; // Conserver les offres sans date

      const match = job.posted_date.match(/(\d+)\s*(jour|jours|semaine|semaines)/i);
      if (match) {
        let number = parseInt(match[1], 10);
        let unit = match[2];

        if ((unit.includes("semaine") && number * 7 > MAX_DAYS_AGO) || (unit.includes("jour") && number > MAX_DAYS_AGO)) {
          return false; // Exclure si trop ancien
        }
      }
      return true;
    });

    console.log("📄 Offres récentes:", recentJobs);
    await browser.close();
    return recentJobs;
  } catch (error) {
    console.error("❌ Erreur pendant le scraping :", error.message);
    await browser.close();
    return [];
  }
};


// const LINKEDIN_URL = `https://www.linkedin.com/jobs/search/?keywords=Developpeur%20React`;
// const TARGET_LOCATIONS = ["cotonou", "abomey-calavi", "littoral", "atlantique", "bénin"];
//  // Localisations ciblées
// const MAX_DAYS_AGO = 7; // Nombre max de jours depuis la publication

// const scrapeLinkedInJobs = async () => {
//   console.log("🔎 Scraping en cours...");

//   const browser = await chromium.launch({ headless: true });
//   const page = await browser.newPage();

//   try {
//     await page.goto(LINKEDIN_URL, { waitUntil: "domcontentloaded" });
//     console.log("📄 Chargement de la page terminé...");

//     // 🔽 Scroll plusieurs fois pour charger toutes les offres
//     let previousHeight = 0;
//     for (let i = 0; i < 5; i++) {
//       console.log(`⬇️ Scroll ${i + 1}...`);
//       await page.evaluate(() => window.scrollBy(0, window.innerHeight));
//       await page.waitForTimeout(3000);

//       let newHeight = await page.evaluate(() => document.body.scrollHeight);
//       if (newHeight === previousHeight) break;
//       previousHeight = newHeight;
//     }

//     // 📌 Scraper les offres visibles
//     const jobListings = await page.evaluate(() => {
//       return Array.from(document.querySelectorAll(".job-search-card")).map((job) => {
//         const titleElement = job.querySelector(".base-search-card__title");
//         const companyElement = job.querySelector(".base-search-card__subtitle a");
//         const locationElement = job.querySelector(".job-search-card__metadata span");
//         const linkElement = job.querySelector(".base-card__full-link");
//         const dateElement = job.querySelector(".job-search-card__listdate");

//         return {
//           title: titleElement ? titleElement.innerText.trim() : "Non spécifié",
//           company: companyElement ? companyElement.innerText.trim() : "Non spécifié",
//           location: locationElement ? locationElement.innerText.trim().toLowerCase() : "Non spécifié",
//           posted_date: dateElement ? dateElement.innerText.trim() : "Non spécifié",
//           link: linkElement ? linkElement.href : "Non disponible",
//         };
//       });
//     });

//     console.log(`📌 Nombre total d'offres récupérées : ${jobListings.length}`);
//     console.log("📍 Localisations récupérées :", jobListings.map(job => job.location));


//     // 🔍 Filtrer par localisation (Cotonou, Abomey-Calavi)
//     const filteredByLocation = jobListings.filter((job) =>
//       TARGET_LOCATIONS.some((city) => job.location.includes(city))
//     );
    

//     // 🔍 Filtrer par date de publication
//     const recentJobs = filteredByLocation.filter((job) => {
//       if (job.posted_date === "Non spécifié") return true;

//       const match = job.posted_date.match(/(\d+)\s*(jour|jours|semaine|semaines)/i);
//       if (match) {
//         let number = parseInt(match[1], 10);
//         let unit = match[2];

//         if ((unit.includes("semaine") && number * 7 > MAX_DAYS_AGO) || (unit.includes("jour") && number > MAX_DAYS_AGO)) {
//           return false;
//         }
//       }
//       return true;
//     });

//     console.log("📄 Offres récentes à Cotonou & Abomey-Calavi:", recentJobs);
//     await browser.close();
//     return recentJobs;
//   } catch (error) {
//     console.error("❌ Erreur pendant le scraping :", error.message);
//     await browser.close();
//     return [];
//   }
// };


scrapeLinkedInJobs();




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
