import { useQuery } from '@tanstack/react-query';
import { I18nEventData } from '@/types';

export interface PaginatedEventsResponse {
  events: I18nEventData[];
  totalCount: number;
  totalPages: number;
}

export interface EventSortOptions {
  field: 'date' | 'titleKey' | 'participants.count'; // Campos de ordenação para eventos
  order: 'asc' | 'desc';
}

export interface EventFilters {
  categoryKey?: string;
  statusKey?: string;
}

const fetchEventsData = async (
  page: number, 
  limit: number, 
  sort: EventSortOptions, 
  filters: EventFilters
): Promise<PaginatedEventsResponse> => {
  let url = `http://localhost:3001/events?_page=${page}&_limit=${limit}`;
  url += `&_sort=${sort.field}&_order=${sort.order}`;

  if (filters.categoryKey) {
    url += `&categoryKey=${encodeURIComponent(filters.categoryKey)}`;
  }
  if (filters.statusKey) {
    url += `&statusKey=${encodeURIComponent(filters.statusKey)}`;
  }

  const response = await fetch(url);
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

export const useEventsData = (
  page: number, 
  limit: number, 
  sort: EventSortOptions, 
  filters: EventFilters
) => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedEventsResponse, Error>({
    queryKey: ['eventsData', page, limit, sort, filters], // Adicionar sort e filters
    queryFn: () => fetchEventsData(page, limit, sort, filters),
    keepPreviousData: true,
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