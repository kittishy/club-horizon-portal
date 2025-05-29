import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { UserData } from '@/types';

// Simula uma chamada de API para login
// Em um cenário real, isso faria uma requisição POST para /api/login
// com email e senha, e receberia dados do usuário ou um erro.
const loginUser = async (credentials: Pick<UserData, 'email'> & { password: string }): Promise<UserData> => {
  // Simulação: Buscar todos os usuários e encontrar uma correspondência
  const response = await fetch('http://localhost:3001/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users for login simulation');
  }
  const users: (UserData & { password?: string })[] = await response.json();
  
  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (user) {
    // Remover a senha antes de retornar os dados do usuário
    const { password, ...userDataToReturn } = user;
    return userDataToReturn as UserData; 
  }
  throw new Error('Invalid email or password');
};

export const useLogin = () => {
  const { setCurrentUser } = useAuth();

  return useMutation<UserData, Error, Pick<UserData, 'email'> & { password: string }>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setCurrentUser(data); // Define o usuário no contexto após o login bem-sucedido
      // Poderia adicionar navegação aqui, e.g., para a página inicial ou perfil
    },
    onError: (error) => {
      setCurrentUser(null); // Limpa o usuário em caso de erro
      console.error('Login failed:', error);
      // Aqui você pode querer mostrar uma notificação de erro para o usuário
    },
  });
}; 