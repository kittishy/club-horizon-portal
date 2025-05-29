import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, HomeIcon } from "lucide-react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-20">
      <AlertTriangle className="w-24 h-24 text-yellow-500 mb-8" />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        Página Não Encontrada
      </h2>
      <p className="text-lg text-gray-600 mb-10 max-w-md">
        Oops! A página que você está procurando não existe ou foi movida.
        Verifique o endereço digitado ou retorne à página inicial.
      </p>
      <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
        <Link to="/">
          <HomeIcon size={20} className="mr-2" />
          Voltar para a Página Inicial
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
