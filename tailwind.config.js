/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem'
        }
      },
    },
    colors: {
      black: "#0b132b",
      white: "#fff",
      cyan: "#2924fb",
      magenta: "#e81cff",
      red: "#e63946",
      green: "#57cc99",
      transparent: 'transparent'

    }
  },
    plugins: [],
};