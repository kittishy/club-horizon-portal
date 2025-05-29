import { renderHook } from '@testing-library/react';
import { useEventsData } from './useEventsData'; // Assumindo que o arquivo do hook é .ts por enquanto

describe('useEventsData', () => {
  it('should return events data with correct structure and content', () => {
    const { result } = renderHook(() => useEventsData());

    // Verificar se a chave principal existe
    expect(result.current).toHaveProperty('events');

    // Verificar tipo e contagem de itens
    expect(Array.isArray(result.current.events)).toBe(true);
    // Com base no mockEventsData, esperamos 8 eventos
    expect(result.current.events.length).toBe(8);

    // Verificar a estrutura de um item de events
    if (result.current.events.length > 0) {
      const firstEvent = result.current.events[0];
      expect(firstEvent).toHaveProperty('id');
      expect(firstEvent).toHaveProperty('titleKey');
      expect(firstEvent).toHaveProperty('date');
      expect(firstEvent).toHaveProperty('time');
      expect(firstEvent).toHaveProperty('locationKey');
      expect(firstEvent).toHaveProperty('descriptionKey');
      expect(firstEvent).toHaveProperty('categoryKey');
      expect(firstEvent).toHaveProperty('statusKey');
      expect(firstEvent).toHaveProperty('imageUrl');

      // Verificar um valor específico para garantir que os dados corretos são carregados
      expect(firstEvent.titleKey).toBe('event.galaDinner.title');
      expect(firstEvent.participants).toBe(80);
      expect(firstEvent.maxCapacity).toBe(150);
    }
  });
}); 