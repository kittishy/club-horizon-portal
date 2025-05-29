import { useQuery } from '@tanstack/react-query';
import { I18nEventData } from '@/types';

export interface PaginatedEventsResponse {
  events: I18nEventData[];
  totalCount: number;
  totalPages: number;
}

const fetchEventsData = async (page: number, limit: number): Promise<PaginatedEventsResponse> => {
  // Adicionando ordenação por data, mais recentes primeiro
  const response = await fetch(`http://localhost:3001/events?_page=${page}&_limit=${limit}&_sort=date&_order=desc`);
  if (!response.ok) {
    throw new Error('Network response was not ok when fetching events data');
  }
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);
  const events: I18nEventData[] = await response.json();
  return {
    events,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const useEventsData = (page: number, limit: number) => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedEventsResponse, Error>({
    queryKey: ['eventsData', page, limit], // Inclui page e limit na queryKey
    queryFn: () => fetchEventsData(page, limit),
    keepPreviousData: true, // Mantém os dados anteriores enquanto novos são carregados
  });

  return {
    events: data?.events,
    totalCount: data?.totalCount,
    totalPages: data?.totalPages,
    isLoading,
    isError,
    error,
  };
};

// Se EventData de @/types não for mais usada por este hook, 
// você pode remover a importação ou ajustar src/types/index.ts conforme necessário.
// Por exemplo, se I18nEventData deve ser o novo EventData global, mova-o para lá. 