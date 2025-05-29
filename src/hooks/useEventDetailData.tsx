import { useQuery } from '@tanstack/react-query';
import { I18nEventData } from '@/types';

const fetchEventDetail = async (eventId: string | undefined): Promise<I18nEventData | null> => {
  if (!eventId) {
    return null;
  }
  const response = await fetch(`http://localhost:3001/events/${eventId}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null; // Evento não encontrado
    }
    throw new Error(`Network response was not ok when fetching event article ${eventId}`);
  }
  const event: I18nEventData = await response.json();
  // json-server retorna {} para IDs não encontrados se não houver rota específica para 404
  if (Object.keys(event).length === 0 && event.constructor === Object) {
      return null;
  }
  return event;
};

export const useEventDetailData = (eventId: string | undefined) => {
  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery<I18nEventData | null, Error>({
    queryKey: ['eventDetail', eventId],
    queryFn: () => fetchEventDetail(eventId),
    enabled: !!eventId, // A query só será executada se eventId existir
  });

  return {
    event,
    isLoading,
    isError,
    error,
  };
}; 