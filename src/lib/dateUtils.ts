import { i18n as I18nInstanceType } from 'i18next';

/**
 * Formata uma string de data de acordo com o locale atual do i18next.
 * @param dateString A string da data a ser formatada (deve ser parseável pelo construtor Date).
 * @param i18nInstance A instância do i18next para obter o idioma atual.
 * @param options Opções para Intl.DateTimeFormat.
 * @returns A data formatada como string, ou a string original se a data for inválida.
 */
export const formatDateForLocale = (
  dateString: string | undefined | null,
  i18nInstance: typeof I18nInstanceType,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!dateString) {
    return ''; // Retorna string vazia se a data for nula ou indefinida
  }
  try {
    const date = new Date(dateString);
    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      console.warn('formatDateForLocale: Invalid date string provided:', dateString);
      return dateString; // Retorna a string original se a data for inválida
    }
    const currentLanguage = i18nInstance.language;
    // Fallback para 'en' se o idioma tiver um código regional (ex: 'en-US') e não for encontrado um mapeamento específico
    const langToUse = currentLanguage.split('-')[0] || 'en';

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    };
    return date.toLocaleDateString(langToUse, defaultOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Retorna a string original em caso de erro
  }
}; 