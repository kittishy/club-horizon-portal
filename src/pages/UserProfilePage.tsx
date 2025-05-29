import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { UserCircle, Mail, ShieldCheck, Calendar as CalendarIcon } from 'lucide-react';
import PageLoader from '@/components/PageLoader'; // Para o caso de carregamento do auth

const UserProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, isLoading: authLoading } = useAuth();

  if (authLoading) {
    return <PageLoader />;
  }

  if (!currentUser) {
    // Isso não deve acontecer se a rota estiver protegida corretamente,
    // mas é uma salvaguarda.
    // O ProtectedRoute já deve redirecionar para /login.
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>{t('auth.notLoggedIn')}</p>
      </div>
    );
  }

  // Campos adicionais simulados (em uma app real, viriam do UserData)
  const memberSince = '2023-01-15'; // Exemplo
  const userRole = 'Membro Associado'; // Exemplo

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-gray-50 p-6 rounded-t-lg">
          <div className="flex items-center space-x-4">
            <UserCircle className="h-16 w-16 text-blue-600" />
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800">{currentUser.name}</CardTitle>
              <CardDescription className="text-gray-600 text-md">{t('auth.myProfile')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Informações Pessoais</h3>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-gray-500" />
              <span className="text-gray-700">{currentUser.email}</span>
            </div>
            {/* Adicionar mais campos conforme necessário */}
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span className="text-gray-700">Membro desde: {formatDate(memberSince)}</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-3 text-gray-500" />
              <span className="text-gray-700">Tipo de Conta: {userRole}</span>
            </div>
          </div>

          {/* Seção de Edição (a ser implementada no futuro) */}
          {/* 
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Editar Informações</h3>
            <p className="text-sm text-gray-500">Funcionalidade de edição em breve.</p>
            <Button variant="outline">Editar Perfil</Button>
          </div> 
          */}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage; 