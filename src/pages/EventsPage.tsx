import React, { useState, useMemo } from 'react';
import { useEventsData, EventSortOptions, EventFilters } from '@/hooks/useEventsData';
import { I18nEventData } from '@/types'; // Importar de @/types
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MapPin, Users, AlertTriangle, ExternalLink, ListRestart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Efeito de blur para placeholder
import PageLoader from '@/components/PageLoader'; // Para o estado de carregamento
import { Link } from 'react-router-dom'; // Adicionado Link
import { Button } from '@/components/ui/button'; // Adicionado Button
import PaginationControls from '@/components/ui/PaginationControls'; // Importar PaginationControls
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { formatDateForLocale } from '@/lib/dateUtils'; // Importar helper

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
  event: I18nEventData; 
}

const EventCard: React.FC<EventCardProps> = React.memo(({ event }) => {
  const { t, i18n } = useTranslation();

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
      <Link to={`/eventos/${event.id}`} className="block hover:opacity-90 transition-opacity">
        <LazyLoadImage
          alt={t(event.titleKey)}
          src={event.imageUrl || '/placeholder-event.jpg'}
          effect="blur"
          className="w-full h-48 object-cover"
          placeholderSrc="/placeholder-event-small.jpg"
        />
      </Link>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-xl font-semibold text-blue-700">
            <Link to={`/eventos/${event.id}`} className="hover:text-blue-800 transition-colors">
              {t(event.titleKey)}
            </Link>
          </CardTitle>
          <Badge variant={getStatusBadgeVariant(event.statusKey)} className="ml-2 whitespace-nowrap">
            {t(event.statusKey)}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-600 font-medium">{t(event.categoryKey)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center text-gray-700">
          <CalendarDays size={16} className="mr-2 text-blue-500" /> {formatDateForLocale(event.date, i18n, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div className="flex items-center text-gray-700">
          <Clock size={16} className="mr-2 text-blue-500" /> {event.time}
        </div>
        <div className="flex items-center text-gray-700">
          <MapPin size={16} className="mr-2 text-blue-500" /> {t(event.locationKey)} {/* Alterado para t(event.locationKey) */}
        </div>
        <p className="text-gray-600 pt-1 line-clamp-3">{t(event.descriptionKey)}</p>
      </CardContent>
      <CardFooter className="pt-3 pb-4 bg-gray-50 flex justify-between items-center">
        {participantsText && (
          <div className="flex items-center text-xs text-gray-500">
            <Users size={14} className="mr-1.5" /> {participantsText}
          </div>
        )}
        <Button asChild variant="link" size="sm" className="text-blue-600 hover:text-blue-700 px-0 ml-auto">
          <Link to={`/eventos/${event.id}`} className="flex items-center">
            {t('home.moreDetailsButton')}
            <ExternalLink size={14} className="ml-1.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
});
EventCard.displayName = 'EventCard';

const ITEMS_PER_PAGE = 6; // Definir quantos itens por página

const eventCategories = [
  'event.category.Social',
  'event.category.Esportivo',
  'event.category.Cultural',
  'event.category.Educacional'
];

const eventStatuses = [
  'event.status.Inscrições Abertas',
  'event.status.Quase Lotado',
  'event.status.Lotado',
  'event.status.Em Breve',
  'event.status.Cancelado',
  'event.status.Realizado'
];

const eventSortOptions: { labelKey: string, value: EventSortOptions }[] = [
  { labelKey: 'sort.dateDesc', value: { field: 'date', order: 'desc' } },
  { labelKey: 'sort.dateAsc', value: { field: 'date', order: 'asc' } },
  { labelKey: 'sort.titleAsc', value: { field: 'titleKey', order: 'asc' } },
  { labelKey: 'sort.titleDesc', value: { field: 'titleKey', order: 'desc' } },
  { labelKey: 'sort.participantsDesc', value: { field: 'participants.count', order: 'desc' } },
  { labelKey: 'sort.participantsAsc', value: { field: 'participants.count', order: 'asc' } },
];

const EventsPage: React.FC = () => {
  const { t, i18n: i18nPageScope } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<EventFilters>({});
  const [currentSort, setCurrentSort] = useState<EventSortOptions>(eventSortOptions[0].value);

  const { events, totalCount, totalPages, isLoading, isError, error } = 
    useEventsData(currentPage, ITEMS_PER_PAGE, currentSort, filters);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterName: keyof EventFilters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value === '' ? undefined : value })); // Store undefined if empty string
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    const selectedSort = eventSortOptions.find(opt => `${opt.value.field}-${opt.value.order}` === value) || eventSortOptions[0];
    setCurrentSort(selectedSort.value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({});
    setCurrentSort(eventSortOptions[0].value);
    setCurrentPage(1);
  };
  
  const categorySelectOptions = useMemo(() => eventCategories.map(catKey => (
    <SelectItem key={catKey} value={catKey}>{t(catKey)}</SelectItem>
  )), [t]);

  const statusSelectOptions = useMemo(() => eventStatuses.map(statKey => (
    <SelectItem key={statKey} value={statKey}>{t(statKey)}</SelectItem>
  )), [t]);

  const sortSelectOptions = useMemo(() => eventSortOptions.map(opt => (
    <SelectItem key={`${opt.value.field}-${opt.value.order}`} value={`${opt.value.field}-${opt.value.order}`}>
      {t(opt.labelKey)}
    </SelectItem>
  )), [t]);

  if (isLoading && !events) {
    return <PageLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{t('eventsPage.title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('eventsPage.subtitle')}</p>
      </div>

      <Card className="mb-8 p-4 md:p-6 bg-gray-50 shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <Label htmlFor="event-category-filter" className="text-sm font-medium text-gray-700">{t('eventDetailPage.categoryLabel')}</Label>
            <Select value={filters.categoryKey || ''} onValueChange={(val) => handleFilterChange('categoryKey', val)}>
              <SelectTrigger id="event-category-filter" className="w-full mt-1">
                <SelectValue placeholder={t('filterSort.allCategories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('filterSort.allCategories')}</SelectItem>
                {categorySelectOptions}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="event-status-filter" className="text-sm font-medium text-gray-700">{t('eventDetailPage.statusLabel')}</Label>
            <Select value={filters.statusKey || ''} onValueChange={(val) => handleFilterChange('statusKey', val)}>
              <SelectTrigger id="event-status-filter" className="w-full mt-1">
                <SelectValue placeholder={t('filterSort.allStatuses')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('filterSort.allStatuses')}</SelectItem>
                {statusSelectOptions}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="event-sort-order" className="text-sm font-medium text-gray-700">{t('filterSort.sortBy')}</Label>
            <Select value={`${currentSort.field}-${currentSort.order}`} onValueChange={handleSortChange}>
              <SelectTrigger id="event-sort-order" className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortSelectOptions}
              </SelectContent>
            </Select>
          </div>
          <div className="lg:self-end">
            <Button onClick={clearAllFilters} variant="outline" className="w-full">
              <ListRestart size={16} className="mr-2"/>
              {t('filterSort.clearFilters')}
            </Button>
          </div>
        </div>
      </Card>

      {isError && (
         <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold text-red-700 mb-2">{t('error.genericTitle')}</h2>
            <p className="text-red-600">{t('error.fetchDataError')}</p>
            {error && <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>}
        </div>
      )}

      {!isError && !isLoading && events && events.length === 0 && (
        <div className="text-center py-16">
          <AlertTriangle size={64} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">{t('eventsPage.noEventsTitle')}</h2>
          <p className="text-gray-500">{t('eventsPage.noEventsSubtitle')}</p>
        </div>
      )}

      {events && events.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((eventItem: I18nEventData) => 
              <EventCard key={eventItem.id} event={eventItem} />
            )}
          </div>
          {totalPages && totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={totalCount || 0}
            />
          )}
        </>
      )}
      {isLoading && events && events.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg text-sm">
          {t('Loading...')}
        </div>
      )}
    </div>
  );
};

export default EventsPage; 