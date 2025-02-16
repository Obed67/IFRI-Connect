// src/components/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 IFRI Connect. Tous droits réservés.</p>
        <p className="mt-2">
          <a href="#" className="hover:text-blue-200">Mentions légales</a> | 
          <a href="#" className="hover:text-blue-200 ml-2">Politique de confidentialité</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;