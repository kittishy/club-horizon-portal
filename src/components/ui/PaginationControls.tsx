import React from 'react';
import { Button } from './button'; // Ajuste o caminho conforme sua estrutura
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number; // Adicionado para cálculos, se necessário no futuro
  totalItems: number; // Adicionado para exibir informações como "Mostrando X-Y de Z"
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  // itemsPerPage, 
  // totalItems 
}) => {
  const { t } = useTranslation();

  if (totalPages <= 1) {
    return null; // Não renderiza controles se houver 1 página ou menos
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Lógica para gerar números de página (simplificado por enquanto)
  // Idealmente, isso seria mais complexo para mostrar "..." para muitas páginas
  const pageNumbers = [];
  const maxPagesToShow = 5; // Máximo de botões de número de página visíveis
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow && totalPages >= maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label={t('pagination.previous')}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        {t('pagination.previous')}
      </Button>

      {startPage > 1 && (
        <Button variant="outline" size="sm" onClick={() => onPageChange(1)} aria-label={t('pagination.goToPage', {pageNumber: 1})}>1</Button>
      )}
      {startPage > 2 && <span className="text-gray-500">...</span>}

      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={currentPage === number ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(number)}
          aria-current={currentPage === number ? 'page' : undefined}
          aria-label={t('pagination.goToPage', {pageNumber: number})}
        >
          {number}
        </Button>
      ))}

      {endPage < totalPages -1 && <span className="text-gray-500">...</span>}
      {endPage < totalPages && (
          <Button variant="outline" size="sm" onClick={() => onPageChange(totalPages)} aria-label={t('pagination.goToPage', {pageNumber: totalPages})}>{totalPages}</Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label={t('pagination.next')}
      >
        {t('pagination.next')}
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
      <div className="text-sm text-gray-600 ml-4">
        {t('pagination.page', { currentPage, totalPages })}
      </div>
    </div>
  );
};

export default PaginationControls; 