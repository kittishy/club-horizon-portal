import { useMutation } from '@tanstack/react-query';
import { ChangePasswordFormData } from '@/lib/validators';
import { UserData } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

// Simula uma chamada de API para alterar a senha
const changePasswordOnApi = async (data: ChangePasswordFormData, userId: string): Promise<{ success: boolean, messageKey?: string }> => {
  console.log('API call: changePassword', { userId, ...data });

  // Simulação de lógica de API
  // Em um backend real:
  // 1. Verificar se a currentPassword corresponde à senha do usuário (userId)
  // 2. Se sim, fazer hash da newPassword e atualizá-la no banco de dados.

  // Mock de verificação da senha atual (extremamente simplificado e inseguro)
  if (data.currentPassword === "senha123" || data.currentPassword === "adminseguro") { // Apenas para teste com usuários mock
    // Simular sucesso
    return new Promise(resolve => setTimeout(() => {
      resolve({ success: true });
    }, 1000));
  } else {
    // Simular erro de senha atual incorreta
    return new Promise(resolve => setTimeout(() => {
      resolve({ success: false, messageKey: 'apiError.changePassword.currentPasswordIncorrect' });
    }, 1000));
  }
  // Outros erros possíveis: falha de rede, erro no servidor genérico
  // throw new Error('apiError.changePassword.generic');
};

export const useChangePassword = () => {
  const { currentUser } = useAuth();

  return useMutation<
    { success: boolean, messageKey?: string }, // Tipo do retorno de sucesso da mutação
    Error, // Tipo do erro da mutação
    ChangePasswordFormData // Tipo dos dados de entrada para a mutação (payload)
  >({
    mutationFn: (data: ChangePasswordFormData) => {
      if (!currentUser) {
        return Promise.reject(new Error('apiError.profile.notAuthenticated')); // Reutilizar erro existente
      }
      return changePasswordOnApi(data, currentUser.id);
    },
    onSuccess: (response) => {
      if (response.success) {
        console.log('Password changed successfully on API');
        // Não é necessário atualizar o AuthContext aqui, pois a senha não é armazenada nele.
        // A UI (página) mostrará o toast de sucesso.
      } else {
        // Se success é false, mas a promise resolveu, o onError do useMutation não é chamado.
        // Lançamos um erro aqui para que onError seja acionado e o toast de erro possa usar a messageKey.
        throw new Error(response.messageKey || 'apiError.changePassword.generic');
      }
    },
    onError: (error) => {
      console.error('Change password mutation failed:', error);
      // O toast de erro será tratado na página usando a error.message (que será a messageKey)
    },
  });
}; 