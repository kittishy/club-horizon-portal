import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CalendarDays, Clock, MapPin, Tag, Users, Briefcase, Phone, ExternalLink, Edit, ArrowLeft } from 'lucide-react';
import PageLoader from '@/components/PageLoader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEventDetailData } from '@/hooks/useEventDetailData.tsx';
import { I18nEventData } from '@/types'; // Supondo que I18nEventData esteja em @/types
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { event, isLoading, isError, error } = useEventDetailData(eventId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(i18n.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !event) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center min-h-[calc(100vh-200px)]">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-700 mb-2">
          {isError ? t('error.genericTitle') : t('eventDetailPage.notFoundTitle')}
        </h2>
        <p className="text-red-600">
          {isError ? t('error.fetchDataError') : t('eventDetailPage.notFoundText')}
        </p>
        {error && <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>}
      </div>
    );
  }

  const descriptionHtml = t(event.descriptionKey || 'eventDetailPage.fullDescriptionUnavailable');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)} 
        className="mb-6 group flex items-center"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
        {t('navigation.goBackButton')}
      </Button>
      <Card className="overflow-hidden shadow-lg">
        {event.imageUrl && (
          <LazyLoadImage
            alt={t(event.titleKey)}
            src={event.imageUrl}
            effect="blur"
            className="w-full h-64 md:h-96 object-cover"
            placeholderSrc="/placeholder-event-small.jpg" // Placeholder específico para eventos
          />
        )}
        <CardHeader className="pt-6 pb-4">
          <CardTitle className="text-3xl md:text-4xl font-bold text-gray-800">
            {t(event.titleKey)}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-6 pt-2 pb-6">
          {/* Coluna de Informações Detalhadas */}
          <div className="md:col-span-1 space-y-4 text-sm">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">{t('eventDetailPage.informationTitle')}</h3>
            
            <div className="flex items-start">
              <CalendarDays size={18} className="mr-2.5 mt-0.5 text-blue-600 flex-shrink-0" />
              <div>
                <strong className="text-gray-600">{t('eventDetailPage.dateLabel')}</strong>
                <p className="text-gray-800">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock size={18} className="mr-2.5 mt-0.5 text-blue-600 flex-shrink-0" />
              <div>
                <strong className="text-gray-600">{t('eventDetailPage.timeLabel')}</strong>
                <p className="text-gray-800">{formatTime(event.date)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="mr-2.5 mt-0.5 text-blue-600 flex-shrink-0" />
              <div>
                <strong className="text-gray-600">{t('eventDetailPage.locationLabel')}</strong>
                <p className="text-gray-800">{t(event.locationKey)}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Tag size={18} className="mr-2.5 mt-0.5 text-blue-600 flex-shrink-0" />
              <div>
                <strong className="text-gray-600">{t('eventDetailPage.categoryLabel')}</strong>
                <Badge variant="outline" className="mt-1">{t(event.categoryKey)}</Badge>
              </div>
            </div>

            <div className="flex items-start">
              <Edit size={18} className="mr-2.5 mt-0.5 text-blue-600 flex-shrink-0" /> {/* Ícone para status */}
              <div>
                <strong className="text-gray-600">{t('eventDetailPage.statusLabel')}</strong>
                <Badge variant={event.statusKey.includes('Lotado') || event.statusKey.includes('Cancelado') ? "destructive" : "secondary"} className="mt-1">
                  {t(event.statusKey)}
                </Badge>
              </div>
            </div>
            
            {event.participants && (
              <div className="flex items-start">
                <Users size={18} className="mr-2.5 mt-0.5 text-blue-600 flex-shrink-0" />
                <div>
                  <strong className="text-gray-600">{t('eventDetailPage.participantsLabel')}</strong>
                  <p className="text-gray-800">
                    {t('event.participantsText', { 
                      count: event.participants.count, 
                      statusAffix: t(`event.participants.${event.participants.statusAffixKey}`) 
                    })}
                  </p>
                </div>
              </div>
            )}

            {event.organizer && (
                <div className="flex items-start">
                    <Briefcase size={18} className="mr-2.5 mt-0.5 text-blue-600 flex-shrink-0" />
                    <div>
                        <strong className="text-gray-600">{t('eventDetailPage.organizerLabel')}</strong>
                        <p className="text-gray-800">{t(event.organizer.nameKey)}</p>
                        {event.organizer.contactKey && (
                            <div className="flex items-center text-xs text-blue-500 hover:text-blue-700 mt-0.5">
                                <Phone size={12} className="mr-1" />
                                {t(event.organizer.contactKey)}
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            <div className="pt-4 space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                    <ExternalLink size={18} className="mr-2" />
                    {t('eventDetailPage.registerButton')}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                    <Link to="/calendario">
                        <CalendarDays size={18} className="mr-2" />
                        {t('eventDetailPage.viewOnCalendarButton')}
                    </Link>
                </Button>
            </div>
          </div>

          {/* Coluna de Descrição */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">{t('eventDetailPage.descriptionTitle')}</h3>
            <div className="prose lg:prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailPage; 