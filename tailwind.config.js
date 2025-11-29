/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Star Smiles Brand Colors
        primary: {
          50: '#e6f3ff',
          100: '#b3daff',
          200: '#80c1ff',
          300: '#4da8ff',
          400: '#1a8fff',
          500: '#0073CF', // Main brand blue
          600: '#005ba6',
          700: '#00447d',
          800: '#003D7A', // Navy blue
          900: '#001f3d',
        },
        // Named brand colors for easy use
        'star-blue': '#0073CF',        // Primary Blue
        'star-blue-light': '#4A9FE7',  // Light Blue (accent, stars)
        'star-blue-dark': '#003D7A',   // Navy Blue (dark accent)
        'star-orange': '#FF6B35',      // Orange (CTA buttons, highlights)
        'star-orange-light': '#FF8F66', // Light orange for hover
        'star-orange-dark': '#E55A2B',  // Dark orange for active
        'star-accent': '#4A9FE7',       // Accent color
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 115, 207, 0.1)',
        'card-hover': '0 8px 30px rgba(0, 115, 207, 0.15)',
        'button': '0 4px 14px rgba(255, 107, 53, 0.4)',
      },
    },
  },
  plugins: [],
}
