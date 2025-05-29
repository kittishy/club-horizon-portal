import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Users, Calendar, Award, TrendingUp, Star, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StatData } from '@/types'; // Assuming StatData is correctly defined in types
import { TFunction } from 'i18next'; // For t function type

interface StatisticsSectionProps {
  stats: StatData[];
  t: TFunction;
}

interface AnimatedNumberProps {
  valueString: string; // Expects strings like "500+", "50+", "50"
  className?: string;
  delay?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ valueString, className, delay = 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  // For simplicity, we'll animate opacity and scale, not the number itself counting up.
  // A full count-up animation is more involved.

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {valueString}
    </motion.span>
  );
};


const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats, t }) => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const iconComponents = [Users, Calendar, Award];
  // Using appColors directly for gradients as class strings from designTokens
  // or use the bg-gradient-primary/secondary from tailwind.config.ts
  const iconGradients = [
    "bg-gradient-primary", // Defined in tailwind.config.ts
    "bg-gradient-secondary", // Defined in tailwind.config.ts
    "bg-gradient-to-r from-appAccent-pink to-appAccent-pinkDark" // Custom example if needed
  ];
  // Ensure appAccent-yellow is available in designTokens and tailwind.config.ts
  // If not, replace with a suitable color like appAccent-pinkLight or appNeutral-gray
  const starColor = "text-appAccent-pinkLight/60 dark:text-appAccent-pinkDark/40";


  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 bg-appNeutral-grayLightest/50 dark:bg-appNeutral-grayDarkest/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Badge
            variant="outline"
            className="mb-4 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-appAccent-blueLight/50 to-appAccent-purpleLight/50 dark:from-appAccent-blueDark/30 dark:to-appAccent-purpleDark/30 text-appAccent-blueDark dark:text-appAccent-blueLight border-appAccent-blueLight/70 dark:border-appAccent-blueDark/50 shadow-sm"
          >
            <TrendingUp className="w-4 h-4 mr-2.5" />
            {t('home.statsBadge')} 
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-appPrimary dark:text-appAccent-blueLight mb-4">
            {t('home.statsTitle')}
          </h2>
          <p className="text-lg text-appNeutral-grayDark dark:text-appNeutral-grayLight max-w-2xl mx-auto">
            {t('home.statsSubtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat: StatData, index: number) => {
            const IconComponent = iconComponents[index % iconComponents.length];
            const gradientClass = iconGradients[index % iconGradients.length];
            
            return (
              <motion.div 
                key={stat.id || index} 
                className="relative bg-appNeutral-grayLightest dark:bg-appNeutral-grayDarkest rounded-2xl shadow-xl overflow-hidden border border-appNeutral-grayLight/80 dark:border-appNeutral-grayDark/80 p-6 md:p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: sectionInView ? index * 0.15 : 0 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.04, 
                  boxShadow: "0px 15px 30px rgba(31,41,55,0.15)" // Using appNeutral-grayDarkest for shadow base
                }}
                // For 3D effect (optional):
                // whileHover={{ y: -12, scale: 1.04, boxShadow: "0px 15px 30px rgba(31,41,55,0.15)", rotateX: 3, rotateY: 2 }}
                // transition={{ type: "spring", stiffness: 280, damping: 15 }}
              >
                {/* Decorative Stars */}
                <Sparkles className={`absolute top-5 right-5 w-5 h-5 ${starColor} opacity-50`} />
                <Star className={`absolute bottom-4 left-6 w-4 h-4 ${starColor} opacity-40`} />
                 <motion.div 
                    animate={{ scale: [1, 1.1, 1, 1.15, 1], opacity: [0.5, 0.8, 0.5, 0.9, 0.5] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                     <IconComponent className={`w-32 h-32 ${gradientClass === "bg-gradient-primary" ? "text-appAccent-blue/10" : gradientClass === "bg-gradient-secondary" ? "text-appAccent-purple/10" : "text-appAccent-pink/10"} opacity-40 dark:opacity-20`} />
                 </motion.div>


                <div className="relative z-10"> {/* Content should be above decorative elements */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 ${gradientClass} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-appNeutral-grayLightest" />
                  </div>
                  
                  <AnimatedNumber 
                    valueString={stat.value} 
                    className="block text-4xl md:text-5xl font-bold text-appPrimary dark:text-appAccent-blueLight mb-2"
                    delay={sectionInView ? (index * 0.15) + 0.4 : 0} // Stagger number animation slightly after card
                  />
                  
                  <p className="text-appNeutral-grayDark dark:text-appNeutral-grayLight font-medium text-lg">
                    {t(stat.label)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
