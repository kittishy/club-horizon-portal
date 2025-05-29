import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      {/* Você pode adicionar uma mensagem de texto aqui se desejar, como "Carregando Página..." */}
      {/* Para traduzir, seria necessário passar a função 't' ou usar useTranslation aqui */}
    </div>
  );
};

export default PageLoader; 