import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserData } from '@/types';

interface AuthContextType {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;
  isLoading: boolean; // Mantido true até a "verificação inicial" ser concluída
  // Em uma aplicação real, teríamos funções de login, logout, register aqui
  // que interagiriam com um backend.
  // Por enquanto, setCurrentUser será usado diretamente pelos hooks de "API".
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Começa como true

  useEffect(() => {
    // 1. Tenta carregar o usuário do localStorage
    const storedUser = localStorage.getItem('currentUser');
    let userFromStorage: UserData | null = null;
    try {
      userFromStorage = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser'); // Limpa se estiver corrompido
    }
    
    // Simula uma pequena verificação inicial (ex: validar token, buscar dados frescos)
    // Em um app real, isso poderia ser uma chamada de API silenciosa.
    const timer = setTimeout(() => {
      setCurrentUser(userFromStorage);
      setIsLoading(false); // Define isLoading para false APÓS a verificação e definição do usuário
    }, 500); // Meio segundo de simulação

    return () => clearTimeout(timer);
  }, []); // Executa apenas uma vez na montagem

  useEffect(() => {
    // 2. Salva o usuário no localStorage sempre que ele mudar (APÓS o carregamento inicial)
    if (!isLoading) { // Só salva se não estiver no processo de carregamento inicial
      if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('currentUser');
      }
    }
  }, [currentUser, isLoading]);

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