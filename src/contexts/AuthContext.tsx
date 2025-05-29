import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserData } from '@/types';

interface AuthContextType {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;
  isLoading: boolean;
  // Em uma aplicação real, teríamos funções de login, logout, register aqui
  // que interagiriam com um backend.
  // Por enquanto, setCurrentUser será usado diretamente pelos hooks de "API".
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    // Tenta carregar o usuário do localStorage ao iniciar
    const storedUser = localStorage.getItem('currentUser');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true); // Simular carregamento inicial

  useEffect(() => {
    // Salva o usuário no localStorage sempre que ele mudar
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
    setIsLoading(false); // Define isLoading para false após a tentativa inicial de carregar o usuário
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 