import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./notion-blog/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        heroColor: "#5546FF",
        greenColor: "#B3EB16",
        eventBgColor: "#1C1C1C",
        customGray: {
          light: "#2e3039",
          base: "#eeeeee",
          dark: "#1f2028",
        },
      },
      fontFamily: {
        helveticaNeue: ['Helvetica Neue', 'sans-serif'],
        bodoniseventytwo: ['bodoniseventytwo', 'sans-serif'],
        humaneMedium: ['humaneMedium', 'sans-serif']
      }
    },
  },
  plugins: [],
};
export default config;
