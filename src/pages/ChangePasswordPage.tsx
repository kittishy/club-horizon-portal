import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema, ChangePasswordFormData } from '@/lib/validators';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { LockKeyhole } from 'lucide-react';
import { useChangePassword } from '@/hooks/auth';

const ChangePasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { mutate: changePassword, isLoading, isError, error, isSuccess, reset: resetMutationState } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isDirty },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('changePassword.success'));
      resetForm();
      resetMutationState();
    }
    if (isError && error) {
      const errorMessage = error instanceof Error ? error.message : 'apiError.changePassword.generic';
      toast.error(t('changePassword.error'), {
        description: t(errorMessage) || errorMessage,
      });
      resetMutationState();
    }
  }, [isSuccess, isError, error, t, resetForm, resetMutationState]);

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword(data);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 flex justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="bg-gray-50 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <LockKeyhole className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">{t('changePassword.title')}</CardTitle>
              <CardDescription className="text-gray-600">{t('changePassword.subtitle', "Update your account password.")}</CardDescription> 
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{t('changePassword.currentPasswordLabel')}</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register('currentPassword')}
                placeholder={t('changePassword.currentPasswordPlaceholder')}
                className={errors.currentPassword ? "border-red-500" : ""}
              />
              {errors.currentPassword && <p className="text-xs text-red-600">{t(errors.currentPassword.message as string)}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">{t('changePassword.newPasswordLabel')}</Label>
              <Input
                id="newPassword"
                type="password"
                {...register('newPassword')}
                placeholder={t('changePassword.newPasswordPlaceholder')}
                className={errors.newPassword ? "border-red-500" : ""}
              />
              {errors.newPassword && <p className="text-xs text-red-600">{t(errors.newPassword.message as string)}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">{t('changePassword.confirmNewPasswordLabel')}</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                {...register('confirmNewPassword')}
                placeholder={t('changePassword.confirmNewPasswordPlaceholder')}
                className={errors.confirmNewPassword ? "border-red-500" : ""}
              />
              {errors.confirmNewPassword && <p className="text-xs text-red-600">{t(errors.confirmNewPassword.message as string)}</p>}
            </div>
            
            <CardFooter className="px-0 pt-4 flex justify-end">
              <Button type="submit" disabled={isLoading || !isDirty} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? t('Loading...') : t('changePassword.saveButton')}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordPage; 