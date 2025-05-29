import React, { useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Atualizar o schema Zod para usar as chaves de tradução para as mensagens de erro
const createContactSchema = (t: (key: string, options?: any) => string) => z.object({
  name: z.string().min(1, { message: t('validation.name.required') }),
  email: z.string().min(1, { message: t('validation.email.required') }).email({ message: t('validation.email.invalid') }),
  subject: z.string().min(1, { message: t('validation.subject.required') }),
  message: z.string().min(1, { message: t('validation.message.required') }).min(10, { message: t('validation.message.minLength', { count: 10 }) }),
});

type ContactFormInputs = z.infer<ReturnType<typeof createContactSchema>>;

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = useMemo(() => createContactSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur', // Mantém a validação onBlur
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = useCallback(async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);
    console.log('Dados do formulário:', data);
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simular sucesso ou erro aleatoriamente para teste
    if (Math.random() > 0.2) {
      setSubmissionStatus('success');
      reset(); // Limpa o formulário em caso de sucesso
    } else {
      setSubmissionStatus('error');
    }
    setIsSubmitting(false);
  }, [reset]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{t('contactPage.title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('contactPage.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Formulário de Contato */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-700 flex items-center">
              <Send size={24} className="mr-2" /> {t('contactPage.formTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label={t('contactPage.formTitle')}>
              <div>
                <Label htmlFor="name">{t('contactPage.form.nameLabel')}</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder={t('contactPage.form.namePlaceholder')}
                  {...register('name')} 
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p id="name-error" className="text-sm text-red-600 mt-1" role="alert">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">{t('contactPage.form.emailLabel')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={t('contactPage.form.emailPlaceholder')}
                  {...register('email')} 
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p id="email-error" className="text-sm text-red-600 mt-1" role="alert">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="subject">{t('contactPage.form.subjectLabel')}</Label>
                <Input 
                  id="subject" 
                  type="text" 
                  placeholder={t('contactPage.form.subjectPlaceholder')}
                  {...register('subject')} 
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && <p id="subject-error" className="text-sm text-red-600 mt-1" role="alert">{errors.subject.message}</p>}
              </div>

              <div>
                <Label htmlFor="message">{t('contactPage.form.messageLabel')}</Label>
                <Textarea 
                  id="message" 
                  placeholder={t('contactPage.form.messagePlaceholder')}
                  {...register('message')}
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && <p id="message-error" className="text-sm text-red-600 mt-1" role="alert">{errors.message.message}</p>}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? t('contactPage.form.submitting') : t('contactPage.form.submitButton')}
              </Button>

              {submissionStatus === 'success' && (
                <div className="flex items-center p-3 bg-green-100 text-green-700 rounded-md border border-green-300" role="alert">
                  <CheckCircle size={20} className="mr-2" />
                  <p>{t('contactPage.form.successMessage')}</p>
                </div>
              )}
              {submissionStatus === 'error' && (
                <div className="flex items-center p-3 bg-red-100 text-red-700 rounded-md border border-red-300" role="alert">
                  <AlertCircle size={20} className="mr-2" />
                  <p>{t('contactPage.form.errorMessage')}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Informações de Contato */}
        <div className="space-y-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-700 flex items-center">
                <Mail size={22} className="mr-2.5" /> {t('contactPage.infoTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-blue-500 flex-shrink-0" /> 
                <span>{t('contactPage.address')}</span>
              </p>
              <p className="flex items-center">
                <Phone size={20} className="mr-3 text-blue-500 flex-shrink-0" /> 
                <span>{t('contactPage.phone')}</span>
              </p>
              <p className="flex items-center">
                <Mail size={20} className="mr-3 text-blue-500 flex-shrink-0" /> 
                <span>{t('contactPage.email')}</span>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-700 flex items-center">
                    <Clock size={20} className="mr-2.5" /> {t('contactPage.openingHours')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-700">
                <p>{t('contactPage.hoursMonFri')}</p>
                <p>{t('contactPage.hoursSatSun')}</p>
            </CardContent>
          </Card>
          
          <div className="mt-8 rounded-lg overflow-hidden shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.297042593739!2d-40.3015079850458!3d-20.28881798636946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb81e259758a573%3A0x1c71799534a8b7ef!2sPraia%20de%20Camburi!5e0!3m2!1spt-BR!2sbr!4v1678886530000!5m2!1spt-BR!2sbr"
              width="100%"
              height="350"
              style={{ border:0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('contactPage.mapTitle')} // Título traduzido para acessibilidade
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 