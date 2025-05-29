import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageLoader from './PageLoader'; 
import { toast } from 'sonner';
import { i18n } from 'i18next';

const getI18nInstance = (): typeof i18n => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const i18nInstance = require('@/i18n').default;
  return i18nInstance;
}

const AdminRoute: React.FC = () => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  const i18nInstance = getI18nInstance();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!currentUser) {
    // Não deveria acontecer se AdminRoute for usado dentro de um ProtectedRoute geral ou Layout que já lida com isso,
    // mas como uma proteção dupla.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (currentUser.role !== 'admin') {
    toast.error(i18nInstance.t('auth.notAuthorizedErrorTitle'), {
      description: i18nInstance.t('auth.notAuthorizedErrorDescription'),
    });
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute; 