import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Home from './Home'; // Adjust path if needed

// Minimal i18n instance for testing
const i18nTestInstance = i18n.createInstance();
i18nTestInstance.use(initReactI18next).init({
  lng: 'pt',
  fallbackLng: 'pt',
  ns: ['common', 'home', 'sidebar', 'error'], // Namespaces used in Home and its subcomponents
  defaultNS: 'common',
  resources: {
    pt: {
      home: {
        heroTitle: 'Bem-vindos ao Clube Harmonia Teste', // Ensure this key is used by HeroSection
        welcomeBadge: 'Bem-vindos ao Teste',
        heroSubtitle: 'Subtitle de teste',
        exploreEventsLink: 'Explorar Eventos',
        joinUsLink: 'Junte-se a Nós',
        featureCard1Title: "Comunidade",
        featureCard1Desc: "Descrição comunidade",
        featureCard2Title: "Networking",
        featureCard2Desc: "Descrição networking",
        featureCard3Title: "Crescimento",
        featureCard3Desc: "Descrição crescimento",
        statsBadge: "Nossos Números Teste",
        statsTitle: "Crescendo Juntos Teste",
        statsSubtitle: "Cada número representa uma história.",
        upcomingEventsBadge: "Próximos Eventos Teste",
        upcomingEventsTitle: "Não Perca Teste",
        upcomingEventsSubtitle: "Descubra experiências únicas.",
        viewAllLink: "Ver Todos",
        moreDetailsButton: "Mais Detalhes",
        recentNewsBadge: "Últimas Notícias Teste",
        recentNewsTitle: "Fique Atualizado Teste",
        recentNewsSubtitle: "Novidades da nossa comunidade.",
        readMoreButton: "Leia Mais",
        bottomCtaTitle: "Pronto para se Juntar?",
        bottomCtaSubtitle: "Faça parte de uma comunidade vibrante.",
        bottomCtaPrimaryButton: "Entrar em Contato",
        bottomCtaSecondaryButton: "Ver Eventos",
      },
      error: {
        genericTitle: "Erro",
        fetchDataError: "Falha ao carregar dados.",
        noDataTitle: "Sem Dados",
        noDataAvailable: "Nenhum dado disponível.",
      }
      // Add other namespaces like 'common', 'sidebar' if Home indirectly uses them via layouts
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

// Mock useHomeData hook
const mockHomeData = {
  upcomingEvents: [
    { id: '1', titleKey: 'event1Title', date: '2024-12-31', time: '19:00', locationKey: 'event1Location', descriptionKey: 'event1Desc' },
    { id: '2', titleKey: 'event2Title', date: '2025-01-15', time: '14:00', locationKey: 'event2Location', descriptionKey: 'event2Desc' },
  ],
  recentNews: [
    { id: '1', titleKey: 'news1Title', date: '2024-07-15', excerptKey: 'news1Excerpt' },
    { id: '2', titleKey: 'news2Title', date: '2024-07-10', excerptKey: 'news2Excerpt' },
  ],
  stats: [
    { id: '1', label: 'home.statsMembers', value: '1000+' }, // Assuming label is a translation key
    { id: '2', label: 'home.statsEventsYear', value: '50+' },
    { id: '3', label: 'home.statsFounded', value: '2000' },
  ],
  isLoading: false,
  isError: false,
  error: null,
};

vi.mock('@/hooks/useHomeData', () => ({
  useHomeData: vi.fn(() => mockHomeData),
}));

// Mock sub-components of Home page to prevent deep rendering issues if they also have mocks/context needs
// This focuses the Home.test.tsx on Home.tsx's direct responsibilities (layout, data passing)
vi.mock('@/components/home/HeroSection', () => ({
  default: ({t}: {t:any}) => <div data-testid="hero-section">{t('home.heroTitle')}</div>,
}));
vi.mock('@/components/home/StatisticsSection', () => ({
  default: ({stats, t}: {stats: any[], t:any}) => <div data-testid="statistics-section">{t('home.statsTitle')} ({stats.length} stats)</div>,
}));
vi.mock('@/components/home/UpcomingEventsSection', () => ({
  default: ({upcomingEvents, t}: {upcomingEvents: any[], t:any}) => <div data-testid="upcoming-events-section">{t('home.upcomingEventsTitle')} ({upcomingEvents.length} events)</div>,
}));
vi.mock('@/components/home/RecentNewsSection', () => ({
  default: ({recentNews, t}: {recentNews: any[], t:any}) => <div data-testid="recent-news-section">{t('home.recentNewsTitle')} ({recentNews.length} news)</div>,
}));


describe('Home Page', () => {
  it('renders the main heading from HeroSection when data is loaded', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Home />
        </I18nextProvider>
      </BrowserRouter>
    );
    // Check for the hero title, which is now rendered by the mocked HeroSection
    // The mock uses the key 'home.heroTitle'
    await screen.findByTestId('hero-section'); // Wait for sections to appear
    expect(screen.getByText(i18nTestInstance.t('home.heroTitle'))).toBeInTheDocument();
  });

  it('renders StatisticsSection with correct number of stats', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Home />
        </I18nextProvider>
      </BrowserRouter>
    );
    await screen.findByTestId('statistics-section');
    expect(screen.getByText(`${i18nTestInstance.t('home.statsTitle')} (${mockHomeData.stats.length} stats)`)).toBeInTheDocument();
  });

  it('renders UpcomingEventsSection with correct number of events', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Home />
        </I18nextProvider>
      </BrowserRouter>
    );
    await screen.findByTestId('upcoming-events-section');
    expect(screen.getByText(`${i18nTestInstance.t('home.upcomingEventsTitle')} (${mockHomeData.upcomingEvents.length} events)`)).toBeInTheDocument();
  });

  it('renders RecentNewsSection with correct number of news items', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Home />
        </I18nextProvider>
      </BrowserRouter>
    );
    await screen.findByTestId('recent-news-section');
    expect(screen.getByText(`${i18nTestInstance.t('home.recentNewsTitle')} (${mockHomeData.recentNews.length} news)`)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    vi.mocked(useHomeData).mockReturnValueOnce({ ...mockHomeData, isLoading: true });
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Home />
        </I18nextProvider>
      </BrowserRouter>
    );
    // PageLoader might have a specific role or text. Assuming it has 'status'.
    // Or check for a specific data-testid if PageLoader has one.
    expect(screen.getByRole('status')).toBeInTheDocument(); 
  });

  it('shows error state if isError is true', () => {
    vi.mocked(useHomeData).mockReturnValueOnce({ ...mockHomeData, isLoading: false, isError: true, error: { message: 'Test error' } });
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18nTestInstance}>
          <Home />
        </I18nextProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(i18nTestInstance.t('error.fetchDataError'))).toBeInTheDocument();
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });
});
