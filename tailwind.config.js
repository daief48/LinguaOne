/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#0B1020',
          800: '#151B32',
          700: '#232B45',
          600: '#3A4260',
          500: '#5A6382',
          400: '#8A92AC',
          300: '#B6BCCE',
          200: '#DCE0EA',
          100: '#EDEFF5',
          50: '#F6F7FB',
        },
        brand: {
          violet: '#7C3AED',
          purple: '#8B5CF6',
          indigo: '#4F46E5',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          aqua: '#22D3EE',
          pink: '#EC4899',
          rose: '#F43F5E',
          orange: '#F97316',
          amber: '#F59E0B',
          green: '#10B981',
          mint: '#34D399',
          yellow: '#FACC15',
        },
      },
      borderRadius: {
        xl2: '18px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '34px',
        device: '46px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,0.04), 0 8px 24px -12px rgba(16,24,40,0.10)',
        card: '0 2px 4px rgba(16,24,40,0.03), 0 12px 32px -14px rgba(16,24,40,0.14)',
        float: '0 8px 20px -8px rgba(16,24,40,0.18), 0 24px 56px -24px rgba(16,24,40,0.28)',
        nav: '0 -1px 0 rgba(16,24,40,0.04), 0 12px 40px -12px rgba(16,24,40,0.25)',
        glow: '0 10px 30px -10px rgba(124,58,237,0.55)',
        device: '0 40px 120px -30px rgba(23,16,60,0.45), 0 8px 30px -12px rgba(23,16,60,0.25)',
      },
      keyframes: {
        'page-in': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.995)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'sheet-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(-14px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'mic-pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '70%': { transform: 'scale(1.75)', opacity: '0' },
          '100%': { transform: 'scale(1.75)', opacity: '0' },
        },
        'wave-bar': {
          '0%, 100%': { transform: 'scaleY(0.28)' },
          '50%': { transform: 'scaleY(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'dot-bounce': {
          '0%, 80%, 100%': { transform: 'translateY(0)', opacity: '0.45' },
          '40%': { transform: 'translateY(-5px)', opacity: '1' },
        },
        'ring-ping': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 92%, 100%': { transform: 'scaleY(1)' },
          '96%': { transform: 'scaleY(0.12)' },
        },
        talk: {
          '0%, 100%': { transform: 'scaleY(0.55)' },
          '50%': { transform: 'scaleY(1.25)' },
        },
        'bar-rise': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        /* --- added: richer motion set --- */
        shine: {
          '0%': { transform: 'translateX(-130%) skewX(-18deg)' },
          '60%, 100%': { transform: 'translateX(240%) skewX(-18deg)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.86)' },
          '62%': { opacity: '1', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(28px,-22px,0) scale(1.06)' },
          '66%': { transform: 'translate3d(-20px,18px,0) scale(0.96)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.035)' },
        },
        'tab-pop': {
          '0%': { transform: 'scale(0.8)' },
          '55%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        'sheen-sweep': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        'orbit-dot': {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit,26px)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit,26px)) rotate(-360deg)' },
        },
        'stroke-draw': {
          '0%': { strokeDashoffset: 'var(--dash, 200)' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'page-in': 'page-in 380ms cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 420ms ease both',
        'slide-up': 'slide-up 480ms cubic-bezier(0.22,1,0.36,1) both',
        'sheet-up': 'sheet-up 340ms cubic-bezier(0.22,1,0.36,1) both',
        'scale-in': 'scale-in 320ms cubic-bezier(0.22,1,0.36,1) both',
        'toast-in': 'toast-in 300ms cubic-bezier(0.22,1,0.36,1) both',
        'mic-pulse': 'mic-pulse 1.8s cubic-bezier(0.16,1,0.3,1) infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 9s linear infinite',
        'dot-bounce': 'dot-bounce 1.2s ease-in-out infinite',
        'ring-ping': 'ring-ping 2s cubic-bezier(0.16,1,0.3,1) infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        blink: 'blink 5.5s ease-in-out infinite',
        talk: 'talk 420ms ease-in-out infinite',
        'bar-rise': 'bar-rise 700ms cubic-bezier(0.22,1,0.36,1) both',
        /* --- added --- */
        shine: 'shine 3.2s cubic-bezier(0.4,0,0.2,1) infinite',
        'pop-in': 'pop-in 460ms cubic-bezier(0.34,1.56,0.64,1) both',
        'reveal-up': 'reveal-up 620ms cubic-bezier(0.22,1,0.36,1) both',
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite',
        breathe: 'breathe 4.5s ease-in-out infinite',
        'tab-pop': 'tab-pop 380ms cubic-bezier(0.34,1.56,0.64,1)',
        'sheen-sweep': 'sheen-sweep 4s linear infinite',
        'glow-pulse': 'glow-pulse 3.4s ease-in-out infinite',
        'orbit-dot': 'orbit-dot 9s linear infinite',
      },
    },
  },
  plugins: [],
}
