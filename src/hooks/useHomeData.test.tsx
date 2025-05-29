import { renderHook } from '@testing-library/react';
import { useHomeData } from './useHomeData.tsx';
import { Users, Calendar, MapPin, Clock } from 'lucide-react'; // Precisamos para a comparação de stats

describe('useHomeData', () => {
  it('should return home data with correct structure and content', () => {
    const { result } = renderHook(() => useHomeData());

    // Verificar se as chaves principais existem
    expect(result.current).toHaveProperty('upcomingEvents');
    expect(result.current).toHaveProperty('recentNews');
    expect(result.current).toHaveProperty('stats');

    // Verificar tipos e contagem de itens
    expect(Array.isArray(result.current.upcomingEvents)).toBe(true);
    expect(result.current.upcomingEvents.length).toBe(3);

    expect(Array.isArray(result.current.recentNews)).toBe(true);
    expect(result.current.recentNews.length).toBe(2);

    expect(Array.isArray(result.current.stats)).toBe(true);
    expect(result.current.stats.length).toBe(4);

    // Verificar a estrutura de um item de upcomingEvents
    if (result.current.upcomingEvents.length > 0) {
      const firstEvent = result.current.upcomingEvents[0];
      expect(firstEvent).toHaveProperty('id');
      expect(firstEvent).toHaveProperty('titleKey');
      expect(firstEvent).toHaveProperty('date');
      expect(firstEvent).toHaveProperty('time');
      expect(firstEvent).toHaveProperty('locationKey');
      expect(firstEvent).toHaveProperty('descriptionKey');
      expect(firstEvent.titleKey).toBe('home.event.galaDinner.title');
    }

    // Verificar a estrutura de um item de recentNews
    if (result.current.recentNews.length > 0) {
      const firstNews = result.current.recentNews[0];
      expect(firstNews).toHaveProperty('id');
      expect(firstNews).toHaveProperty('titleKey');
      expect(firstNews).toHaveProperty('date');
      expect(firstNews).toHaveProperty('excerptKey');
      expect(firstNews.titleKey).toBe('home.news.fitnessPartnership.title');
    }

    // Verificar a estrutura de um item de stats
    // Nota: Comparar componentes React (ícones) pode ser complexo.
    // Aqui, vamos focar nas outras propriedades e no tipo do ícone.
    if (result.current.stats.length > 0) {
      const firstStat = result.current.stats[0];
      expect(firstStat).toHaveProperty('icon');
      expect(firstStat).toHaveProperty('value');
      expect(firstStat).toHaveProperty('label');
      // Verifica se o tipo do ícone é o esperado (Users)
      // A comparação direta de <Users /> com o que está no hook pode falhar devido a props diferentes, etc.
      // Uma abordagem mais robusta seria verificar o `type` do elemento React.
      expect(firstStat.icon.type).toBe(Users);
      expect(firstStat.label).toBe('home.activeMembers');
    }
  });
}); 