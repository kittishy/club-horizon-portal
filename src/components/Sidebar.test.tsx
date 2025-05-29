import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Sidebar from './Sidebar';

// Minimal i18n instance for testing
const i18nTestInstance = i18n.createInstance();
i18nTestInstance.use(initReactI18next).init({
  lng: 'pt',
  fallbackLng: 'pt',
  ns: ['common', 'sidebar'], // Namespaces used in Sidebar
  defaultNS: 'common',
  resources: {
    pt: {
      sidebar: {
        clubStatsTitle: 'Clube em Números',
        quickActionsTitle: 'Acesso Rápido',
        partnerSites: 'Sites Parceiros',
        socialMedia: 'Redes Sociais',
        usefulInfo: 'Informações Úteis',
        newsletterTitle: 'Fique por Dentro!',
        newsletterSubtitle: 'Receba novidades e eventos.',
        newsletterButton: 'Inscrever-se',
        // Add other keys used in Sidebar if necessary for tests
        statsMembers: 'Membros Ativos',
        statsEvents: 'Eventos/Mês',
        statsHistory: 'Anos de História',
        actionEvents: "Próximos Eventos",
        actionNews: "Últimas Notícias",
        actionContact: "Entre em Contato",
        partnerExample1: "Clube dos Livros",
        partnerExample2: "Associação Cultural",
        partnerExample3: "Centro Esportivo",
        infoHoursTitle: "Horário de Funcionamento",
        infoHoursContent: "Seg-Sex: 8h-18h\nSáb: 8h-12h",
        infoPhoneTitle: "Telefone da Secretaria",
        infoPhoneContent: "(27) 3333-4444",
        infoAddressTitle: "Endereço",
        infoAddressContent: "Rua Alegria, 123\nCidade Feliz - ES",
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

describe('Sidebar Component', () => {
  it('renders the main aside landmark', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Sidebar />
        </I18nextProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('complementary')).toBeInTheDocument(); // <aside> has 'complementary' role
  });

  it('renders a static title like "Clube em Números"', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Sidebar />
        </I18nextProvider>
      </BrowserRouter>
    );
    // Using a regex to be flexible, or use the exact translated string
    expect(screen.getByText(i18nTestInstance.t('sidebar.clubStatsTitle'))).toBeInTheDocument();
  });

  it('renders "Acesso Rápido" title', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Sidebar />
        </I18nextProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(i18nTestInstance.t('sidebar.quickActionsTitle'))).toBeInTheDocument();
  });
});
