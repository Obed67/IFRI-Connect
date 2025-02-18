import NavbarConnected from "../NavbarConnected";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import supabase from '../../supabase'; // Import Supabase
import React from 'react';

const MainLayout = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true); // Début du chargement
            console.log("🔄 Vérification de l'utilisateur...");
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                console.log("✅ Utilisateur trouvé :", user);
                setUser(user);
                setIsAuthenticated(true);
            } else {
                console.log("❌ Aucun utilisateur trouvé");
                setUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false); // Fin du chargement
        };

        checkAuth(); // Vérifie au chargement
        window.addEventListener("storage", checkAuth); // Écoute les changements

        return () => {
            console.log("🛑 Suppression de l'écouteur 'storage'");
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    const handleLogout = async () => {
        console.log("🚪 Déconnexion...");
        await supabase.auth.signOut(); // Déconnexion avec Supabase
        setUser(null);
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("storage")); // Met à jour tous les onglets
    };

    // Afficher un message de chargement pendant la vérification de l'authentification
    if (loading) {
        return <div>Chargement de l'application...</div>;
    }

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
