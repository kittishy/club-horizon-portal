import { useMutation } from '@tanstack/react-query';
import { UserData } from '@/types';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

// Simula uma chamada de API para registrar um novo usuário
// Em um cenário real, isso faria uma requisição POST para /api/register
const registerUser = async (userData: Omit<UserData, 'id'> & { password: string }): Promise<UserData> => {
  // Simulação: Verificar se o email já existe
  const emailCheckResponse = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(userData.email)}`);
  if (!emailCheckResponse.ok) {
    throw new Error('Failed to check email availability');
  }
  const existingUsers: UserData[] = await emailCheckResponse.json();
  if (existingUsers.length > 0) {
    throw new Error('Email already in use');
  }

  // Simulação: Adicionar o novo usuário ao db.json (isso não persistirá de verdade com json-server sem reiniciá-lo e modificar o arquivo diretamente)
  // Uma API real faria a inserção no banco de dados.
  const newUser: UserData & { password?: string } = {
    id: uuidv4(), // Gera um ID único
    name: userData.name,
    email: userData.email,
    password: userData.password, // A API real faria hash da senha aqui
  };

  // Simulação de POST para criar usuário
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  // Remover a senha antes de retornar os dados do usuário
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...registeredUserData } = await response.json(); 
  return registeredUserData as UserData;
};

export const useRegister = () => {
  // Não vamos logar o usuário automaticamente após o registro aqui,
  // apenas retornaremos o resultado da mutação.
  // O fluxo de login após registro pode ser tratado na UI.
  return useMutation<UserData, Error, Omit<UserData, 'id'> & { password: string }>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      // Poderia adicionar navegação aqui, e.g., para a página de login
      // ou mostrar uma mensagem de sucesso.
    },
    onError: (error) => {
      console.error('Registration failed:', error);
      // Mostrar notificação de erro para o usuário
    },
  });
}; 