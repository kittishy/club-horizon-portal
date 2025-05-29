import { useQuery } from '@tanstack/react-query';
import { I18nNewsArticleData } from '@/types';

const fetchNewsData = async (): Promise<I18nNewsArticleData[]> => {
  const response = await fetch('http://localhost:3001/news');
  if (!response.ok) {
    throw new Error('Network response was not ok when fetching news data');
  }
  return response.json();
};

export const useNewsData = () => {
  const {
    data: newsArticles,
    isLoading,
    isError,
    error,
  } = useQuery<I18nNewsArticleData[], Error>({
    queryKey: ['newsData'],
    queryFn: fetchNewsData,
  });

  return {
    newsArticles,
    isLoading,
    isError,
    error,
  };
}; 