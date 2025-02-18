import NavbarConnected from "../NavbarConnected";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useEffect, useState } from "react";

const MainLayout = ({ children }) => {
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [user, setUser] = useState(null);

     useEffect(() => {
          const checkAuth = () => {
               console.log("🔄 Vérification de l'utilisateur...");
               const storedUser = localStorage.getItem("user");

               if (storedUser) {
                    console.log("✅ Utilisateur trouvé :", storedUser);
                    setUser(JSON.parse(storedUser)); // Convertir en objet
                    setIsAuthenticated(true);
               } else {
                    console.log("❌ Aucun utilisateur trouvé");
                    setUser(null);
                    setIsAuthenticated(false);
               }
          };

          checkAuth(); // Vérifie au chargement
          window.addEventListener("storage", checkAuth); // Écoute les changements

          return () => {
               console.log("🛑 Suppression de l'écouteur 'storage'");
               window.removeEventListener("storage", checkAuth);
          };
     }, []);

     const handleLogout = () => {
          console.log("🚪 Déconnexion...");
          localStorage.removeItem("user"); 
          setUser(null);
          setIsAuthenticated(false);
          window.dispatchEvent(new Event("storage")); // Met à jour tous les onglets
     };

     return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
               {isAuthenticated ? (
                    <>
                         {console.log("🟢 Affichage de NavbarConnected")}
                         <NavbarConnected user={user} onLogout={handleLogout} />
                    </>
               ) : (
                    <>
                         {console.log("🔵 Affichage de Navbar")}
                         <Navbar />
                    </>
               )}
               <main className="container mx-auto px-4 py-8 flex-grow">
                    {children}
               </main>
               <Footer />
          </div>
     );
};

export default MainLayout;
