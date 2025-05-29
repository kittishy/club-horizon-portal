<<<<<<< HEAD
import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Users, Calendar, Newspaper, ArrowRight, Heart } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Footer: React.FC = React.memo(() => {
  const { i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const quickLinks = [
    { name: 'Eventos', path: '/eventos', icon: <Calendar size={16} /> },
    { name: 'Calendário', path: '/calendario', icon: <Calendar size={16} /> },
    { name: 'Notícias', path: '/noticias', icon: <Newspaper size={16} /> },
    { name: 'Contatos', path: '/contato', icon: <Phone size={16} /> },
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/clubeharmonia', icon: <Facebook size={20} />, color: 'hover:text-blue-500' },
    { name: 'Instagram', url: 'https://instagram.com/clubeharmonia', icon: <Instagram size={20} />, color: 'hover:text-pink-500' },
    { name: 'Twitter', url: 'https://twitter.com/clubeharmonia', icon: <Twitter size={20} />, color: 'hover:text-blue-400' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">
                  Clube Harmonia
                </span>
                <span className="text-sm text-gray-400 font-medium">
                  Conectando pessoas
                </span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Conectando pessoas através de experiências únicas há mais de 50 anos. 
              Somos uma comunidade dedicada ao crescimento pessoal, networking e 
              desenvolvimento de relacionamentos significativos.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>para nossa comunidade</span>
=======

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">CH</span>
              </div>
              <span className="text-xl font-bold">Clube Harmonia</span>
            </div>
            <p className="text-gray-300 mb-4">
              Conectando pessoas através de experiências únicas há mais de 50 anos.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Twitter className="h-5 w-5" />
              </Button>
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0
            </div>
          </div>

          {/* Quick Links */}
          <div>
<<<<<<< HEAD
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Links Rápidos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 group"
                  >
                    <span className="text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                </li>
              ))}
=======
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/eventos" className="text-gray-300 hover:text-white transition-colors">Eventos</a></li>
              <li><a href="/calendario" className="text-gray-300 hover:text-white transition-colors">Calendário</a></li>
              <li><a href="/noticias" className="text-gray-300 hover:text-white transition-colors">Notícias</a></li>
              <li><a href="/contatos" className="text-gray-300 hover:text-white transition-colors">Contatos</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Eventos Corporativos</li>
              <li>Festas de Casamento</li>
              <li>Formatura</li>
              <li>Workshops</li>
              <li>Palestras</li>
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0
            </ul>
          </div>

          {/* Contact Info */}
          <div>
<<<<<<< HEAD
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Contato
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Rua Alegria, 123</p>
                  <p className="text-gray-400">Cidade Feliz - ES, 29000-000</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+552733334444" className="text-gray-300 hover:text-white transition-colors duration-300">
                  (27) 3333-4444
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:contato@clubeharmonia.com.br" className="text-gray-300 hover:text-white transition-colors duration-300">
                  contato@clubeharmonia.com.br
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-sm font-medium text-white mb-4">Siga-nos</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-gray-800 rounded-lg text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-700 hover:scale-110 hover:shadow-lg`}
                    aria-label={`${social.name} do Clube Harmonia`}
                  >
                    {social.icon}
                  </a>
                ))}
=======
            <h3 className="text-lg font-semibold mb-4">Contatos</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  Rua das Palmeiras, 245<br />
                  Centro - São Paulo, SP
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-300 text-sm">(11) 3456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-300 text-sm">contato@clubeharmonia.com.br</span>
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>&copy; {currentYear} Clube Harmonia. Todos os direitos reservados.</p>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Idioma:</span>
              <div className="flex space-x-2">
                <Button 
                  variant={i18n.language === 'pt' || i18n.language.startsWith('pt-') ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => changeLanguage('pt')} 
                  className="text-xs h-8 px-3 bg-gray-800 hover:bg-gray-700 border-gray-600"
                >
                  🇧🇷 PT
                </Button>
                <Button 
                  variant={i18n.language === 'en' || i18n.language.startsWith('en-') ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => changeLanguage('en')} 
                  className="text-xs h-8 px-3 bg-gray-800 hover:bg-gray-700 border-gray-600"
                >
                  🇺🇸 EN
                </Button>
              </div>
=======

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Clube Harmonia. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
<<<<<<< HEAD
});
Footer.displayName = 'Footer';
=======
};
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0

export default Footer;
