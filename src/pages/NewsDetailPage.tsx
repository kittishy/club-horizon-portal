import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CalendarDays, Tag, ArrowLeft } from 'lucide-react';
import PageLoader from '@/components/PageLoader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { I18nNewsArticleData } from '@/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNewsDetailData } from '@/hooks/useNewsDetailData.tsx';

const NewsDetailPage: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { article, isLoading, isError, error } = useNewsDetailData(newsId);

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !article) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center min-h-[calc(100vh-200px)]">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-700 mb-2">
          {isError ? t('error.genericTitle') : t('newsDetailPage.notFoundTitle')}
        </h2>
        <p className="text-red-600">
          {isError ? t('error.fetchDataError') : t('newsDetailPage.notFoundText')}
        </p>
        {error && <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>}
      </div>
    );
  }

  const fullContentHtml = t(article.fullContentKey || 'newsDetailPage.contentUnavailable');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)} 
        className="mb-6 group flex items-center"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
        {t('navigation.goBackButton')}
      </Button>
      <Card className="overflow-hidden shadow-lg">
        {article.imageUrl && (
          <LazyLoadImage
            alt={t(article.titleKey)}
            src={article.imageUrl}
            effect="blur"
            className="w-full h-64 md:h-96 object-cover"
            placeholderSrc="/placeholder-news-small.jpg"
          />
        )}
        <CardHeader className="pt-6">
          <CardTitle className="text-3xl md:text-4xl font-bold text-gray-800">
            {t(article.titleKey)}
          </CardTitle>
          <div className="flex flex-wrap items-center text-sm text-gray-500 mt-3 space-x-4">
            <div className="flex items-center">
              <CalendarDays size={16} className="mr-1.5" />
              {formatDate(article.date)}
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-1.5" />
              <Badge variant="outline">{t(article.categoryKey)}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-6 prose lg:prose-xl max-w-none">
          <div dangerouslySetInnerHTML={{ __html: fullContentHtml }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsDetailPage; 