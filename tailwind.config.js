/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './en/*.html', './blogg/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#001736',
        'primary-container': '#002b5c',
        secondary: '#00668a',
        'secondary-container': '#54c7ff',
        'accent-warm': '#ffb875',
        surface: '#f7f9fc',
        'surface-dim': '#eceef1',
        'surface-low': '#f2f4f7',
        'surface-high': '#e6e8eb',
        'surface-highest': '#e0e3e6',
        'on-surface': '#191c1e',
        'on-surface-variant': '#43474f',
        outline: '#747780',
        'outline-variant': '#c4c6d0',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
