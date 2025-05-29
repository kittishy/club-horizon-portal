import { useQuery } from '@tanstack/react-query';
import { I18nNewsArticleData } from '@/types';

const fetchNewsDetail = async (newsId: string | undefined): Promise<I18nNewsArticleData | null> => {
  if (!newsId) {
    // Não deveria acontecer se a rota estiver configurada corretamente e o ID for passado
    // Mas é uma boa prática tratar este caso.
    return null;
  }
  const response = await fetch(`http://localhost:3001/news/${newsId}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null; // Artigo não encontrado
    }
    throw new Error(`Network response was not ok when fetching news article ${newsId}`);
  }
  const article: I18nNewsArticleData = await response.json();
  // Pequena verificação para garantir que o objeto retornado tem um ID (json-server retorna {} para IDs não encontrados)
  if (Object.keys(article).length === 0 && article.constructor === Object) {
      return null;
  }
  return article;
};

export const useNewsDetailData = (newsId: string | undefined) => {
  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useQuery<I18nNewsArticleData | null, Error>({
    queryKey: ['newsDetail', newsId],
    queryFn: () => fetchNewsDetail(newsId),
    enabled: !!newsId, // A query só será executada se newsId existir
  });

  return {
    article,
    isLoading,
    isError,
    error,
  };
}; 