import { useQuery } from '@tanstack/react-query';
import { I18nNewsArticleData } from '@/types';

export interface PaginatedNewsResponse {
  articles: I18nNewsArticleData[];
  totalCount: number;
  totalPages: number;
}

const fetchNewsData = async (page: number, limit: number): Promise<PaginatedNewsResponse> => {
  const response = await fetch(`http://localhost:3001/news?_page=${page}&_limit=${limit}&_sort=date&_order=desc`);
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

export const useNewsData = (page: number, limit: number) => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedNewsResponse, Error>({
    queryKey: ['newsData', page, limit],
    queryFn: () => fetchNewsData(page, limit),
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