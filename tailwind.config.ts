
import type { Config } from "tailwindcss";

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
				// Custom AI Career Advisor colors
				'ai-blue': {
					50: 'hsl(220, 100%, 97%)',
					100: 'hsl(220, 100%, 94%)',
					200: 'hsl(220, 100%, 88%)',
					300: 'hsl(220, 100%, 82%)',
					400: 'hsl(220, 100%, 74%)',
					500: 'hsl(220, 84%, 60%)',
					600: 'hsl(220, 84%, 50%)',
					700: 'hsl(221, 84%, 40%)',
					800: 'hsl(221, 84%, 30%)',
					900: 'hsl(221, 84%, 20%)',
					950: 'hsl(221, 84%, 12%)'
				},
				'ai-gold': {
					50: 'hsl(54, 100%, 97%)',
					100: 'hsl(54, 100%, 94%)',
					200: 'hsl(54, 100%, 88%)',
					300: 'hsl(54, 100%, 82%)',
					400: 'hsl(54, 100%, 74%)',
					500: 'hsl(54, 100%, 50%)',
					600: 'hsl(45, 100%, 50%)',
					700: 'hsl(38, 100%, 50%)',
					800: 'hsl(32, 100%, 50%)',
					900: 'hsl(25, 100%, 50%)'
				}
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, hsl(223, 47%, 11%) 0%, hsl(217, 91%, 60%) 100%)',
				'gradient-secondary': 'linear-gradient(135deg, hsl(224, 47%, 15%) 0%, hsl(224, 47%, 20%) 100%)',
				'gradient-hero': 'linear-gradient(135deg, hsl(223, 47%, 11%) 0%, hsl(224, 47%, 15%) 50%, hsl(217, 91%, 60%) 100%)',
				'gradient-card': 'linear-gradient(135deg, hsl(224, 47%, 15%) 0%, hsl(224, 47%, 20%) 100%)',
				'grid-pattern': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)'
			},
			fontFamily: {
				'display': ['Inter', 'system-ui', 'sans-serif'],
				'body': ['Inter', 'system-ui', 'sans-serif']
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' 
					}
				},
				'grid-move': {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '50px 50px' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'grid-move': 'grid-move 20s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
