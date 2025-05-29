import { useQuery } from '@tanstack/react-query';
import { I18nNewsArticleData } from '@/types';

export interface PaginatedNewsResponse {
  articles: I18nNewsArticleData[];
  totalCount: number;
  totalPages: number;
}

export interface NewsSortOptions {
  field: 'date' | 'titleKey'; // Campos de ordenação para notícias
  order: 'asc' | 'desc';
}

const fetchNewsData = async (
  page: number, 
  limit: number, 
  sort: NewsSortOptions, 
  categoryFilter?: string
): Promise<PaginatedNewsResponse> => {
  let url = `http://localhost:3001/news?_page=${page}&_limit=${limit}`;
  url += `&_sort=${sort.field}&_order=${sort.order}`;

  if (categoryFilter) {
    url += `&categoryKey=${encodeURIComponent(categoryFilter)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok when fetching news data');
  }
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);
  const articles: I18nNewsArticleData[] = await response.json();
  return {
    articles,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const useNewsData = (
  page: number, 
  limit: number, 
  sort: NewsSortOptions, 
  categoryFilter?: string
) => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedNewsResponse, Error>({
    // Adicionar sort e categoryFilter à queryKey para recarregar quando mudarem
    queryKey: ['newsData', page, limit, sort, categoryFilter],
    queryFn: () => fetchNewsData(page, limit, sort, categoryFilter),
    keepPreviousData: true,
  });

  return {
    newsArticles: data?.articles,
    totalCount: data?.totalCount,
    totalPages: data?.totalPages,
    isLoading,
    isError,
    error,
  };
}; 