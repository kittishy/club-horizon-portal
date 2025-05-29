import React from 'react';
import { 
  Facebook, Instagram, Twitter, Clock, Phone, ExternalLink, Users, Calendar, 
  Newspaper, Star, Award, MapPin, Mail, Zap, Link as LinkIcon, ThumbsUp, Info, Send, CalendarDays, Grid // Added new icons
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { SidebarPartnerLink, SidebarSocialLink, SidebarUsefulInfo } from '@/types'; // Assuming these types are still relevant
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Card can be used as a base if needed, or motion.div
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { designTokens } from '@/lib/designTokens'; // For gradient class strings

// Define a consistent card style
const cardBaseClasses = "bg-appNeutral-grayLightest/60 dark:bg-appNeutral-grayDarkest/70 backdrop-blur-lg rounded-xl shadow-lg border border-appNeutral-grayLight/50 dark:border-appNeutral-grayDark/50";

const Sidebar: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const partnerSites: SidebarPartnerLink[] = [
    { name: t('sidebar.partnerExample1', 'Clube dos Livros'), url: '#' },
    { name: t('sidebar.partnerExample2', 'Associação Cultural'), url: '#' },
    { name: t('sidebar.partnerExample3', 'Centro Esportivo'), url: '#' },
  ];

  const socialLinks: SidebarSocialLink[] = [
    { name: 'Facebook', url: '#', icon: <Facebook size={20} /> },
    { name: 'Instagram', url: '#', icon: <Instagram size={20} /> },
    { name: 'Twitter', url: '#', icon: <Twitter size={20} /> },
  ];

  const usefulInfo: SidebarUsefulInfo[] = [
    { 
      title: t('sidebar.infoHoursTitle', 'Horário de Funcionamento'), 
      content: t('sidebar.infoHoursContent', 'Seg-Sex: 8h-18h\nSáb: 8h-12h'), 
      icon: <Clock size={18} /> 
    },
    { 
      title: t('sidebar.infoPhoneTitle', 'Telefone da Secretaria'), 
      content: t('sidebar.infoPhoneContent', '(27) 3333-4444'), 
      icon: <Phone size={18} /> 
    },
    { 
      title: t('sidebar.infoAddressTitle', 'Endereço'), 
      content: t('sidebar.infoAddressContent', 'Rua Alegria, 123\nCidade Feliz - ES'), 
      icon: <MapPin size={18} /> 
    },
  ];

  const quickStats = [
    { label: t('sidebar.statsMembers', 'Membros Ativos'), value: '2.5K+', icon: <Users size={16} /> },
    { label: t('sidebar.statsEvents', 'Eventos/Mês'), value: '15+', icon: <CalendarDays size={16} /> }, // Changed to CalendarDays
    { label: t('sidebar.statsHistory', 'Anos de História'), value: '50+', icon: <Award size={16} /> },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 260, damping: 20 }
    })
  };

  return (
    <motion.aside 
      className="w-72 lg:w-80 h-screen sticky top-16 overflow-y-auto p-5 lg:p-6 space-y-6 lg:space-y-8 bg-appNeutral-grayLightest/60 dark:bg-appNeutral-grayDarkest/40 backdrop-blur-md border-r border-appNeutral-grayLight/80 dark:border-appNeutral-grayDark/60 scrollbar-thin scrollbar-thumb-appNeutral-grayLight dark:scrollbar-thumb-appNeutral-grayDark scrollbar-track-transparent"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Club Stats */}
      <motion.div variants={cardVariants} initial="initial" animate="animate" custom={0}>
        <Card className={`${cardBaseClasses} bg-gradient-to-br from-appAccent-blueLight/20 via-appNeutral-grayLightest/80 to-appAccent-purpleLight/20 dark:from-appAccent-blueDark/20 dark:via-appNeutral-grayDarkest/80 dark:to-appAccent-purpleDark/20`}>
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="text-lg font-semibold text-appPrimary dark:text-appAccent-blueLight flex items-center">
              <Star className="w-5 h-5 mr-2.5 text-appAccent-yellow" />
              {t('sidebar.clubStatsTitle', 'Clube em Números')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-sm">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between py-1.5">
                <div className="flex items-center space-x-2.5">
                  <span className="text-appAccent-blue dark:text-appAccent-blueLight">{React.cloneElement(stat.icon, {size: 18})}</span>
                  <span className="text-appNeutral-grayDarker dark:text-appNeutral-grayLighter">{stat.label}</span>
                </div>
                <Badge variant="secondary" className="bg-appAccent-blueLight/70 dark:bg-appAccent-blueDark/50 text-appAccent-blueDark dark:text-appAccent-blueLight font-medium px-2.5 py-0.5">
                  {stat.value}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={cardVariants} initial="initial" animate="animate" custom={1}>
        <Card className={cardBaseClasses}>
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="text-lg font-semibold text-appPrimary dark:text-appAccent-blueLight flex items-center">
              <Grid className="w-5 h-5 mr-2.5 text-appAccent-purple dark:text-appAccent-purpleLight" /> {/* Changed to Grid */}
              {t('sidebar.quickActionsTitle', 'Acesso Rápido')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { to: "/eventos", labelKey: "sidebar.actionEvents", icon: <CalendarDays size={18} /> },
              { to: "/noticias", labelKey: "sidebar.actionNews", icon: <Newspaper size={18} /> },
              { to: "/contato", labelKey: "sidebar.actionContact", icon: <Mail size={18} /> },
            ].map((action, idx) => (
              <Button key={idx} asChild variant="ghost" className="w-full justify-start text-appNeutral-grayDarker dark:text-appNeutral-grayLight hover:bg-appAccent-purpleLight/40 dark:hover:bg-appAccent-purpleDark/40 hover:text-appAccent-purpleDark dark:hover:text-appAccent-purpleLight px-3 py-2 text-sm">
                <Link to={action.to}>
                  <span className="mr-3 opacity-80">{action.icon}</span>
                  {t(action.labelKey)}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Partner Links */}
      <motion.div variants={cardVariants} initial="initial" animate="animate" custom={2}>
        <Card className={cardBaseClasses}>
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="text-lg font-semibold text-appPrimary dark:text-appAccent-blueLight flex items-center">
              <LinkIcon className="w-5 h-5 mr-2.5 text-appAccent-green" />
              {t('sidebar.partnerSites')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {partnerSites.map((site, index) => (
                <li key={index}>
                  <motion.a 
                    href={site.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg text-sm text-appNeutral-grayDarker dark:text-appNeutral-grayLight group hover:bg-appAccent-greenLight/40 dark:hover:bg-appAccent-green/20"
                    whileHover={{ x: 2, color: designTokens.colors.accent.greenDark }}
                  >
                    <span>{site.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 text-appAccent-greenDark dark:text-appAccent-green" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Media */}
      <motion.div variants={cardVariants} initial="initial" animate="animate" custom={3}>
        <Card className={cardBaseClasses}>
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="text-lg font-semibold text-appPrimary dark:text-appAccent-blueLight flex items-center">
              <ThumbsUp className="w-5 h-5 mr-2.5 text-appAccent-pink" />
              {t('sidebar.socialMedia')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around items-center pt-1">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-appNeutral-grayLighter/70 dark:bg-appNeutral-grayDark/70 text-appNeutral-grayDarker dark:text-appNeutral-grayLight rounded-full"
                  whileHover={{ scale: 1.15, y: -2, color: designTokens.colors.accent.pink }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Useful Info */}
      <motion.div variants={cardVariants} initial="initial" animate="animate" custom={4}>
        <Card className={cardBaseClasses}>
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="text-lg font-semibold text-appPrimary dark:text-appAccent-blueLight flex items-center">
              <Info className="w-5 h-5 mr-2.5 text-appAccent-blue" /> {/* Changed from orange to blue for variety */}
              {t('sidebar.usefulInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {usefulInfo.map((info, index) => (
              <div key={index} className="border-l-4 border-appAccent-blueLight dark:border-appAccent-blueDark pl-3 py-1.5 text-sm">
                <div className="flex items-center space-x-2 mb-0.5">
                  <span className="text-appAccent-blue dark:text-appAccent-blueLight">{React.cloneElement(info.icon, {size: 16})}</span>
                  <h4 className="font-medium text-appPrimary dark:text-appAccent-blueLight">{info.title}</h4>
                </div>
                <p className="text-xs text-appNeutral-grayDark dark:text-appNeutral-grayLight whitespace-pre-line leading-snug">{info.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div variants={cardVariants} initial="initial" animate="animate" custom={5}>
        <Card className={`${designTokens.colors.gradients.primary} text-appNeutral-grayLightest dark:text-appNeutral-grayLightest p-6 rounded-xl shadow-lg`}>
          <CardContent className="pt-0 text-center space-y-3"> {/* pt-0 because Card already has padding */}
            <div className="w-12 h-12 bg-appNeutral-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Send className="w-6 h-6 text-appNeutral-white" /> {/* Changed Mail to Send */}
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">{t('sidebar.newsletterTitle', 'Fique por Dentro!')}</h4>
              <p className="text-sm opacity-90 mb-4">{t('sidebar.newsletterSubtitle', 'Receba novidades e eventos.')}</p>
            </div>
            <Button size="sm" className="w-full bg-appNeutral-white text-appPrimary hover:bg-appNeutral-white/90 dark:text-appAccent-blueDark dark:hover:bg-appNeutral-grayLighter/90 font-semibold">
              {t('sidebar.newsletterButton', 'Inscrever-se')}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.aside>
  );
});
Sidebar.displayName = 'Sidebar';

export default Sidebar;
