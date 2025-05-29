import { useMemo } from 'react';
import { Users, Calendar, MapPin, Clock } from 'lucide-react';
import { StatData, I18nHomePageUpcomingEvent, I18nHomePageRecentNews } from '@/types';

// Adaptado para i18n: title e description agora são chaves de tradução
interface I18nHomePageUpcomingEvent extends Omit<HomePageUpcomingEvent, 'title' | 'description'> {
  titleKey: string;
  descriptionKey: string;
}

interface I18nHomePageRecentNews extends Omit<HomePageRecentNews, 'title' | 'excerpt'> {
  titleKey: string;
  excerptKey: string;
}

const upcomingEventsData: I18nHomePageUpcomingEvent[] = [
  {
    id: 1,
    titleKey: "home.event.galaDinner.title",
    date: "2025-06-15",
    time: "19:00",
    locationKey: "location.mainHall",
    descriptionKey: "home.event.galaDinner.description"
  },
  {
    id: 2,
    titleKey: "home.event.chessTournament.title",
    date: "2025-07-08",
    time: "14:00",
    locationKey: "location.gamesRoom",
    descriptionKey: "home.event.chessTournament.description"
  },
  {
    id: 3,
    titleKey: "home.event.cookingWorkshop.title",
    date: "2025-07-22",
    time: "10:00",
    locationKey: "location.gourmetKitchen",
    descriptionKey: "home.event.cookingWorkshop.description"
  }
];

const recentNewsData: I18nHomePageRecentNews[] = [
  {
    id: 1,
    titleKey: "home.news.fitnessPartnership.title",
    date: "2025-05-28",
    excerptKey: "home.news.fitnessPartnership.excerpt"
  },
  {
    id: 2,
    titleKey: "home.news.poolRenovation.title",
    date: "2025-05-20",
    excerptKey: "home.news.poolRenovation.excerpt"
  }
];

// StatData já tem labels que serão usadas como chaves de tradução
const statsData: StatData[] = [
  { icon: <Users className="h-10 w-10 text-blue-600" />, value: "500+", label: "home.activeMembers" },
  { icon: <Calendar className="h-10 w-10 text-blue-600" />, value: "50+", label: "home.eventsPerYear" },
  { icon: <MapPin className="h-10 w-10 text-blue-600" />, value: "5", label: "home.modernEnvironments" },
  { icon: <Clock className="h-10 w-10 text-blue-600" />, value: "50+", label: "home.yearsOfTradition" },
];

export const useHomeData = () => {
  const upcomingEvents = useMemo(() => upcomingEventsData, []);
  const recentNews = useMemo(() => recentNewsData, []);
  const stats = useMemo(() => statsData, []);

  return { upcomingEvents, recentNews, stats };
}; 