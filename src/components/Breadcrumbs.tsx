import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, HomeIcon } from 'lucide-react';

interface Breadcrumb {
  path: string;
  label: string;
  isCurrent: boolean;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: Breadcrumb[] = [];

  // Adiciona o link da Home sempre
  breadcrumbs.push({
    path: '/',
    label: t('Home'), // Reutiliza a chave de tradução existente para Home
    isCurrent: location.pathname === '/',
  });

  let currentPath = '';
  pathnames.forEach((name, index) => {
    currentPath += `/${name}`;
    const isCurrent = index === pathnames.length - 1;
    let label = name.charAt(0).toUpperCase() + name.slice(1);

    // Lógica para traduzir segmentos específicos ou usar nomes de IDs
    if (name === 'eventos') {
      label = t('Eventos');
    } else if (name === 'noticias') {
      label = t('Notícias');
    } else if (name === 'calendario') {
      label = t('Calendário');
    } else if (name === 'contato') {
      label = t('Contatos');
    }
    // Para IDs (ex: /noticias/:newsId), podemos querer mostrar algo mais amigável
    // Por enquanto, vamos manter o ID ou uma label genérica. 
    // Isso pode ser expandido para buscar o título do item se necessário.
    else if (pathnames[index-1] === 'noticias' && !isCurrent) {
      // Se for um ID de notícia e não for a página atual, manter o path para o link
      // mas o label será o ID. Idealmente, buscaríamos o título aqui.
      label = t('breadcrumb.newsDetail', { newsId: name });
    } else if (pathnames[index-1] === 'eventos' && !isCurrent) {
      label = t('breadcrumb.eventDetail', { eventId: name });
    } 
    // Se for a página atual de detalhe, o título da página já exibe o nome do item.
    // Poderíamos mostrar "Detalhes" ou o ID.
     else if (pathnames[index-1] === 'noticias' && isCurrent) {
      label = t('breadcrumb.detail');
    } else if (pathnames[index-1] === 'eventos' && isCurrent) {
      label = t('breadcrumb.detail');
    }

    breadcrumbs.push({
      path: currentPath,
      label,
      isCurrent,
    });
  });

  // Não renderiza breadcrumbs se estiver na home ou se houver apenas um item (Home)
  if (breadcrumbs.length <= 1 && location.pathname === '/') {
      return null;
  }

  return (
    <nav aria-label="breadcrumb" className="container mx-auto px-4 pt-5 pb-3 text-sm text-gray-600">
      <ol className="flex items-center space-x-1.5">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index === 0 && <HomeIcon size={16} className="mr-1.5 text-gray-500" />}
            {crumb.isCurrent ? (
              <span className="font-medium text-gray-800" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.path} className="hover:text-blue-600 hover:underline transition-colors">
                {crumb.label}
              </Link>
            )}
            {!crumb.isCurrent && index < breadcrumbs.length -1 && (
              <ChevronRight size={16} className="ml-1.5 text-gray-400" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 