import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        seal_brown: {
          DEFAULT: "#4d1704",
          100: "#100501",
          200: "#1f0902",
          300: "#2f0e02",
          400: "#3e1303",
          500: "#4d1704",
          600: "#9f3108",
          700: "#f0490d",
          800: "#f6855c",
          900: "#fbc2ae",
        },
        champagne: {
          DEFAULT: "#eee0cb",
          100: "#423015",
          200: "#84612b",
          300: "#c39045",
          400: "#d8b887",
          500: "#eee0cb",
          600: "#f1e5d4",
          700: "#f5ecdf",
          800: "#f8f2e9",
          900: "#fcf9f4",
        },
        bittersweet: {
          DEFAULT: "#fe5f55",
          100: "#430500",
          200: "#860a01",
          300: "#c90e01",
          400: "#fe1f0f",
          500: "#fe5f55",
          600: "#fe7e75",
          700: "#fe9e97",
          800: "#ffbfba",
          900: "#ffdfdc",
        },
        jungle_green: {
          DEFAULT: "#49a078",
          100: "#0f2018",
          200: "#1e4030",
          300: "#2c6048",
          400: "#3b8160",
          500: "#49a078",
          600: "#68ba94",
          700: "#8ecbae",
          800: "#b4dcc9",
          900: "#d9eee4",
        },
      },
    },
  },
  plugins: [],
};
export default config;
