import { useAuth } from '@/contexts/AuthContext';

// Simula uma chamada de API para logout
// Em um cenário real, isso poderia invalidar um token no backend
const logoutUser = async (): Promise<void> => {
  // Simulação: não há muito o que fazer aqui para uma API mock simples
  // localStorage será limpo pelo AuthContext
  return Promise.resolve();
};

export const useLogout = () => {
  const { setCurrentUser } = useAuth();

  const logout = async () => {
    try {
      await logoutUser(); // Chama a função de logout simulada (pode ser omitida se não fizer nada)
      setCurrentUser(null); // Remove o usuário do contexto e localStorage
      // Poderia adicionar navegação aqui, e.g., para a página de login ou inicial
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      // Mostrar notificação de erro, embora para logout seja menos comum falhar criticamente
    }
  };

  return { logout }; 
  // Retornamos a função diretamente, pois o logout geralmente não tem estados de loading/error complexos
  // que precisem do useMutation, mas pode ser adaptado se necessário.
}; 