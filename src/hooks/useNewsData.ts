import { useMemo } from 'react';
import { I18nNewsArticleData } from '@/types'; // Importar o tipo I18n correto

const mockNewsData: I18nNewsArticleData[] = [
  {
    id: 1,
    titleKey: "news.article1.title",
    date: "2025-07-20",
    categoryKey: "news.category.ClubUpdates",
    imageUrl: "/images/news/pool-complex.jpg",
    summaryKey: "news.article1.summary",
    // fullContentKey: "news.article1.fullContent" // Para quando tivermos a página de detalhe da notícia
  },
  {
    id: 2,
    titleKey: "news.article2.title",
    date: "2025-07-18",
    categoryKey: "news.category.ClubUpdates",
    imageUrl: "/images/news/members-assembly.jpg",
    summaryKey: "news.article2.summary",
  },
  {
    id: 3,
    titleKey: "news.article3.title",
    date: "2025-07-15",
    categoryKey: "news.category.MemberSpotlight",
    imageUrl: "/images/news/tennis-champions.jpg",
    summaryKey: "news.article3.summary",
  },
  {
    id: 4,
    titleKey: "news.article4.title",
    date: "2025-07-10",
    categoryKey: "news.category.SpecialEvents",
    imageUrl: "/images/news/gastronomy-festival.jpg",
    summaryKey: "news.article4.summary",
  },
  {
    id: 5,
    titleKey: "news.article5.title",
    date: "2025-07-02",
    categoryKey: "news.category.Maintenance",
    imageUrl: "/images/news/system-maintenance.jpg",
    summaryKey: "news.article5.summary",
  },
];

export const useNewsData = () => {
  const newsArticles = useMemo(() => mockNewsData, []);
  // Lógica de paginação ou filtro pode ser adicionada aqui no futuro
  return { newsArticles };
}; 