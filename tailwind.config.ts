import type { Config } from "tailwindcss";
import { colors as appColors, typography } from "./src/lib/designTokens"; // Import new tokens

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
        // Shadcn UI colors (will be defined by CSS variables in index.css)
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: { // Assuming these are custom for a specific layout
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},

        // Application-specific colors from designTokens.ts
        // These can be used directly, e.g., bg-app-primary, text-app-accent-blue
        appPrimary: appColors.primary,
        appSecondary: appColors.secondary,
        appAccent: {
          blueLight: appColors.accent.blueLight,
          blue: appColors.accent.blue,
          blueDark: appColors.accent.blueDark,
          purpleLight: appColors.accent.purpleLight,
          purple: appColors.accent.purple,
          purpleDark: appColors.accent.purpleDark,
          pinkLight: appColors.accent.pinkLight,
          pink: appColors.accent.pink,
          pinkDark: appColors.accent.pinkDark,
        },
        appNeutral: appColors.neutral,
			},
			fontFamily: {
        sans: typography.fontFamily.sans,
        serif: typography.fontFamily.serif,
        mono: typography.fontFamily.mono,
      },
      fontSize: typography.fontSizes,
      // Gradients can be used via className string from designTokens.colors.gradients
      // e.g. <div className={appColors.gradients.primary}>Hello</div>
      // Or define specific gradient utilities if preferred:
      backgroundImage: {
        'gradient-primary': `linear-gradient(to right, ${appColors.accent.blue}, ${appColors.accent.purple})`,
        'gradient-secondary': `linear-gradient(to right, ${appColors.accent.purple}, ${appColors.accent.pink})`,
      },
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
