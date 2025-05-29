import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { UserCircle, Mail, ShieldCheck, Calendar as CalendarIcon, Edit3, XCircle } from 'lucide-react';
import PageLoader from '@/components/PageLoader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditProfileSchema, EditProfileFormData } from '@/lib/validators';
import { useUpdateUserProfile } from '@/hooks/auth';
import { toast } from 'sonner';
import { formatDateForLocale } from '@/lib/dateUtils';
import i18n from '@/i18n';

const UserProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, isLoading: authLoading, setCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const { 
    mutate: updateUser, 
    isLoading: isUpdating, 
    isSuccess: updateSuccess, 
    isError: updateError,
    error: apiUpdateError,
    reset: resetMutation
  } = useUpdateUserProfile();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    setValue,
    formState: { errors, isDirty },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: currentUser?.name || '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name);
    }
  }, [currentUser, setValue]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success(t('userProfile.edit.success'));
      setIsEditing(false);
      resetMutation(); 
    }
    if (updateError && apiUpdateError) {
      const errorMessage = apiUpdateError instanceof Error ? apiUpdateError.message : 'Unknown error';
      toast.error(t('userProfile.edit.error'), {
        description: t(errorMessage) || errorMessage,
      });
      resetMutation();
    }
  }, [updateSuccess, updateError, apiUpdateError, t, resetMutation]);

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

  const onSubmit = (data: EditProfileFormData) => {
    updateUser(data);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      resetForm({ name: currentUser.name }); // Reseta para os valores atuais se cancelar
    }
    setIsEditing(!isEditing);
  };
  
  // Campos adicionais simulados (em uma app real, viriam do UserData)
  // const memberSince = '2023-01-15'; // Removido, usaremos registrationDate
  const userRoleKey = currentUser.role === 'admin' ? 'userRole.admin' : 'userRole.member'; 

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-gray-50 p-6 rounded-t-lg flex flex-row justify-between items-start">
          <div className="flex items-center space-x-4">
            <UserCircle className="h-16 w-16 text-blue-600" />
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                {isEditing ? t('userProfile.edit.title') : currentUser.name}
              </CardTitle>
              <CardDescription className="text-gray-600 text-md">
                {isEditing ? t('auth.emailLabel') + ': ' + currentUser.email : t('auth.myProfile')}
              </CardDescription>
            </div>
          </div>
          <Button onClick={handleEditToggle} variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
            {isEditing ? <XCircle size={20} /> : <Edit3 size={20} />}
            <span className="sr-only">{isEditing ? t('userProfile.edit.cancelButton') : t('userProfile.edit.button')}</span>
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t('contactPage.form.nameLabel')}</Label>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-xs text-red-600">{t(errors.name.message as string)}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentUser.email}
                  readOnly
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">O email não pode ser alterado no momento.</p>
              </div>
              <CardFooter className="px-0 pt-4 flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={handleEditToggle} disabled={isUpdating}>
                  {t('userProfile.edit.cancelButton')}
                </Button>
                <Button type="submit" disabled={isUpdating || !isDirty} className="bg-blue-600 hover:bg-blue-700">
                  {isUpdating ? t('Loading...') : t('userProfile.edit.saveButton')}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
                {t('userProfile.personalInfo')}
              </h3>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-500" />
                <span className="text-gray-700">{currentUser.email}</span>
              </div>
              {currentUser.memberId && (
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-3 text-gray-500" /> {/* Pode trocar o ícone se quiser */} 
                  <span className="text-gray-700">{t('userProfile.memberIdLabel')} {currentUser.memberId}</span>
                </div>
              )}
              {currentUser.registrationDate && (
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-3 text-gray-500" />
                  <span className="text-gray-700">{t('userProfile.registrationDateLabel')} {formatDateForLocale(currentUser.registrationDate, i18n)}</span>
                </div>
              )}
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-3 text-gray-500" />
                <span className="text-gray-700">{t('userProfile.accountType', { type: t(userRoleKey) })}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage; 