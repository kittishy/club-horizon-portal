import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Newspaper, Sparkles, ArrowRight, Users, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { I18nHomePageRecentNews } from '@/types';
import { TFunction } from 'i18next';
import { i18n as I18nInstanceType } from 'i18next';
import { formatDateForLocale } from '@/lib/dateUtils';
// import { designTokens } from '@/lib/designTokens'; // For direct gradient class access if needed

interface RecentNewsSectionProps {
  recentNews: I18nHomePageRecentNews[];
  t: TFunction;
  i18n: typeof I18nInstanceType;
}

const RecentNewsSection: React.FC<RecentNewsSectionProps> = ({ recentNews, t, i18n }) => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cardAccentColor = "appAccent-pink"; // Using pink as the consistent accent
  const cardAccentColorDark = "appAccent-pinkDark";

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-appNeutral-grayLightest/30 dark:bg-appNeutral-grayDarkest/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Badge
            variant="outline"
            className="mb-4 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-appAccent-pinkLight/50 to-appAccent-purpleLight/30 dark:from-appAccent-pinkDark/30 dark:to-appAccent-purpleDark/20 text-appAccent-pinkDark dark:text-appAccent-pinkLight border-appAccent-pinkLight/70 dark:border-appAccent-pinkDark/50 shadow-sm"
          >
            <Newspaper className="w-4 h-4 mr-2.5" />
            {t('home.recentNewsBadge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-appPrimary dark:text-appAccent-blueLight mb-4">
            {t('home.recentNewsTitle')}
          </h2>
          <p className="text-lg text-appNeutral-grayDark dark:text-appNeutral-grayLight max-w-2xl mx-auto mb-8">
            {t('home.recentNewsSubtitle')}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Button asChild variant="outline" className={`text-${cardAccentColor} dark:text-${cardAccentColorDark} border-${cardAccentColor}/50 dark:border-${cardAccentColorDark}/40 hover:bg-${cardAccentColor}/10 dark:hover:bg-${cardAccentColorDark}/20 hover:border-${cardAccentColor} dark:hover:border-${cardAccentColorDark} font-medium px-7 py-3 rounded-lg shadow-sm transition-colors duration-200`}>
              <Link to="/noticias" className="flex items-center">
                {t('home.viewAllLink')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentNews.map((newsItem, index) => {
            const cardMotionProps = {
              initial: { opacity: 0, y: 50, scale: 0.95 },
              animate: sectionInView ? { opacity: 1, y: 0, scale: 1 } : {},
              transition: { duration: 0.5, ease: "easeOut", delay: sectionInView ? index * 0.15 + 0.3 : 0 },
              whileHover: { y: -10, scale: 1.03, boxShadow: "0px 12px 25px rgba(31,41,55,0.1)" }
            };
            return (
              <motion.div
                key={newsItem.id}
                {...cardMotionProps}
                className="group bg-appNeutral-grayLightest dark:bg-appNeutral-grayDarkest rounded-2xl shadow-xl overflow-hidden border border-appNeutral-grayLight/50 dark:border-appNeutral-grayDark/50 flex flex-col"
              >
                <div className={`h-2.5 bg-${cardAccentColor} dark:bg-${cardAccentColorDark}`}></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <Badge variant="secondary" className="bg-appNeutral-grayLighter dark:bg-appNeutral-grayDark text-xs font-medium text-appNeutral-grayDarker dark:text-appNeutral-grayLight px-2.5 py-1 rounded-md">
                      {formatDateForLocale(newsItem.date, i18n, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Badge>
                    {/* Category Badge would go here if newsItem.categoryKey existed */}
                  </div>
                  <h3 className={`text-xl font-bold text-appPrimary dark:text-appAccent-blueLight mb-2 group-hover:text-${cardAccentColor} dark:group-hover:text-${cardAccentColorDark} transition-colors duration-300`}>
                    {t(newsItem.titleKey)}
                  </h3>
                  <p className="text-appNeutral-grayDark dark:text-appNeutral-grayRegular leading-relaxed line-clamp-4 mb-4 flex-grow"> {/* Increased line-clamp */}
                    {t(newsItem.excerptKey)}
                  </p>
                  <motion.div whileHover={{ scale: 1.05, filter: "brightness(1.1)" }} className="mt-auto">
                    <Button asChild size="lg" className={`w-full text-appNeutral-grayLightest font-semibold py-2.5 rounded-lg shadow-md bg-${cardAccentColor} dark:bg-${cardAccentColorDark} hover:bg-${cardAccentColor}/90 dark:hover:bg-${cardAccentColorDark}/90`}>
                      <Link to={`/noticias#news-${newsItem.id}`}>
                        {t('home.readMoreButton')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: sectionInView ? (recentNews.length * 0.15) + 0.4 : 0 }}
        >
          <div className="bg-gradient-to-r from-appAccent-blueLight/30 via-appAccent-purpleLight/30 to-appAccent-pinkLight/30 dark:from-appAccent-blueDark/20 dark:via-appAccent-purpleDark/20 dark:to-appAccent-pinkDark/20 rounded-3xl p-10 md:p-16 border border-appNeutral-grayLight/50 dark:border-appNeutral-grayDark/50 shadow-lg">
            <div className="max-w-2xl mx-auto">
              <Sparkles className={`w-10 h-10 text-${cardAccentColor} dark:text-${cardAccentColorDark} mx-auto mb-4 opacity-80`} />
              <h3 className="text-2xl md:text-3xl font-bold text-appPrimary dark:text-appAccent-blueLight mb-4">
                {t('home.bottomCtaTitle')}
              </h3>
              <p className="text-lg text-appNeutral-grayDark dark:text-appNeutral-grayLight mb-8">
                {t('home.bottomCtaSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(59,130,246,0.25)"}}>
                  <Button asChild size="lg" className="bg-gradient-primary text-appNeutral-grayLightest font-semibold px-8 py-3 rounded-lg shadow-md w-full sm:w-auto">
                    <Link to="/contato">
                      <Users className="w-5 h-5 mr-2.5" />
                      {t('home.bottomCtaPrimaryButton')}
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(139,92,246,0.2)"}}>
                  <Button asChild variant="outline" size="lg" className="text-appAccent-purple dark:text-appAccent-purpleLight border-appAccent-purple/60 dark:border-appAccent-purpleLight/50 hover:bg-appAccent-purple/10 dark:hover:bg-appAccent-purpleDark/30 hover:border-appAccent-purple dark:hover:border-appAccent-purpleLight font-semibold px-8 py-3 rounded-lg shadow-sm w-full sm:w-auto">
                    <Link to="/eventos">
                      <CalendarDays className="w-5 h-5 mr-2.5" />
                      {t('home.bottomCtaSecondaryButton')}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentNewsSection;
