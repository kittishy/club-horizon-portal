import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '@/hooks/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterFormData } from '@/lib/validators';
import { toast } from 'sonner';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: registerUser, isLoading, isError, error: apiError, isSuccess, reset } = useRegister();
  const { currentUser, isLoading: authLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate('/');
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('auth.registrationSuccess'));
      navigate('/login');
    }
    if (isError && apiError) {
      const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error';
      // Se for um erro de email já em uso, podemos tentar traduzir a mensagem específica se existir
      // ou mostrar um erro genérico no campo de email.
      // Para simplificar, usaremos um toast geral.
      toast.error(t('auth.registrationError'), {
        description: t(errorMessage) || errorMessage, 
      });
      // Se o erro for sobre o email, você pode querer marcá-lo no formulário também:
      if (errorMessage.toLowerCase().includes('email')) {
        setError('email', { type: 'manual', message: t(errorMessage) || errorMessage });
      }
      reset();
    }
  }, [isSuccess, navigate, t, isError, apiError, reset, setError]);

  const onSubmit = (data: RegisterFormData) => {
    // A validação de confirmação de senha já é feita pelo Zod.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registrationData } = data;
    registerUser(registrationData);
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t('contactPage.form.nameLabel')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t('contactPage.form.namePlaceholder')}
                {...register('name')}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-600">{t(errors.name.message as string)}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t('auth.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                {...register('email')}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-600">{t(errors.email.message as string)}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.passwordPlaceholder')}
                {...register('password')}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-xs text-red-600">{t(errors.password.message as string)}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">{t('auth.confirmPasswordLabel')}</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder={t('auth.confirmPasswordPlaceholder')}
                {...register('confirmPassword')}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && <p className="text-xs text-red-600">{t(errors.confirmPassword.message as string)}</p>}
            </div>
            
            {/* Removido o display de erro da API/formulário daqui, pois será tratado pelo toast e erros de campo */}

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