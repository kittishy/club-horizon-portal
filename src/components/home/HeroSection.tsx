import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Import useTranslation here
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Calendar, Users, Award, Zap, CalendarDays, ArrowRight, Info } from 'lucide-react'; // Added Zap, CalendarDays, Info
import { designTokens } from '@/lib/designTokens'; // For direct gradient class access if needed

interface HeroSectionProps {
  t: (key: string) => string; // Define the t function prop
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => {
  // For box shadows that need RGB, we'll use Tailwind's built-in shadow color opacity for now
  // e.g., shadow-appAccent-purple/40. If specific RGB values are critical,
  // they'd need to be added to designTokens and tailwind.config.ts

  const floatingElements = [
    { id: 1, styles: "w-32 h-32 bg-appAccent-purple/20 top-1/4 left-1/5", y: [0, -10, 0, 10, 0], x: [0, 10, -10, 0, 10], duration: 22 },
    { id: 2, styles: "w-24 h-24 bg-appAccent-blue/20 bottom-1/4 right-1/5", y: [0, 15, 0, -15, 0], x: [0, -12, 12, 0, -12], duration: 18 },
    { id: 3, styles: "w-20 h-20 bg-appAccent-pink/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", y: [0, 8, 0, -8, 0], x: [0, 8, -8, 0, 8], duration: 25 },
  ];

  const featureCards = [
    { titleKey: "home.featureCard1Title", descriptionKey: "home.featureCard1Desc", icon: <Users size={36} className="bg-gradient-secondary bg-clip-text text-transparent" />, },
    { titleKey: "home.featureCard2Title", descriptionKey: "home.featureCard2Desc", icon: <Zap size={36} className="bg-gradient-secondary bg-clip-text text-transparent" /> },
    { titleKey: "home.featureCard3Title", descriptionKey: "home.featureCard3Desc", icon: <Award size={36} className="bg-gradient-secondary bg-clip-text text-transparent" /> },
  ];


  return (
    <section className="relative overflow-hidden -z-20 bg-gradient-to-br from-appNeutral-grayLightest via-appAccent-blueLight/10 to-appAccent-pinkLight/10 dark:from-appNeutral-grayDarkest dark:via-appAccent-blueDark/10 dark:to-appAccent-pinkDark/10">
      {/* Blurred Shapes (Background) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-appAccent-blueLight/30 dark:bg-appAccent-blueDark/20 rounded-full blur-3xl -z-10 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-appAccent-pinkLight/30 dark:bg-appAccent-pinkDark/20 rounded-full blur-3xl -z-10 opacity-50"></div>
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-appAccent-purpleLight/20 dark:bg-appAccent-purpleDark/10 rounded-full blur-3xl -z-10 opacity-40"></div>

      {/* Floating Elements */}
      {floatingElements.map(el => (
        <motion.div
          key={el.id}
          className={`absolute rounded-full blur-2xl -z-10 ${el.styles}`}
          animate={{ y: el.y, x: el.x }}
          transition={{ duration: el.duration, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
        />
      ))}

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center relative z-10" // Ensure content is above background elements
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="inline-flex items-center space-x-3 bg-appNeutral-grayLightest/20 dark:bg-appNeutral-grayDark/20 backdrop-blur-md border border-appNeutral-grayLightest/30 dark:border-appNeutral-grayDark/30 rounded-full px-6 py-3 mb-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        >
          <Sparkles className="w-5 h-5 text-appAccent-purple" />
          <span className="text-sm font-medium text-appPrimary dark:text-appAccent-blueLight">{t('home.welcomeBadge')}</span>
          <Award className="w-5 h-5 text-appAccent-pink" />
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('home.heroTitle')}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-appNeutral-grayDark dark:text-appNeutral-grayLight mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t('home.heroSubtitle')}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(59,130,246,0.3)" }}> {/* appAccent.blue is #3B82F6 */}
            <Button asChild size="lg" className="bg-gradient-primary text-appNeutral-grayLightest rounded-lg shadow-lg px-8 py-3 text-base font-semibold w-full sm:w-auto">
              <Link to="/eventos">
                <CalendarDays className="w-5 h-5 mr-2.5" />
                {t('home.exploreEventsLink')}
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(100,116,139,0.2)" }}> {/* appNeutral.gray is #9CA3AF */}
            <Button asChild variant="outline" size="lg" className="bg-appNeutral-grayLightest/20 dark:bg-appNeutral-grayDark/20 backdrop-blur-md border-2 border-appNeutral-grayLightest/50 dark:border-appNeutral-grayDark/50 text-appPrimary dark:text-appAccent-blueLight hover:bg-appNeutral-grayLightest/30 dark:hover:bg-appNeutral-grayDark/30 rounded-lg shadow-lg px-8 py-3 text-base font-semibold w-full sm:w-auto">
              <Link to="/contato">
                <Users className="w-5 h-5 mr-2.5" />
                {t('home.joinUsLink')}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-appNeutral-grayLightest/10 dark:bg-appNeutral-grayDarkest/10 backdrop-blur-lg border border-appNeutral-grayLightest/20 dark:border-appNeutral-grayDark/20 rounded-xl p-6 shadow-xl text-center"
              whileHover={{ y: -8, scale: 1.03, boxShadow: "0px 12px 25px rgba(31,41,55,0.1)" }} // appNeutral.grayDarkest is #1F2937
            >
              <div className="inline-block p-3 rounded-lg bg-gradient-to-br from-appAccent-blue/20 to-appAccent-purple/20 mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-appPrimary dark:text-appAccent-blueLight mt-1 mb-2">{t(card.titleKey)}</h3>
              <p className="text-sm text-appNeutral-grayDark dark:text-appNeutral-grayLight leading-relaxed">{t(card.descriptionKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
