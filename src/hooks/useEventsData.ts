import { useQuery } from '@tanstack/react-query';
import { I18nEventData } from '@/types';

const fetchEventsData = async (): Promise<I18nEventData[]> => {
  const response = await fetch('http://localhost:3001/events');
  if (!response.ok) {
    throw new Error('Network response was not ok when fetching events data');
  }
  return response.json();
};

export const useEventsData = () => {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery<I18nEventData[], Error>({
    queryKey: ['eventsData'],
    queryFn: fetchEventsData,
  });

  return {
    events,
    isLoading,
    isError,
    error,
  };
};

// Se EventData de @/types não for mais usada por este hook, 
// você pode remover a importação ou ajustar src/types/index.ts conforme necessário.
// Por exemplo, se I18nEventData deve ser o novo EventData global, mova-o para lá. 