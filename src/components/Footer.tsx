import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Users, Calendar, Newspaper, ArrowRight, Heart } from "lucide-react"; // CalendarDays can be an alternative for Calendar
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { designTokens } from '@/lib/designTokens'; // For gradient class strings if needed

const Footer: React.FC = React.memo(() => {
  const { t, i18n } = useTranslation(); // Added t
  const currentYear = new Date().getFullYear();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const quickLinks = [
    { nameKey: 'footer.links.events', path: '/eventos', icon: <Calendar size={16} /> },
    { nameKey: 'footer.links.calendar', path: '/calendario', icon: <Calendar size={16} /> }, // Could use CalendarDays
    { nameKey: 'footer.links.news', path: '/noticias', icon: <Newspaper size={16} /> },
    { nameKey: 'footer.links.contact', path: '/contato', icon: <Phone size={16} /> },
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: <Facebook size={20} />, hoverColor: 'hover:text-appAccent-blue' }, // Example, replace # with actual URLs
    { name: 'Instagram', url: '#', icon: <Instagram size={20} />, hoverColor: 'hover:text-appAccent-pink' },
    { name: 'Twitter', url: '#', icon: <Twitter size={20} />, hoverColor: 'hover:text-appAccent-blueLight' },
  ];

  const footerColumnVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, ease: "easeOut", duration: 0.5 }
    })
  };
  
  const linkItemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    hover: { x: 2, color: designTokens.colors.accent.blueLight } // Example, adjust as needed
  };

  const socialIconVariants = {
    hover: { scale: 1.2, y: -2, transition: { type: "spring", stiffness: 300 } }
  };


  return (
    <footer className="bg-appNeutral-grayDarkest dark:bg-black text-appNeutral-grayLight dark:text-appNeutral-grayLighter">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            variants={footerColumnVariants}
            initial="initial"
            animate="animate"
            custom={0}
          >
            <div className="flex items-center space-x-3 mb-5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${designTokens.colors.gradients.primary}`}>
                <Users className="w-6 h-6 text-appNeutral-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-appNeutral-white">
                  {t('footer.clubName', 'Clube Harmonia')}
                </span>
                <span className="text-sm text-appNeutral-gray dark:text-appNeutral-grayRegular">
                  {t('footer.clubSubtitle', 'Conectando pessoas')}
                </span>
              </div>
            </div>
            <p className="text-appNeutral-gray dark:text-appNeutral-grayRegular leading-relaxed mb-6 max-w-md text-sm">
              {t('footer.clubDescription', 'Conectando pessoas através de experiências únicas há mais de 50 anos. Somos uma comunidade dedicada ao crescimento pessoal, networking e desenvolvimento de relacionamentos significativos.')}
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-appNeutral-grayMedium">
              <span>{t('footer.madeWith', 'Feito com')}</span>
              <Heart className="w-3.5 h-3.5 text-appAccent-pink fill-current" />
              <span>{t('footer.forCommunity', 'para nossa comunidade')}</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={footerColumnVariants}
            initial="initial"
            animate="animate"
            custom={1}
          >
            <h3 className="text-lg font-semibold text-appNeutral-white mb-5 relative">
              {t('footer.quickLinksTitle', 'Links Rápidos')}
              <span className={`absolute -bottom-1.5 left-0 w-10 h-0.5 rounded-full ${designTokens.colors.gradients.primary}`}></span>
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.nameKey}>
                  <motion.custom
                    variants={linkItemVariants}
                    initial="initial"
                    whileHover="hover"
                    animate="animate" // can be triggered by useInView if desired for list items
                    custom={{color: designTokens.colors.accent.blueLight}} // Pass target color via custom if needed for variant
                    className="block"
                  >
                    <Link
                      to={link.path}
                      className="flex items-center space-x-2.5 text-appNeutral-gray dark:text-appNeutral-grayRegular group hover:text-appNeutral-white dark:hover:text-appAccent-blueLight transition-colors duration-200"
                    >
                      <span className="text-appNeutral-grayMedium group-hover:text-appAccent-blue transition-colors duration-200">{React.cloneElement(link.icon, {size:16})}</span>
                      <span>{t(link.nameKey)}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-appAccent-blue" />
                    </Link>
                  </motion.custom>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info & Social Media */}
          <motion.div
            variants={footerColumnVariants}
            initial="initial"
            animate="animate"
            custom={2}
          >
            <h3 className="text-lg font-semibold text-appNeutral-white mb-5 relative">
              {t('footer.contactTitle', 'Contato')}
              <span className={`absolute -bottom-1.5 left-0 w-10 h-0.5 rounded-full ${designTokens.colors.gradients.secondary}`}></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 mt-0.5 text-appAccent-blue dark:text-appAccent-blueLight flex-shrink-0" />
                <div>
                  <p className="text-appNeutral-gray dark:text-appNeutral-grayRegular">{t('footer.addressLine1', 'Rua Alegria, 123')}</p>
                  <p className="text-appNeutral-gray dark:text-appNeutral-grayRegular">{t('footer.addressLine2', 'Cidade Feliz - ES, 29000-000')}</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-appAccent-blue dark:text-appAccent-blueLight flex-shrink-0" />
                <a href={`tel:${t('footer.phoneValue', '+552733334444')}`} className="text-appNeutral-gray dark:text-appNeutral-grayRegular hover:text-appNeutral-white dark:hover:text-appAccent-blueLight transition-colors duration-200">
                  {t('footer.phoneNumber', '(27) 3333-4444')}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 text-appAccent-blue dark:text-appAccent-blueLight flex-shrink-0" />
                <a href={`mailto:${t('footer.emailValue', 'contato@clubeharmonia.com.br')}`} className="text-appNeutral-gray dark:text-appNeutral-grayRegular hover:text-appNeutral-white dark:hover:text-appAccent-blueLight transition-colors duration-200">
                  {t('footer.emailAddress', 'contato@clubeharmonia.com.br')}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-base font-medium text-appNeutral-white mb-3">{t('footer.followUs', 'Siga-nos')}</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialIconVariants}
                    whileHover="hover"
                    className={`p-2.5 bg-appNeutral-grayDark/70 dark:bg-appNeutral-grayDarkest/50 text-appNeutral-grayMedium rounded-lg ${social.hoverColor} dark:${social.hoverColor?.replace('text-', 'text-appAccent-')}Light transition-colors duration-300`}
                    aria-label={`${social.name} ${t('footer.clubName', 'Clube Harmonia')}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-appNeutral-gray/20 dark:border-appNeutral-grayDark/50 bg-appNeutral-black/30 dark:bg-black/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-xs text-appNeutral-grayMedium text-center md:text-left">
              <p>&copy; {currentYear} {t('footer.clubName', 'Clube Harmonia')}. {t('footer.allRightsReserved', 'Todos os direitos reservados.')}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-appNeutral-grayMedium">{t('footer.languageLabel', 'Idioma:')}</span>
              <div className="flex space-x-1.5">
                <Button 
                  variant={(i18n.language === 'pt' || i18n.language.startsWith('pt-')) ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => changeLanguage('pt')} 
                  className={`text-xs h-7 px-2.5 ${(i18n.language === 'pt' || i18n.language.startsWith('pt-')) ? 'bg-appNeutral-grayDark/50 dark:bg-appNeutral-gray/20' : 'hover:bg-appNeutral-grayDark/70 dark:hover:bg-appNeutral-gray/10'}`}
                >
                  🇧🇷 PT
                </Button>
                <Button 
                  variant={(i18n.language === 'en' || i18n.language.startsWith('en-')) ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => changeLanguage('en')} 
                  className={`text-xs h-7 px-2.5 ${(i18n.language === 'en' || i18n.language.startsWith('en-')) ? 'bg-appNeutral-grayDark/50 dark:bg-appNeutral-gray/20' : 'hover:bg-appNeutral-grayDark/70 dark:hover:bg-appNeutral-gray/10'}`}
                >
                  🇺🇸 EN
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
Footer.displayName = 'Footer';

export default Footer;
