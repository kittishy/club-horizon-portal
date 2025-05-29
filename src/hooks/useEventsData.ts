import { useMemo } from 'react';
import { I18nEventData } from '@/types'; // Importar o tipo I18nEventData correto

// A interface I18nEventData já foi movida para @/types
// Esta seção pode ser removida se a interface local não for mais necessária.

const mockEventsData: I18nEventData[] = [
  {
    id: 1,
    titleKey: "event.galaDinner.title",
    date: "2025-08-15",
    time: "19:00",
    locationKey: "location.nobleHall", // Alterado para locationKey
    descriptionKey: "event.galaDinner.description",
    categoryKey: "event.category.Social",
    statusKey: "event.status.Inscrições Abertas",
    imageUrl: "/images/events/gala-dinner.jpg",
    participants: 80,
    maxCapacity: 150,
  },
  {
    id: 2,
    titleKey: "event.chessTournament.title",
    date: "2025-09-10",
    time: "14:00",
    locationKey: "location.gamesRoom", // Alterado para locationKey
    descriptionKey: "event.chessTournament.description",
    categoryKey: "event.category.Esportivo",
    statusKey: "event.status.Quase Lotado",
    imageUrl: "/images/events/chess-tournament.jpg",
    participants: 45,
    maxCapacity: 50,
  },
  {
    id: 3,
    titleKey: "event.cookingWorkshop.title",
    date: "2025-09-25",
    time: "10:00",
    locationKey: "location.gourmetKitchen", // Alterado para locationKey
    descriptionKey: "event.cookingWorkshop.description",
    categoryKey: "event.category.Cultural",
    statusKey: "event.status.Lotado",
    imageUrl: "/images/events/cooking-workshop.jpg",
    participants: 20,
    maxCapacity: 20,
  },
  {
    id: 4,
    titleKey: "event.investmentsTalk.title",
    date: "2025-10-05",
    time: "18:30",
    locationKey: "location.mainAuditorium", // Alterado para locationKey
    descriptionKey: "event.investmentsTalk.description",
    categoryKey: "event.category.Educacional",
    statusKey: "event.status.Inscrições Abertas",
    imageUrl: "/images/events/investment-talk.jpg",
    participants: 30,
    maxCapacity: 100,
  },
  {
    id: 5,
    titleKey: "event.jazzNight.title",
    date: "2025-10-18",
    time: "20:00",
    locationKey: "location.panoramicLounge", // Alterado para locationKey
    descriptionKey: "event.jazzNight.description",
    categoryKey: "event.category.Cultural",
    statusKey: "event.status.Em Breve",
    imageUrl: "/images/events/jazz-night.jpg",
    maxCapacity: 80,
  },
  {
    id: 6,
    titleKey: "event.tennisOpen.title",
    date: "2025-11-08",
    time: "09:00",
    locationKey: "location.tennisCourts", // Alterado para locationKey
    descriptionKey: "event.tennisOpen.description",
    categoryKey: "event.category.Esportivo",
    statusKey: "event.status.Inscrições Abertas",
    imageUrl: "/images/events/tennis-open.jpg",
    participants: 24,
    maxCapacity: 32,
  },
  {
    id: 7,
    titleKey: "event.filmFestival.title",
    date: "2025-11-20",
    time: "17:00",
    locationKey: "location.cinemaRoom", // Alterado para locationKey
    descriptionKey: "event.filmFestival.description",
    categoryKey: "event.category.Cultural",
    statusKey: "event.status.Em Breve",
    imageUrl: "/images/events/film-festival.jpg",
    maxCapacity: 60,
  },
  {
    id: 8,
    titleKey: "event.masqueradeBall.title",
    date: "2025-12-12",
    time: "21:00",
    locationKey: "location.imperialHall", // Alterado para locationKey
    descriptionKey: "event.masqueradeBall.description",
    categoryKey: "event.category.Social",
    statusKey: "event.status.Em Breve",
    imageUrl: "/images/events/masquerade-ball.jpg",
    maxCapacity: 200,
  },
];

export const useEventsData = () => {
  const events = useMemo(() => mockEventsData, []);
  return { events };
};

// Se EventData de @/types não for mais usada por este hook, 
// você pode remover a importação ou ajustar src/types/index.ts conforme necessário.
// Por exemplo, se I18nEventData deve ser o novo EventData global, mova-o para lá. 