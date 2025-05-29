import { useQuery } from '@tanstack/react-query';
import { I18nCalendarEventData } from '@/types';

// Interface para o formato de evento que vem da API (com datas como string)
interface ApiCalendarEvent extends Omit<I18nCalendarEventData, 'start' | 'end'> {
  start: string;
  end: string;
}

const fetchCalendarEvents = async (): Promise<ApiCalendarEvent[]> => {
  const response = await fetch('http://localhost:3001/calendarEvents');
  if (!response.ok) {
    throw new Error('Network response was not ok when fetching calendar events');
  }
  return response.json();
};

export const useCalendarData = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<ApiCalendarEvent[], Error>({
    queryKey: ['calendarEvents'],
    queryFn: fetchCalendarEvents,
  });

  // Transforma os eventos da API para o formato esperado pelo FullCalendar (datas como objetos Date)
  const transformedEvents: I18nCalendarEventData[] | undefined = data?.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return {
    calendarEvents: transformedEvents,
    isLoading,
    isError,
    error,
  };
}; 