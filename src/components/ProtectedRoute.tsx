import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageLoader from './PageLoader'; // Para exibir enquanto o estado de auth carrega

interface ProtectedRouteProps {
  // Você pode adicionar props aqui se precisar de lógicas de permissão baseadas em roles, etc.
  // Ex: allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Mostra um loader enquanto o estado de autenticação está sendo verificado
    return <PageLoader />;
  }

  if (!currentUser) {
    // Usuário não logado, redireciona para a página de login
    // Passa a localização atual para que o usuário possa ser redirecionado de volta após o login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Usuário logado, renderiza o conteúdo da rota protegida
  return <Outlet />;
};

export default ProtectedRoute; 