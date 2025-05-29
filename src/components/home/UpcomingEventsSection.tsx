import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, CalendarDays } from 'lucide-react'; // Using CalendarDays for consistency if needed
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { I18nHomePageUpcomingEvent } from '@/types';
import { TFunction } from 'i18next';
import { i18n as I18nInstanceType } from 'i18next'; // Import the type for i18n instance
import { formatDateForLocale } from '@/lib/dateUtils';
import { designTokens } from '@/lib/designTokens'; // For referencing gradient classes if needed

interface UpcomingEventsSectionProps {
  upcomingEvents: I18nHomePageUpcomingEvent[];
  t: TFunction;
  i18n: typeof I18nInstanceType; // Use the imported type
}

const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({ upcomingEvents, t, i18n }) => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Define distinct gradients for event cards
  // These use Tailwind JIT mode so direct class strings are fine.
  const eventGradients = [
    designTokens.colors.gradients.primary, // bg-gradient-to-r from-blue-500 to-purple-600
    designTokens.colors.gradients.secondary, // bg-gradient-to-r from-purple-600 to-pink-500
    "bg-gradient-to-r from-appAccent-pink to-appAccent-blue", // Example custom
  ];
  // Use appAccent.blue, appAccent.purple, appAccent.pink for icon colors in details
  const detailIconColors = [
    "text-appAccent-blue",
    "text-appAccent-purple",
    "text-appAccent-pink",
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Badge
            variant="outline"
            className="mb-4 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-appAccent-purpleLight/50 to-appAccent-pinkLight/50 dark:from-appAccent-purpleDark/30 dark:to-appAccent-pinkDark/30 text-appAccent-purpleDark dark:text-appAccent-purpleLight border-appAccent-purpleLight/70 dark:border-appAccent-purpleDark/50 shadow-sm"
          >
            <CalendarDays className="w-4 h-4 mr-2.5" /> {/* Changed from Calendar to CalendarDays for consistency */}
            {t('home.upcomingEventsBadge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-appPrimary dark:text-appAccent-blueLight mb-4">
            {t('home.upcomingEventsTitle')}
          </h2>
          <p className="text-lg text-appNeutral-grayDark dark:text-appNeutral-grayLight max-w-2xl mx-auto mb-8">
            {t('home.upcomingEventsSubtitle')}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Button asChild variant="outline" className="text-appAccent-purple dark:text-appAccent-purpleLight border-appAccent-purple/50 dark:border-appAccent-purpleLight/40 hover:bg-appAccent-purpleLight/20 dark:hover:bg-appAccent-purpleDark/20 hover:border-appAccent-purple dark:hover:border-appAccent-purpleLight font-medium px-7 py-3 rounded-lg shadow-sm transition-colors duration-200">
              <Link to="/eventos" className="flex items-center">
                {t('home.viewAllLink')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => {
            const gradientClass = eventGradients[index % eventGradients.length];
            const cardMotionProps = {
              initial: { opacity: 0, y: 50, scale: 0.95 },
              animate: sectionInView ? { opacity: 1, y: 0, scale: 1 } : {},
              transition: { duration: 0.5, ease: "easeOut", delay: sectionInView ? index * 0.15 + 0.3 : 0 },
              whileHover: { y: -10, scale: 1.03, boxShadow: "0px 12px 25px rgba(31,41,55,0.1)" } // appNeutral-grayDarkest approx.
            };

            return (
              <motion.div
                key={event.id}
                {...cardMotionProps}
                className="group bg-appNeutral-grayLightest dark:bg-appNeutral-grayDarkest rounded-2xl shadow-xl overflow-hidden border border-appNeutral-grayLight/50 dark:border-appNeutral-grayDark/50 flex flex-col"
              >
                <div className={`h-2.5 ${gradientClass}`}></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-appPrimary dark:text-appAccent-blueLight group-hover:text-appAccent-purple dark:group-hover:text-appAccent-purpleLight transition-colors duration-300">
                      {t(event.titleKey)}
                    </h3>
                    <Sparkles className="w-5 h-5 text-appAccent-pink/40 dark:text-appAccent-pinkLight/30 opacity-75 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="space-y-3 mb-4 text-sm">
                    <div className="flex items-center bg-appNeutral-grayLighter dark:bg-appNeutral-grayDark/70 rounded-md p-2.5">
                      <CalendarDays className={`h-5 w-5 mr-2.5 ${detailIconColors[0]}`} />
                      <span className="font-medium text-appNeutral-grayDarker dark:text-appNeutral-grayLight">
                        {formatDateForLocale(event.date, i18n, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center bg-appNeutral-grayLighter dark:bg-appNeutral-grayDark/70 rounded-md p-2.5">
                      <Clock className={`h-5 w-5 mr-2.5 ${detailIconColors[1]}`} />
                      <span className="font-medium text-appNeutral-grayDarker dark:text-appNeutral-grayLight">{event.time}</span>
                    </div>
                    <div className="flex items-center bg-appNeutral-grayLighter dark:bg-appNeutral-grayDark/70 rounded-md p-2.5">
                      <MapPin className={`h-5 w-5 mr-2.5 ${detailIconColors[2]}`} />
                      <span className="font-medium text-appNeutral-grayDarker dark:text-appNeutral-grayLight">{t(event.locationKey)}</span>
                    </div>
                  </div>

                  <p className="text-appNeutral-grayDark dark:text-appNeutral-grayRegular leading-relaxed line-clamp-3 mb-5 flex-grow">
                    {t(event.descriptionKey)}
                  </p>

                  <motion.div whileHover={{ scale: 1.05, filter: "brightness(1.1)" }} className="mt-auto">
                    <Button asChild size="lg" className={`w-full text-appNeutral-grayLightest font-semibold py-3 rounded-lg shadow-md ${gradientClass}`}>
                      <Link to={`/eventos#event-${event.id}`}> {/* Consider /eventos/${event.slug} if available */}
                        {t('home.moreDetailsButton')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
