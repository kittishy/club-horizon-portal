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
      <section className="relative">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <TrendingUp className="w-4 h-4 mr-2" />
            Nossos Números
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Crescendo Juntos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Cada número representa uma história, uma conexão, uma experiência compartilhada em nossa comunidade.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat: StatData, index: number) => {
            const icons = [Users, Calendar, Award];
            const gradients = [
              'from-blue-500 to-blue-600',
              'from-purple-500 to-purple-600', 
              'from-pink-500 to-pink-600'
            ];
            const IconComponent = icons[index % icons.length];
            const gradient = gradients[index % gradients.length];
            
            return (
              <Card key={stat.id || index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <CardContent className="relative p-8 text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-600 font-medium text-lg">
                    {t(stat.label)}
                  </div>
                  
                  {/* Decorative Element */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Star className="w-6 h-6 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <Calendar className="w-4 h-4 mr-2" />
            Próximos Eventos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('home.upcomingEventsTitle')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Descubra experiências únicas e conecte-se com nossa comunidade em eventos cuidadosamente planejados.</p>
          <Button asChild variant="outline" className="bg-white hover:bg-gray-50 border-2 border-purple-200 hover:border-purple-300 text-purple-700 font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <Link to="/eventos" className="flex items-center">
              {t('home.viewAllLink')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event: I18nHomePageUpcomingEvent, index: number) => {
            const eventGradients = [
              'from-blue-500 to-blue-600',
              'from-purple-500 to-purple-600',
              'from-pink-500 to-pink-600',
              'from-indigo-500 to-indigo-600',
              'from-teal-500 to-teal-600'
            ];
            const gradient = eventGradients[index % eventGradients.length];
            
            return (
              <Card key={event.id} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                      {t(event.titleKey)}
                    </CardTitle>
                    <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Event Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                      <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                      <span className="font-medium">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                      <Clock className="h-5 w-5 mr-3 text-purple-500" />
                      <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                      <MapPin className="h-5 w-5 mr-3 text-pink-500" />
                      <span className="font-medium">{t(event.locationKey)}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">{t(event.descriptionKey)}</p>
                  
                  {/* CTA Button */}
                  <Button asChild className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <Link to={`/eventos#event-${event.id}`}>
                      {t('home.moreDetailsButton')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
                
                {/* Decorative Element */}
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Recent News */}
      <section className="relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-pink-50 to-orange-50 border-pink-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Últimas Notícias
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('home.recentNewsTitle')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Fique por dentro das novidades, conquistas e momentos especiais da nossa comunidade.</p>
          <Button asChild variant="outline" className="bg-white hover:bg-gray-50 border-2 border-pink-200 hover:border-pink-300 text-pink-700 font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <Link to="/noticias" className="flex items-center">
              {t('home.viewAllLink')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentNews.map((news: I18nHomePageRecentNews, index: number) => {
            const newsGradients = [
              'from-pink-500 to-rose-500',
              'from-orange-500 to-red-500',
              'from-purple-500 to-pink-500',
              'from-blue-500 to-purple-500',
              'from-teal-500 to-blue-500'
            ];
            const gradient = newsGradients[index % newsGradients.length];
            
            return (
              <Card key={news.id} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium bg-gray-100 text-gray-600">
                      {formatDate(news.date)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                    {t(news.titleKey)}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Summary */}
                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    {t(news.excerptKey)}
                  </p>
                  
                  {/* Read More Button */}
                  <Button asChild className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <Link to={`/noticias#news-${news.id}`}>
                      {t('home.readMoreButton')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
                
                {/* Decorative Element */}
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
              </Card>
            );
          })}
        </div>
        
        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 border border-blue-100">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Pronto para se Juntar a Nós?</h3>
              <p className="text-lg text-gray-600 mb-8">Faça parte de uma comunidade vibrante e descubra novas amizades, experiências e oportunidades de crescimento.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Link to="/contato">
                    <Users className="w-5 h-5 mr-2" />
                    Entrar em Contato
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm text-purple-700 hover:bg-white border-2 border-purple-200 hover:border-purple-300 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link to="/eventos">
                    <Calendar className="w-5 h-5 mr-2" />
                    Ver Próximos Eventos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
