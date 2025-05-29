import { useMemo } from 'react';
import { I18nCalendarEventData } from '@/types'; // Importar o tipo I18n correto

const mockCalendarEvents: I18nCalendarEventData[] = [
  // Eventos de Agosto de 2025
  {
    id: 'evt-gala-20250815',
    titleKey: "event.galaDinner.title", // Usar chave de tradução existente
    start: new Date(2025, 7, 15, 19, 0), // Mês é 0-indexed (7 = Agosto)
    end: new Date(2025, 7, 15, 23, 30),
    categoryKey: "event.category.Social",
    locationKey: "location.nobleHall"
  },
  // Eventos de Setembro de 2025
  {
    id: 'evt-chess-20250910',
    titleKey: "event.chessTournament.title",
    start: new Date(2025, 8, 10, 14, 0),
    end: new Date(2025, 8, 10, 18, 0),
    categoryKey: "event.category.Esportivo",
    locationKey: "location.gamesRoom"
  },
  {
    id: 'evt-cooking-20250925',
    titleKey: "event.cookingWorkshop.title",
    start: new Date(2025, 8, 25, 10, 0),
    end: new Date(2025, 8, 25, 13, 0),
    categoryKey: "event.category.Cultural",
    locationKey: "location.gourmetKitchen"
  },
  // Eventos de Outubro de 2025
  {
    id: 'evt-invest-20251005',
    titleKey: "event.investmentsTalk.title",
    start: new Date(2025, 9, 5, 18, 30),
    end: new Date(2025, 9, 5, 20, 30),
    categoryKey: "event.category.Educacional",
    locationKey: "location.mainAuditorium"
  },
  {
    id: 'evt-jazz-20251018',
    titleKey: "event.jazzNight.title",
    start: new Date(2025, 9, 18, 20, 0),
    end: new Date(2025, 9, 18, 23, 0),
    categoryKey: "event.category.Cultural",
    locationKey: "location.panoramicLounge"
  },
  // Eventos de Novembro de 2025
  {
    id: 'evt-tennis-20251108',
    titleKey: "event.tennisOpen.title",
    start: new Date(2025, 10, 8, 9, 0),
    end: new Date(2025, 10, 9, 17, 0), // Evento de dois dias
    allDay: false, // Especificar se não for o dia todo
    categoryKey: "event.category.Esportivo",
    locationKey: "location.tennisCourts"
  },
  {
    id: 'evt-film-20251120',
    titleKey: "event.filmFestival.title",
    start: new Date(2025, 10, 20, 17, 0),
    end: new Date(2025, 10, 24, 22, 0), // Festival de vários dias
    categoryKey: "event.category.Cultural",
    locationKey: "location.cinemaRoom"
  },
  // Eventos de Dezembro de 2025
  {
    id: 'evt-masquerade-20251212',
    titleKey: "event.masqueradeBall.title",
    start: new Date(2025, 11, 12, 21, 0),
    end: new Date(2025, 11, 13, 2, 0),
    categoryKey: "event.category.Social",
    locationKey: "location.imperialHall"
  },
];

export const useCalendarData = () => {
  const calendarEvents = useMemo(() => mockCalendarEvents, []);
  return { calendarEvents };
}; 