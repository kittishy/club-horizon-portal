import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '@/hooks/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { AlertCircle, LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginFormData } from '@/lib/validators';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: loginUser, isLoading, isError, error: apiError, isSuccess, reset } = useLogin();
  const { currentUser, isLoading: authLoading } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, authLoading, navigate, from]);

  useEffect(() => {
    if (isSuccess && currentUser) {
      toast.success(t('auth.loginSuccess'));
      navigate(from, { replace: true });
    }
    if (isError && apiError) {
        const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error';
        toast.error(t('auth.loginError'), {
            description: t(errorMessage) || errorMessage,
        });
        reset();
    }
  }, [isSuccess, currentUser, navigate, from, isError, apiError, t, reset]);

  const onSubmit = (data: LoginFormData) => {
    loginUser(data);
  };

  if (authLoading || currentUser) {
    return null; 
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
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
            <div className="space-y-2">
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