import React, { useMemo, useCallback } from 'react';
import { Calendar, momentLocalizer, Views, NavigateAction, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importar locale pt-br para moment
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCalendarData } from '@/hooks/useCalendarData';
import { I18nCalendarEventData } from '@/types'; // Importar de @/types
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

// Configurar o localizador do Moment.js
moment.locale('en'); // Definir 'en' como padrão, será alterado dinamicamente
const localizer = momentLocalizer(moment);

interface CustomToolbarProps {
  label: string;
  view: View;
  views: View[];
  onNavigate: (action: NavigateAction, date?: Date) => void;
  onView: (view: View) => void;
  t: (key: string) => string; // Adicionar t para tradução
}

const CustomToolbar: React.FC<CustomToolbarProps> = React.memo(({ label, view, views, onNavigate, onView, t }) => {
  const navigate = useCallback((action: NavigateAction) => {
    onNavigate(action);
  }, [onNavigate]);

  const viewHandler = useCallback((newView: View) => {
    onView(newView);
  }, [onView]);

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => navigate(Navigate.PREVIOUS)}>{t('calendar.previous')}</button>
        <button type="button" onClick={() => navigate(Navigate.TODAY)}>{t('calendar.today')}</button>
        <button type="button" onClick={() => navigate(Navigate.NEXT)}>{t('calendar.next')}</button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        {(views as string[]).includes(Views.MONTH) && (
          <button type="button" className={view === Views.MONTH ? 'rbc-active' : ''} onClick={() => viewHandler(Views.MONTH)}>{t('calendar.month')}</button>
        )}
        {(views as string[]).includes(Views.WEEK) && (
          <button type="button" className={view === Views.WEEK ? 'rbc-active' : ''} onClick={() => viewHandler(Views.WEEK)}>{t('calendar.week')}</button>
        )}
        {(views as string[]).includes(Views.DAY) && (
          <button type="button" className={view === Views.DAY ? 'rbc-active' : ''} onClick={() => viewHandler(Views.DAY)}>{t('calendar.day')}</button>
        )}
        {(views as string[]).includes(Views.AGENDA) && (
          <button type="button" className={view === Views.AGENDA ? 'rbc-active' : ''} onClick={() => viewHandler(Views.AGENDA)}>{t('calendar.agenda')}</button>
        )}
      </span>
    </div>
  );
});
CustomToolbar.displayName = 'CustomToolbar';

interface EventComponentProps {
  event: I18nCalendarEventData;
  t: (key: string, options?: object) => string;
}

const EventComponent: React.FC<EventComponentProps> = React.memo(({ event, t }) => (
  <div className="p-1">
    <strong className="rbc-event-label">{t(event.titleKey)}</strong>
    {event.descriptionKey && <p className="text-xs truncate">{t(event.descriptionKey)}</p>}
    {event.locationKey && (
      <div className="flex items-center text-xs mt-0.5">
        <MapPin size={12} className="mr-1" /> {t(event.locationKey)}
      </div>
    )}
    {event.categoryKey && (
      <Badge variant="secondary" className="mt-1 py-0.5 px-1.5 font-normal">
        {t(event.categoryKey)}
      </Badge>
    )}
  </div>
));
EventComponent.displayName = 'EventComponent';

const CalendarPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { calendarEvents } = useCalendarData();

  // Atualiza o locale do moment dinamicamente
  useMemo(() => {
    moment.locale(i18n.language.startsWith('pt') ? 'pt-br' : 'en');
  }, [i18n.language]);

  const eventsForBigCalendar = useMemo(() => {
    return (calendarEvents as I18nCalendarEventData[]).map(event => ({
      ...event,
      title: t(event.titleKey),
    }));
  }, [calendarEvents, t]);

  const components = useMemo(() => ({
    toolbar: (props: any) => <CustomToolbar {...props} t={t} />,
    event: (props: any) => <EventComponent {...props} t={t} />,
  }), [t]);

  const messages = useMemo(() => ({
    allDay: t('calendar.allDay'),
    previous: t('calendar.previous'),
    next: t('calendar.next'),
    today: t('calendar.today'),
    month: t('calendar.month'),
    week: t('calendar.week'),
    day: t('calendar.day'),
    agenda: t('calendar.agenda'),
    date: t('date', { defaultValue: 'Date' }),
    time: t('time', { defaultValue: 'Time' }),
    event: t('event', { defaultValue: 'Event' }),
    noEventsInRange: t('calendar.noEventsInRange'),
    showMore: (total: number) => t('calendar.showMore', { count: total }),
  }), [t]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('calendarPage.title')}</h1>
        <p className="text-md text-gray-600 max-w-xl mx-auto">{t('calendarPage.subtitle')}</p>
      </div>
      <Card className="shadow-xl">
        <CardContent className="p-0 md:p-2">
          <div style={{ height: '700px' }} className="bg-white rounded-md p-2 md:p-4">
            <Calendar
              localizer={localizer}
              events={eventsForBigCalendar}
              startAccessor="start"
              endAccessor="end"
              style={{ flexGrow: 1 }}
              views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
              defaultView={Views.MONTH}
              selectable
              popup 
              onSelectEvent={event => alert(t((event as I18nCalendarEventData).titleKey))}
              components={components}
              messages={messages}
              culture={i18n.language.startsWith('pt') ? 'pt-BR' : 'en-US'}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage; 