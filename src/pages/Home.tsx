import React from 'react';
// Icons for other sections are kept, HeroSection will manage its own icons
import { Calendar, MapPin, Clock, ArrowRight, AlertTriangle, Users, Award, TrendingUp, Star, Sparkles, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useHomeData } from '@/hooks/useHomeData.tsx';
import { useTranslation } from 'react-i18next';
import { StatData, I18nHomePageUpcomingEvent, I18nHomePageRecentNews } from '@/types';
import PageLoader from '@/components/PageLoader';
import { formatDateForLocale } from '@/lib/dateUtils';
import HeroSection from '@/components/home/HeroSection'; // Import the new HeroSection

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { upcomingEvents, recentNews, stats, isLoading, isError, error } = useHomeData();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-700 mb-2">{t('error.genericTitle')}</h2>
        <p className="text-red-600">{t('error.fetchDataError')}</p>
        {error && <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>}
      </div>
    );
  }

  if (!upcomingEvents || !recentNews || !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">{t('error.noDataTitle')}</h2>
        <p className="text-yellow-600">{t('error.noDataAvailable')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <HeroSection t={t} />

      {/* Stats Section */}
      {stats && stats.length > 0 && <StatisticsSection stats={stats} t={t} />}

      {/* Upcoming Events */}
      {upcomingEvents && upcomingEvents.length > 0 && <UpcomingEventsSection upcomingEvents={upcomingEvents} t={t} i18n={i18n} />}

      {/* Recent News & Bottom CTA */}
      {recentNews && recentNews.length > 0 && <RecentNewsSection recentNews={recentNews} t={t} i18n={i18n} />}
    </div>
  );
};

export default Home;
