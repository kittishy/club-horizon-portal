import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { ShieldAlert } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();

  // Adicionar chaves de tradução para esta página se necessário
  // ex: t('adminDashboard.title'), t('adminDashboard.welcome')

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-red-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <ShieldAlert size={32} />
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold">Admin Dashboard</CardTitle>
              <CardDescription className="text-red-100">Restricted Access Area</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg">
            Welcome to the Admin Dashboard, {t('currentUser.name', { ns: 'translation', defaultValue: 'Admin' })}!
          </p>
          <p className="mt-2 text-gray-600">
            This area is for administrative purposes only. Here you would typically find tools to manage users, content, and application settings.
          </p>
          {/* Conteúdo do dashboard admin aqui */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage; 