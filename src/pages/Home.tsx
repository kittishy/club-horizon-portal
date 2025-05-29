import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useHomeData } from '@/hooks/useHomeData';
import { useTranslation } from 'react-i18next';
import { StatData, I18nHomePageUpcomingEvent, I18nHomePageRecentNews } from '@/types';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { upcomingEvents, recentNews, stats } = useHomeData();

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('home.welcome')}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto px-4">
          {t('home.heroSubtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
            <Link to="/eventos">{t('home.upcomingEventsLink')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-700 hover:bg-gray-100 border-blue-700 font-semibold">
            <Link to="/contato">{t('home.joinUsLink')}</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: StatData, index: number) => (
          <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{t(stat.label)}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t('home.upcomingEventsTitle')}</h2>
          <Button asChild variant="link" className="text-blue-600 hover:text-blue-700">
            <Link to="/eventos">{t('home.viewAllLink')} <ArrowRight size={18} className="ml-1" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(upcomingEvents as I18nHomePageUpcomingEvent[]).map((event) => (
            <Card key={event.id} className="hover:shadow-xl transition-shadow duration-300 border-0 bg-white overflow-hidden flex flex-col">
              <CardHeader className="bg-gray-50 p-4">
                <CardTitle className="text-blue-700 text-lg">{t(event.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-blue-500" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-blue-500" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-blue-500" />
                    {t(event.locationKey)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 flex-grow">{t(event.descriptionKey)}</p>
                <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto">
                  <Link to={`/eventos#event-${event.id}`}>{t('home.moreDetailsButton')}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent News */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t('home.recentNewsTitle')}</h2>
          <Button asChild variant="link" className="text-blue-600 hover:text-blue-700">
            <Link to="/noticias">{t('home.viewAllLink')} <ArrowRight size={18} className="ml-1" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(recentNews as I18nHomePageRecentNews[]).map((news) => (
            <Card key={news.id} className="hover:shadow-xl transition-shadow duration-300 border-0 bg-white overflow-hidden flex flex-col">
              <CardHeader className="bg-gray-50 p-4">
                <CardTitle className="text-blue-700 text-lg">{t(news.titleKey)}</CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  {t('home.publishedOn', { date: formatDate(news.date) })}
                </p>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <p className="text-gray-700 text-sm mb-4 flex-grow">{t(news.excerptKey)}</p>
                <Button asChild variant="outline" size="sm" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 mt-auto">
                  <Link to={`/noticias#news-${news.id}`}>{t('home.readMoreButton')}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
