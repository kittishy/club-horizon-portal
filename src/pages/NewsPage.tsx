import React, { useState } from 'react';
import { useNewsData } from '@/hooks/useNewsData';
import { I18nNewsArticleData } from '@/types'; // Importar de @/types
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, Tag, AlertTriangle, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PageLoader from '@/components/PageLoader'; // Para o estado de carregamento
import PaginationControls from '@/components/ui/PaginationControls'; // Importar PaginationControls

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

const NewsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const { newsArticles, totalCount, totalPages, isLoading, isError, error } = useNewsData(currentPage, ITEMS_PER_PAGE);

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Rola para o topo ao mudar de página
  };

  if (isLoading && !newsArticles) { // Mostrar loader apenas no carregamento inicial ou se não houver dados prévios
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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{t('newsPage.title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('newsPage.subtitle')}</p>
      </div>

      {isError && (
         <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold text-red-700 mb-2">{t('error.genericTitle')}</h2>
            <p className="text-red-600">{t('error.fetchDataError')}</p>
            {error && <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>}
        </div>
      )}

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
              itemsPerPage={ITEMS_PER_PAGE} // Passando para o componente, embora não usado ativamente por ele ainda
              totalItems={totalCount || 0} // Passando para o componente
            />
          )}
        </>
      )}
      {/* Adicionar um loader sutil para transições de página se keepPreviousData estiver funcionando */}
      {isLoading && newsArticles && newsArticles.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg text-sm">
          {t('Loading...')} {/* Adicionar esta chave de tradução se necessário */}
        </div>
      )}
    </div>
  );
};

export default NewsPage; 