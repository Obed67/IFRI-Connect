import { chromium } from "playwright";
import supabase from "./supabase.js";

const scrapeLinkedInJobs = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("🔍 Chargement des offres LinkedIn...");

  // Ouvre la page des offres d'emploi sur LinkedIn
  await page.goto("https://www.linkedin.com/jobs/search/?keywords=Developpeur%20React", {
    waitUntil: "networkidle",
  });

  // Attendre que la page charge les offres
  await page.waitForTimeout(50000);

  // Récupérer les offres d'emploi
  const jobs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".job-search-card"))
      .map(job => ({
        title: job.querySelector(".job-search-card__title")?.innerText.trim() || "Titre inconnu",
        company: job.querySelector(".job-search-card__company-name")?.innerText.trim() || "Entreprise inconnue",
        location: job.querySelector(".job-search-card__location")?.innerText.trim() || "Localisation inconnue",
        link: job.querySelector(".job-search-card__link")?.href || "#",
      }))
      .filter(job => job.title && job.company);
  });

  console.log(`✅ ${jobs.length} offres trouvées`);

  await browser.close();
  return jobs;
};

const saveJobsToSupabase = async (jobs) => {
  // 🔑 Vérifier l'authentification de l'utilisateur
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError) {
    console.error("❌ Erreur d'authentification:", authError.message);
    return;
  }
  
  if (!user || !user.id) {
    console.error("❌ Aucun utilisateur authentifié");
    return;
  }

  console.log(`🔑 Utilisateur connecté: ${user.id}`);

  for (const job of jobs) {
    // Vérifier si l'offre existe déjà dans la base de données pour éviter les doublons
    const { data, error: checkError } = await supabase
      .from("jobs")
      .select("id")
      .eq("title", job.title)
      .eq("company", job.company);

    if (checkError) {
      console.error(`❌ Erreur lors de la vérification de ${job.title}:`, checkError.message);
      continue;
    }

    if (data.length === 0) {
      // Insérer uniquement si l'offre n'existe pas
      const { error } = await supabase
        .from("jobs")
        .insert([
          {
            title: job.title,
            company: job.company,
            location: job.location,
            type: "CDI",
            link: job.link,
            user_id: user.id,  // ✅ Ajout du user_id
          }
        ]);

      if (error) {
        console.error(`❌ Erreur en insérant ${job.title}:`, error.message);
      } else {
        console.log(`✅ ${job.title} ajouté à Supabase`);
      }
    } else {
      console.log(`⚠️ ${job.title} existe déjà dans Supabase`);
    }
  }
};

// Exécuter le scraper
(async () => {
  const jobs = await scrapeLinkedInJobs();
  await saveJobsToSupabase(jobs);
})();