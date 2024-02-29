const defaultTheme = require('tailwindcss/defaultTheme')
const { nextui } = require("@nextui-org/react");



module.exports = {
  content: [
    // ...
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs':  {'min': '0px', 'max': '641px'},
      'sm': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: "rgb(10, 126, 164)",
        secondary: "rgb(204, 218, 78)",
      },
      fontFamily: {
        sans: ['var(--font-monserrat)', 'sans-serif']
      },

    },
  },
  darkMode: "class",
  plugins: [
    nextui(
  
 
    )],
};
