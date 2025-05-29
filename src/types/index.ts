// Este arquivo centraliza todas as interfaces e tipos de dados compartilhados na aplicação.

// Tipos para useHomeData.ts e Home.tsx
export interface StatData {
  icon: JSX.Element;
  value: string;
  label: string; // Agora será uma chave de tradução
}

// Nova interface para dados de stats vindos da API
export interface ApiStatData {
  id: string;
  iconName: string; // e.g., "Users", "Calendar"
  value: string;
  label: string; // Chave de tradução
}

export interface HomePageUpcomingEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface HomePageRecentNews {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

// Tipos para useEventsData.ts e EventsPage.tsx
export interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  status: string;
  imageUrl: string;
  participants?: number;
  maxCapacity?: number;
}

// Tipos para useNewsData.ts e NewsPage.tsx
export interface NewsArticleData {
  id: number;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  summary: string;
  fullContent_pt: string; // Exemplo, pode ser uma chave ou estrutura mais complexa
  fullContent_en: string; // Exemplo, pode ser uma chave ou estrutura mais complexa
}

// Tipos para useCalendarData.ts e CalendarPage.tsx
export interface CalendarEventData {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  description?: string;
  location?: string;
  category?: string; 
}

// Tipos para Navbar.tsx
export interface NavItem {
  name: string; // Agora será uma chave de tradução
  path: string;
  icon?: React.ReactNode;
}

// Tipos para Sidebar.tsx
export interface PartnerLink {
  name: string;
  url: string;
  logoUrl: string;
}

export interface SocialLinkInfo {
  name: string; // e.g., "Facebook", "Instagram"
  url: string;
  icon: React.ElementType; // e.g., Facebook icon component
}

export interface UsefulInfoItem {
  title: string;
  content: string;
  icon?: React.ElementType;
}

// Interfaces adaptadas para I18n
// Para useHomeData.ts
export interface I18nHomePageUpcomingEvent extends Omit<HomePageUpcomingEvent, 'title' | 'description' | 'location'> {
  titleKey: string;
  descriptionKey: string;
  locationKey: string; // Adicionado para tradução de locais
}

export interface I18nHomePageRecentNews extends Omit<HomePageRecentNews, 'title' | 'excerpt'> {
  titleKey: string;
  excerptKey: string;
}

// Nova interface para a resposta completa da API para a HomePage
export interface HomePageApiResponse {
  upcomingEvents: I18nHomePageUpcomingEvent[];
  recentNews: I18nHomePageRecentNews[];
  stats: ApiStatData[];
}

// Para useEventsData.ts (e EventsPage.tsx)
export interface I18nEventData extends Omit<EventData, 'title' | 'description' | 'category' | 'status' | 'location'> {
  titleKey: string;
  descriptionKey: string;
  categoryKey: string;
  statusKey: string;
  locationKey: string; // Adicionado para tradução de locais
}

// Para useNewsData.ts (e NewsPage.tsx) - A ser definido quando trabalharmos em NewsPage
export interface I18nNewsArticleData extends Omit<NewsArticleData, 'title' | 'category' | 'summary' | 'fullContent_pt' | 'fullContent_en' | 'date'> {
    id: number;
    titleKey: string;
    date: string;
    categoryKey: string;
    summaryKey: string;
    imageUrl: string;
    fullContentKey?: string;
}

// Para useCalendarData.ts (e CalendarPage.tsx) - A ser definido quando trabalharmos em CalendarPage
export interface I18nCalendarEventData extends Omit<CalendarEventData, 'title' | 'description' | 'location' | 'category' | 'start' | 'end' | 'allDay' | 'id'> {
    id: string;
    titleKey: string;
    start: string;
    end: string;
    allDay?: boolean;
    descriptionKey?: string;
    locationKey?: string;
    categoryKey?: string;
}