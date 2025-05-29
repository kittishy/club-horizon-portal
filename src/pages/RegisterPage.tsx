import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '@/hooks/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { AlertCircle, UserPlus } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: register, isLoading, isError, error, isSuccess } = useRegister();
  const { currentUser, isLoading: authLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    // Se já estiver logado, redireciona para home
    if (!authLoading && currentUser) {
      navigate('/');
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (isSuccess) {
      // Após registro bem-sucedido, mostra mensagem e redireciona para login
      // Poderia adicionar um toast aqui
      alert(t('auth.registrationSuccess')); 
      navigate('/login');
    }
  }, [isSuccess, navigate, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Limpa erros anteriores
    if (password !== confirmPassword) {
      setFormError(t('auth.passwordMismatch'));
      return;
    }
    register({ name, email, password });
  };

  // Não renderiza o formulário se o usuário já estiver logado
  if (authLoading || currentUser) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-blue-600 mb-2" />
          <CardTitle className="text-3xl font-bold text-gray-800">{t('auth.registerTitle')}</CardTitle>
          <CardDescription>{t('home.joinUsLink')}</CardDescription> 
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t('contactPage.form.nameLabel')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t('contactPage.form.namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t('auth.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">{t('auth.confirmPasswordLabel')}</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder={t('auth.confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            {(isError && error || formError) && (
              <div className="flex items-center text-sm text-red-600 bg-red-100 p-3 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>
                  {formError ? formError : t('auth.registrationError')}
                  {isError && error instanceof Error ? ` (${error.message})` : ''}
                </span>
              </div>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5" disabled={isLoading}>
              {isLoading ? t('Loading...') : t('auth.registerButton')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-6">
          <p className="text-sm text-gray-600">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
              {t('auth.loginTitle')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage; 