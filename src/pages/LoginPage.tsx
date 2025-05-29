import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { AlertCircle, LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: login, isLoading, isError, error, isSuccess } = useLogin();
  const { currentUser, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Se já estiver logado e o estado de autenticação não estiver carregando, redireciona para home
    if (!authLoading && currentUser) {
      navigate('/');
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (isSuccess && currentUser) {
      // Navega para a home após login bem sucedido, pode ser para o perfil ou dashboard
      navigate('/');
    }
  }, [isSuccess, currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  // Não renderiza o formulário se o usuário já estiver logado e a autenticação carregada
  if (authLoading || currentUser) {
    return null; // Ou um loader, ou redirecionamento direto
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-blue-600 mb-2" />
          <CardTitle className="text-3xl font-bold text-gray-800">{t('auth.loginTitle')}</CardTitle>
          <CardDescription>{t('home.welcome')}</CardDescription> 
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {isError && error && (
              <div className="flex items-center text-sm text-red-600 bg-red-100 p-3 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{t('auth.loginError')} {error instanceof Error ? `(${error.message})` : ''}</span>
              </div>
            )}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" disabled={isLoading}>
              {isLoading ? t('Loading...') : t('auth.loginButton')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-6">
          <p className="text-sm text-gray-600">
            {t('auth.dontHaveAccount')}{' '}
            <Link to="/registro" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
              {t('auth.registerTitle')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage; 