export const colors = {
  gradients: {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-500',
  },
  accent: {
    blueLight: '#E0F2FE', // Light Sky Blue
    blue: '#3B82F6',     // Blue
    blueDark: '#1D4ED8',  // Dark Blue
    purpleLight: '#F3E8FF', // Light Lavender
    purple: '#8B5CF6',    // Purple
    purpleDark: '#5B21B6', // Dark Purple
    pinkLight: '#FCE7F3',  // Light Pink
    pink: '#EC4899',      // Pink
    pinkDark: '#BE185D',   // Dark Pink
  },
  neutral: {
    grayLightest: '#F9FAFB', // Almost white
    grayLighter: '#F3F4F6',  // Very light gray
    grayLight: '#E5E7EB',   // Light gray
    gray: '#9CA3AF',        // Medium gray (for text/borders)
    grayDark: '#4B5563',    // Dark gray (for text)
    grayDarker: '#374151',  // Very dark gray
    grayDarkest: '#1F2937', // Almost black
  },
  // Specific UI elements from Shadcn/ui mapping
  background: '#FFFFFF', // or neutral.grayLightest
  foreground: '#1F2937', // neutral.grayDarkest

  primary: '#3B82F6', // accent.blue
  primaryForeground: '#FFFFFF',

  secondary: '#8B5CF6', // accent.purple
  secondaryForeground: '#FFFFFF',

  muted: '#F3F4F6', // neutral.grayLighter
  mutedForeground: '#4B5563', // neutral.grayDark

  accentShadcn: '#EC4899', // accent.pink (using this for shadcn 'accent' to differentiate)
  accentForeground: '#FFFFFF',

  destructive: '#EF4444', // Red
  destructiveForeground: '#FFFFFF',

  border: '#E5E7EB', // neutral.grayLight
  input: '#E5E7EB', // neutral.grayLight
  ring: '#3B82F6', // accent.blue

  card: '#FFFFFF',
  cardForeground: '#1F2937', // neutral.grayDarkest
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'Noto Sans KR', 'sans-serif'], // Inter for UI, Noto Sans KR for Korean text
    serif: ['Georgia', 'serif'], // Example, not primary focus
    mono: ['Menlo', 'monospace'], // Example
  },
  fontSizes: {
    xs: '0.75rem',  // 12px
    sm: '0.875rem', // 14px
    base: '1rem',   // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem',  // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
};

export const designTokens = {
  colors,
  typography,
};

export default designTokens;
