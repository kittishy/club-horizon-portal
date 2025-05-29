import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Footer from './Footer';

// Minimal i18n instance for testing
const i18nTestInstance = i18n.createInstance();
i18nTestInstance.use(initReactI18next).init({
  lng: 'pt',
  fallbackLng: 'pt',
  ns: ['common', 'footer'], // Namespaces used in Footer
  defaultNS: 'common',
  resources: {
    pt: {
      footer: {
        clubName: 'Clube Harmonia',
        clubSubtitle: 'Conectando pessoas',
        clubDescription: 'Conectando pessoas através de experiências únicas há mais de 50 anos. Somos uma comunidade dedicada ao crescimento pessoal, networking e desenvolvimento de relacionamentos significativos.',
        madeWith: 'Feito com',
        forCommunity: 'para nossa comunidade',
        quickLinksTitle: 'Links Rápidos',
        links: {
            events: 'Eventos',
            calendar: 'Calendário',
            news: 'Notícias',
            contact: 'Contatos',
        },
        contactTitle: 'Contato',
        addressLine1: 'Rua Alegria, 123',
        addressLine2: 'Cidade Feliz - ES, 29000-000',
        phoneNumber: '(27) 3333-4444',
        phoneValue: '+552733334444',
        emailAddress: 'contato@clubeharmonia.com.br',
        emailValue: 'contato@clubeharmonia.com.br',
        followUs: 'Siga-nos',
        allRightsReserved: 'Todos os direitos reservados.',
        languageLabel: 'Idioma:',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

describe('Footer Component', () => {
  it('renders the main footer landmark', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Footer />
        </I18nextProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // <footer> has 'contentinfo' role
  });

  it('renders the copyright text', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Footer />
        </I18nextProvider>
      </BrowserRouter>
    );
    // Example: "© 2024 Clube Harmonia. Todos os direitos reservados."
    // We can check for a part of it.
    const currentYear = new Date().getFullYear();
    const expectedText = `© ${currentYear} ${i18nTestInstance.t('footer.clubName')}. ${i18nTestInstance.t('footer.allRightsReserved')}`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('renders a quick link like "Eventos"', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Footer />
        </I18nextProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: i18nTestInstance.t('footer.links.events') })).toBeInTheDocument();
  });
});
