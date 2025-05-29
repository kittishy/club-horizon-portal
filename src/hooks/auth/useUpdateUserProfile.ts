import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { UserData } from '@/types';
import { EditProfileFormData } from '@/lib/validators';

// Simula uma chamada de API para atualizar o perfil do usuário
// Em um cenário real, isso faria uma requisição PUT ou PATCH para /api/users/:userId ou /api/profile
const updateUserProfile = async (userId: string, data: EditProfileFormData): Promise<UserData> => {
  // Simulação: Buscar o usuário e "atualizá-lo"
  // json-server não suporta PATCH em um item específico de forma simples sem custom routes.
  // Para simular, vamos buscar todos, encontrar, modificar e "salvar" (apenas na memória do client)
  // Uma API real faria a atualização no banco de dados.

  const response = await fetch(`http://localhost:3001/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user for update');
  }
  const currentUserData: UserData = await response.json();

  // Atualiza os campos permitidos
  const updatedUserData: UserData = {
    ...currentUserData,
    name: data.name, // Atualiza o nome
    // Outros campos poderiam ser atualizados aqui
  };

  // Simula a requisição PATCH/PUT
  const updateResponse = await fetch(`http://localhost:3001/users/${userId}`, {
    method: 'PUT', // ou PATCH
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData),
  });

  if (!updateResponse.ok) {
    throw new Error('Failed to update user profile on the server');
  }

  return await updateResponse.json();
};

export const useUpdateUserProfile = () => {
  const { currentUser, setCurrentUser } = useAuth();

  return useMutation<UserData, Error, EditProfileFormData>(
    {
      mutationFn: async (data: EditProfileFormData) => {
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
        return updateUserProfile(currentUser.id, data);
      },
      onSuccess: (updatedUser) => {
        setCurrentUser(updatedUser); // Atualiza o usuário no AuthContext
        // Idealmente, o queryClient.invalidateQueries(['userData', currentUser?.id]) se estivéssemos buscando dados do perfil com useQuery
      },
      onError: (error) => {
        console.error('Profile update failed:', error);
        // Toast de erro será tratado na UI
      },
    }
  );
}; 