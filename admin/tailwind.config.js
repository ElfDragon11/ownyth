/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {

      colors: {
        primary: {
          DEFAULT: '#9055FF',
          hover: '#4050a3',
        },
        /*navy: {
          DEFAULT: '#1B3A4B',
          light: '#2C4D61',
        },
        beige: {
          DEFAULT: '#C19A6B',
          light: '#D1B08C',
        },*/
        marron: {
          DEFAULT: '#4F3CFF',
          light: '#943737',
        },
        background: '#1C1C1E', // Charcoal
        lightBackground: '#262627',
        'violet-start': '#9055FF', // Violet Gradient start
        'violet-end': '#4F3CFF', // Violet Gradient end
        softWhite: '#F3F3F4', // Text (Primary)
        lightGray: '#A6A6A8', // Text (Muted) & borders
      },
    },
  },
  plugins: [],
};
/*


      colors: {
        primary: {
          DEFAULT: '#A3C3E7',
          hover: '#8BAFD8',
        },
        navy: {
          DEFAULT: '#1B3A4B',
          light: '#2C4D61',
        },
        beige: {
          DEFAULT: '#C19A6B',
          light: '#D1B08C',
        },
        clay: {
          DEFAULT: '#B1745E',
          light: '#C38D79',
        },
        background: '#F8F8F8',
        muted: '#C5C5C5',
      },
*/