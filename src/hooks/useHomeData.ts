import { useQuery } from '@tanstack/react-query';
import { HomePageApiResponse, StatData, ApiStatData } from '@/types';
import { Users, Calendar, MapPin, Clock } from 'lucide-react';
import React from 'react';

// Mapeamento de nome de ícone para componente de ícone
const iconMap: { [key: string]: React.ElementType } = {
  Users,
  Calendar,
  MapPin,
  Clock,
};

const fetchHomeData = async (): Promise<HomePageApiResponse> => {
  const response = await fetch('http://localhost:3001/homePageData');
  if (!response.ok) {
    throw new Error('Network response was not ok when fetching home data');
  }
  return response.json();
};

// Hook para buscar e transformar os dados da Home
export const useHomeData = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<HomePageApiResponse, Error>({
    queryKey: ['homePageData'],
    queryFn: fetchHomeData,
  });

  // Transforma ApiStatData em StatData
  const transformedStats: StatData[] | undefined = data?.stats.map((apiStat: ApiStatData) => {
    const IconComponent = iconMap[apiStat.iconName] || Users; // Fallback para Users icon
    return {
      ...apiStat,
      icon: <IconComponent className="h-10 w-10 text-blue-600" />,
    };
  });

  return {
    upcomingEvents: data?.upcomingEvents,
    recentNews: data?.recentNews,
    stats: transformedStats,
    isLoading,
    isError,
    error,
  };
};