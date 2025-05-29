import React from 'react';
import { useEventsData } from '@/hooks/useEventsData';
import { I18nEventData } from '@/types'; // Importar de @/types
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MapPin, Users, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Efeito de blur para placeholder

// A interface I18nEventData foi movida para @/types
// Esta seção pode ser removida.
/*
interface I18nEventData {
  id: number;
  titleKey: string;
  date: string;
  time: string;
  locationKey: string; // Alterado de location para locationKey
  descriptionKey: string;
  categoryKey: string;
  statusKey: string;
  imageUrl: string;
  participants?: number;
  maxCapacity?: number;
}
*/

interface EventCardProps {
  event: I18nEventData; // Usar o tipo importado
  formatDate: (dateString: string) => string;
}

const EventCard: React.FC<EventCardProps> = React.memo(({ event, formatDate }) => {
  const { t } = useTranslation();

  const getStatusBadgeVariant = (statusKey: string) => {
    if (statusKey === 'event.status.Lotado' || statusKey === 'event.status.Cancelado') return "destructive";
    if (statusKey === 'event.status.Quase Lotado') return "secondary";
    if (statusKey === 'event.status.Inscrições Abertas') return "default";
    return "outline";
  };

  const participantsText = event.participants !== undefined && event.maxCapacity !== undefined
    ? t('event.participantsText', {
        count: event.participants,
        statusAffix: t(event.statusKey === 'event.status.Inscrições Abertas' || event.statusKey === 'event.status.Quase Lotado' ? 'event.participants.expected' : 'event.participants.confirmed'),
      })
    : event.participants !== undefined
    ? t('event.participantsText', { count: event.participants, statusAffix: t('event.participants.confirmed') })
    : null;

  return (
    <Card id={`event-${event.id}`} className="w-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <LazyLoadImage
        alt={t(event.titleKey)}
        src={event.imageUrl || '/placeholder-event.jpg'}
        effect="blur"
        className="w-full h-48 object-cover"
        placeholderSrc="/placeholder-event-small.jpg"
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-xl font-semibold text-blue-700">{t(event.titleKey)}</CardTitle>
          <Badge variant={getStatusBadgeVariant(event.statusKey)} className="ml-2 whitespace-nowrap">
            {t(event.statusKey)}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-600 font-medium">{t(event.categoryKey)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center text-gray-700">
          <CalendarDays size={16} className="mr-2 text-blue-500" /> {formatDate(event.date)}
        </div>
        <div className="flex items-center text-gray-700">
          <Clock size={16} className="mr-2 text-blue-500" /> {event.time}
        </div>
        <div className="flex items-center text-gray-700">
          <MapPin size={16} className="mr-2 text-blue-500" /> {t(event.locationKey)} {/* Alterado para t(event.locationKey) */}
        </div>
        <p className="text-gray-600 pt-1">{t(event.descriptionKey)}</p>
      </CardContent>
      <CardFooter className="pt-3 pb-4 bg-gray-50">
        {participantsText && (
          <div className="flex items-center text-xs text-gray-500">
            <Users size={14} className="mr-1.5" /> {participantsText}
          </div>
        )}
      </CardFooter>
    </Card>
  );
});
EventCard.displayName = 'EventCard';

const EventsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { events } = useEventsData();

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // O cast para I18nEventData já deve estar correto com a importação de @/types
  // const typedEvents = events as I18nEventData[]; 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{t('eventsPage.title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('eventsPage.subtitle')}</p>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: I18nEventData) => ( // Adicionar tipo aqui para clareza
            <EventCard key={event.id} event={event} formatDate={formatDate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <AlertTriangle size={64} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{t('eventsPage.noEventsTitle')}</h2>
            <p className="text-gray-500">{t('eventsPage.noEventsSubtitle')}</p>
        </div>
      )}
    </div>
  );
};

export default EventsPage; 