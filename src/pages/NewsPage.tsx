import React, { useState, useMemo, useCallback } from 'react';
import { useNewsData, NewsSortOptions } from '@/hooks/useNewsData';
import { I18nNewsArticleData } from '@/types'; // Importar de @/types
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, Tag, AlertTriangle, ExternalLink, Filter, ListRestart, Newspaper, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PageLoader from '@/components/PageLoader'; // Para o estado de carregamento
import PaginationControls from '@/components/ui/PaginationControls'; // Importar PaginationControls
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Importar Select
import { Label } from "@/components/ui/label"; // Importar Label
import { formatDateForLocale } from '@/lib/dateUtils'; // Importar helper
import i18nInstance from '@/i18n'; // Importar a instância diretamente

// A interface I18nNewsArticleData foi movida para @/types
// Esta seção pode ser removida.

interface NewsCardProps {
  article: I18nNewsArticleData;
  // A prop formatDate não é mais necessária aqui, o card formata internamente
}

const NewsCard: React.FC<NewsCardProps> = React.memo(({ article }) => {
  const { t } = useTranslation();
  // Formata a data diretamente dentro do NewsCard
  const formattedDate = formatDateForLocale(article.date, i18nInstance, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {article.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={t(article.titleKey)} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
        </div>
      )}
      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{t(article.titleKey)}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{t(article.summaryKey)}</p>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center">
              <CalendarDays size={14} className="mr-1" />
              <span>{t('home.publishedOn', { date: formattedDate })}</span>
            </div>
            <div className="flex items-center">
              <Newspaper size={14} className="mr-1" />
              <span>{t(article.categoryKey)}</span>
            </div>
          </div>
          <Link 
            to={`/noticias/${article.id}`} 
            className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            {t('newsPage.readMore')} <ArrowRight size={14} className="inline ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
});
NewsCard.displayName = 'NewsCard';

const ITEMS_PER_PAGE = 6; // Definir quantos itens por página
const newsCategories = [
  'news.category.ClubUpdates',
  'news.category.MemberSpotlight',
  'news.category.SpecialEvents',
  'news.category.Maintenance'
];

const sortOptions: { labelKey: string, value: NewsSortOptions }[] = [
  { labelKey: 'sort.dateDesc', value: { field: 'date', order: 'desc' } },
  { labelKey: 'sort.dateAsc', value: { field: 'date', order: 'asc' } },
  { labelKey: 'sort.titleAsc', value: { field: 'titleKey', order: 'asc' } },
  { labelKey: 'sort.titleDesc', value: { field: 'titleKey', order: 'desc' } },
];

const NewsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [currentSort, setCurrentSort] = useState<NewsSortOptions>(sortOptions[0].value); 

  const { newsArticles, totalCount, totalPages, isLoading, isError, error } = 
    useNewsData(currentPage, ITEMS_PER_PAGE, currentSort, categoryFilter);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1); // Resetar para a primeira página ao mudar filtro
  };

  const handleSortChange = (value: string) => {
    const selectedSort = sortOptions.find(opt => `${opt.value.field}-${opt.value.order}` === value) || sortOptions[0];
    setCurrentSort(selectedSort.value);
    setCurrentPage(1); // Resetar para a primeira página ao mudar ordenação
  };
  
  const clearFilters = () => {
    setCategoryFilter('');
    setCurrentSort(sortOptions[0].value);
    setCurrentPage(1);
  };

  const formatDateForFilterDisplay = useCallback((dateString: string | null): string => {
    if (!dateString) return t('newsPage.filter.allDates'); // Ou algum placeholder
    // Usar a instância i18n do hook useTranslation
    return formatDateForLocale(dateString, i18n, { year: 'numeric', month: 'short', day: 'numeric' });
  }, [i18n, t]);

  // Memoizar opções de select para evitar recriação em cada render
  const categorySelectOptions = useMemo(() => newsCategories.map(catKey => (
    <SelectItem key={catKey} value={catKey}>{t(catKey)}</SelectItem>
  )), [t]);

  const sortSelectOptions = useMemo(() => sortOptions.map(opt => (
    <SelectItem key={`${opt.value.field}-${opt.value.order}`} value={`${opt.value.field}-${opt.value.order}`}>
      {t(opt.labelKey)}
    </SelectItem>
  )), [t]);

  if (isLoading && !newsArticles) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-700 mb-2">{t('error.genericTitle')}</h2>
        <p className="text-red-600">{t('error.fetchDataError')}</p>
        {error && <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{t('newsPage.title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('newsPage.subtitle')}</p>
      </div>

      {/* Controles de Filtro e Ordenação */}
      <Card className="mb-8 p-4 md:p-6 bg-gray-50 shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="category-filter" className="text-sm font-medium text-gray-700">{t('filterSort.filterBy')} {t('newsCard.categoryLabel')}</Label>
            <Select value={categoryFilter} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category-filter" className="w-full mt-1">
                <SelectValue placeholder={t('filterSort.allCategories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('filterSort.allCategories')}</SelectItem>
                {categorySelectOptions}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-order" className="text-sm font-medium text-gray-700">{t('filterSort.sortBy')}</Label>
            <Select value={`${currentSort.field}-${currentSort.order}`} onValueChange={handleSortChange}>
              <SelectTrigger id="sort-order" className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortSelectOptions}
              </SelectContent>
            </Select>
          </div>
          <div className="md:self-end">
            <Button onClick={clearFilters} variant="outline" className="w-full">
              <ListRestart size={16} className="mr-2"/>
              {t('filterSort.clearFilters')}
            </Button>
          </div>
        </div>
      </Card>

      {!isError && !isLoading && newsArticles && newsArticles.length === 0 && (
        <div className="text-center py-16">
            <AlertTriangle size={64} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{t('newsPage.noNewsTitle')}</h2>
            <p className="text-gray-500">{t('newsPage.noNewsSubtitle')}</p>
        </div>
      )}

      {newsArticles && newsArticles.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article: I18nNewsArticleData) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
          {totalPages && totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={totalCount || 0}
            />
          )}
        </>
      )}
      {isLoading && newsArticles && newsArticles.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg text-sm">
          {t('Loading...')}
        </div>
      )}
    </div>
  );
};

export default NewsPage; 