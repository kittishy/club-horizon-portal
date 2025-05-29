import React, { useState, useMemo } from 'react';
import { useNewsData, NewsSortOptions } from '@/hooks/useNewsData';
import { I18nNewsArticleData } from '@/types'; // Importar de @/types
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, Tag, AlertTriangle, ExternalLink, Filter, ListRestart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PageLoader from '@/components/PageLoader'; // Para o estado de carregamento
import PaginationControls from '@/components/ui/PaginationControls'; // Importar PaginationControls
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Importar Select
import { Label } from "@/components/ui/label"; // Importar Label

// A interface I18nNewsArticleData foi movida para @/types
// Esta seção pode ser removida.

interface NewsCardProps {
  article: I18nNewsArticleData; // Usar o tipo importado
  formatDate: (dateString: string) => string;
}

const NewsCard: React.FC<NewsCardProps> = React.memo(({ article, formatDate }) => {
  const { t } = useTranslation();

  return (
    <Card id={`news-${article.id}`} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/noticias/${article.id}`} className="block hover:opacity-90 transition-opacity">
        <LazyLoadImage 
          alt={t(article.titleKey)} 
          src={article.imageUrl || '/placeholder-news.jpg'} 
          effect="blur"
          className="w-full h-56 object-cover" 
          placeholderSrc="/placeholder-news-small.jpg" // Idealmente uma imagem placeholder pequena
        />
      </Link>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-blue-700">
          <Link to={`/noticias/${article.id}`} className="hover:text-blue-800 transition-colors">
            {t(article.titleKey)}
          </Link>
        </CardTitle>
        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
          <div className="flex items-center">
            <CalendarDays size={14} className="mr-1" />
            {/* Usar a chave consolidada home.publishedOn */}
            <span>{t('home.publishedOn', { date: formatDate(article.date) })}</span>
          </div>
          <div className="flex items-center">
            <Tag size={14} className="mr-1" />
            <span>{t('newsCard.categoryLabel')}{t(article.categoryKey)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 text-sm leading-relaxed">{t(article.summaryKey)}</p>
      </CardContent>
      <CardFooter className="pt-3 pb-4 bg-gray-50">
        <Button asChild variant="link" className="text-blue-600 hover:text-blue-700 px-0">
           <Link to={`/noticias/${article.id}`} className="flex items-center">
            {t('newsCard.readFullArticle')}
            <ExternalLink size={16} className="ml-1.5" />
          </Link>
        </Button>
      </CardFooter>
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

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString(i18n.language, {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

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
              <NewsCard key={article.id} article={article} formatDate={formatDate} />
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