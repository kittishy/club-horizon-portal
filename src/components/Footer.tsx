import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

const Footer: React.FC = React.memo(() => {
  const { i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Clube Harmonia</h3>
            <p className="text-sm">
              Conectando pessoas através de experiências únicas há mais de 50 anos.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                <span>Rua Alegria, 123, Cidade Feliz - ES</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span>(27) 3333-4444</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span>contato@clubeharmonia.com.br</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook do Clube Harmonia">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram do Clube Harmonia">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter do Clube Harmonia">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Idioma</h3>
            <div className="flex space-x-2">
              <Button 
                variant={i18n.language === 'pt' || i18n.language.startsWith('pt-') ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => changeLanguage('pt')} 
                className="text-xs"
              >
                Português
              </Button>
              <Button 
                variant={i18n.language === 'en' || i18n.language.startsWith('en-') ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => changeLanguage('en')} 
                className="text-xs"
              >
                English
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Clube Harmonia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
});
Footer.displayName = 'Footer';

export default Footer;
