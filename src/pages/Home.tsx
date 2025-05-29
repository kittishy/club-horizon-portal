import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight, AlertTriangle, Users, Award, TrendingUp, Star, Sparkles, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useHomeData } from '@/hooks/useHomeData.tsx';
import { useTranslation } from 'react-i18next';
import { StatData, I18nHomePageUpcomingEvent, I18nHomePageRecentNews } from '@/types';
import PageLoader from '@/components/PageLoader';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { upcomingEvents, recentNews, stats, isLoading, isError, error } = useHomeData();

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-blue-400/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4 py-24 text-center">
          {/* Welcome Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-2 mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Bem-vindos ao Clube Harmonia</span>
            <Heart className="w-4 h-4 text-pink-500 fill-current" />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            {t('home.welcome')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto px-4 text-gray-700 leading-relaxed">
            {t('home.heroSubtitle')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link to="/eventos">
                <Calendar className="w-5 h-5 mr-2" />
                {t('home.upcomingEventsLink')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm text-blue-700 hover:bg-white border-2 border-blue-200 hover:border-blue-300 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/contato">
                <Users className="w-5 h-5 mr-2" />
                {t('home.joinUsLink')}
              </Link>
            </Button>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="grid grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Comunidade Ativa</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Eventos Regulares</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Experiências Únicas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: StatData, index: number) => (
          <Card key={stat.id || index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
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
          {upcomingEvents.map((event: I18nHomePageUpcomingEvent) => (
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
          {recentNews.map((news: I18nHomePageRecentNews) => (
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
