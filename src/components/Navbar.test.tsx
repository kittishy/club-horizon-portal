import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Navbar from './Navbar';

// Minimal i18n instance for testing
const i18nTestInstance = i18n.createInstance();
i18nTestInstance.use(initReactI18next).init({
  lng: 'pt',
  fallbackLng: 'pt',
  ns: ['common', 'auth', 'adminNav'], // Namespaces used in Navbar
  defaultNS: 'common',
  resources: {
    pt: {
      common: {
        'Clube Harmonia': 'Clube Harmonia',
        'Home': 'Início', // Example, ensure this matches actual keys
        'Eventos': 'Eventos',
        'Calendário': 'Calendário',
        'Notícias': 'Notícias',
        'Contatos': 'Contatos',
      },
      auth: {
        loginButton: 'Login',
        registerButton: 'Registrar',
        userMenuMobile: 'Menu de {{name}}',
        welcomeUser: 'Bem-vindo, {{name}}!',
        myProfile: 'Meu Perfil',
        logoutButton: 'Sair',
      },
      adminNav: {
        dashboard: 'Painel Admin',
      }
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

// Mock useAuth
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({ currentUser: null, isLoading: false })),
}));

// Mock useLogout
vi.mock('@/hooks/auth', () => ({
  useLogout: vi.fn(() => ({ logout: vi.fn() })),
}));


describe('Navbar Component', () => {
  it('renders the main navigation landmark', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Navbar />
        </I18nextProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the club name/logo text', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Navbar />
        </I18nextProvider>
      </BrowserRouter>
    );
    // Using a regex to be flexible with how "Clube Harmonia" might be split or styled
    expect(screen.getByText(/Clube Harmonia/i)).toBeInTheDocument();
  });

  it('renders a navigation link like "Eventos"', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Navbar />
        </I18nextProvider>
      </BrowserRouter>
    );
    // This will check for the text "Eventos" within a link role
    // Ensure the key 'Eventos' in resources matches what navItemsData uses for t(item.name)
    expect(screen.getByRole('link', { name: /Eventos/i })).toBeInTheDocument();
  });

  it('renders login and register buttons when not authenticated', () => {
    // useAuth is already mocked to return currentUser: null
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Navbar />
        </I18nextProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Registrar/i })).toBeInTheDocument();
  });

  it('renders user menu when authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({ 
      currentUser: { id: '1', name: 'Usuário Teste', email: 'test@example.com', role: 'user' }, 
      isLoading: false 
    });
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Navbar />
        </I18nextProvider>
      </BrowserRouter>
    );
    // Check for text that appears when user is logged in, e.g., part of their name or welcome message
    expect(screen.getByText(/Usuário Teste/i)).toBeInTheDocument(); 
  });
});
