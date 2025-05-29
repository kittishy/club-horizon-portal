import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { i18n } from 'i18next'; // Importar i18n para usar t diretamente se necessário, ou passar t

// Simula uma chamada de API para logout
// Em um cenário real, isso poderia invalidar um token no backend
const logoutUser = async (): Promise<void> => {
  // Simulação: não há muito o que fazer aqui para uma API mock simples
  // localStorage será limpo pelo AuthContext
  return Promise.resolve();
};

// Função para obter a tradução fora de um componente React
// Isso é uma forma de contornar, idealmente o toast seria chamado de um componente
// onde useTranslation está disponível, ou o hook useLogout seria modificado para aceitar t.
// Para simplificar agora, vamos assumir que i18n já está inicializado.
const getI18nInstance = (): typeof i18n => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const i18nInstance = require('@/i18n').default; 
  return i18nInstance;
}

export const useLogout = () => {
  const { setCurrentUser } = useAuth();
  const i18nInstance = getI18nInstance();

  const logout = async () => {
    try {
      await logoutUser(); 
      setCurrentUser(null); 
      toast.success(i18nInstance.t('auth.logoutSuccess')); // Adicionar toast de sucesso
      // A navegação é feita no Navbar após chamar logout
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(i18nInstance.t('auth.logoutError')); // Adicionar toast de erro
    }
  };

  return { logout }; 
  // Retornamos a função diretamente, pois o logout geralmente não tem estados de loading/error complexos
  // que precisem do useMutation, mas pode ser adaptado se necessário.
}; 