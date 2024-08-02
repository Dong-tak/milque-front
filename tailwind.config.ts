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
        "primary-0": "#000000",
        "primary-5": "#160041",
        "primary-10": "#22005D",
        "primary-15": "#2D1067",
        "primary-20": "#381E71",
        "primary-25": "#432B7E",
        "primary-30": "#4F378A",
        "primary-35": "#5B4397",
        "primary-40": "#6750A4",
        "primary-50": "#8069BF",
        "primary-60": "#9A83DB",
        "primary-70": "#B69DF7",
        "primary-80": "#CFBCFF",
        "primary-90": "#E9DDFF",
        "primary-95": "#F6EEFF",
        "primary-98": "#FDF7FF",
        "primary-99": "#FFFBFF",
        "primary-100": "#FFFFFF",
        "basic-100": "#F7F9FC",
        "basic-200": "#EDF0F7",
        "basic-300": "#E2E7F0",
        "basic-400": "#CBD2E0",
        "basic-500": "#A0ABC0",
        "basic-600": "#717D96",
        "basic-700": "#4A5468",
        "basic-800": "#2D3648",
        "basic-900": "#1A202C",
        "que-red": "#FF5252",
        "que-purple": "#F134F7",
        "que-blue": "#34AFF7",
        "que-green": "#2EDB4B",
        "que-yellow": "#FFD43A",
        "que-orange": "#FE9D35",
        "que-lred": "#FFB8B8",
        "que-lpurple": "#F6D1FF",
        "que-lblue": "#B0DCFF",
        "que-lgreen": "#D1FFD9",
        "que-lyellow": "#FFEDAD",
        "que-lorange": "#FED7AD",
      },
      boxShadow: {
        inner: "inset 0 0 0 2px",
      },
    },
  },
  plugins: [],
};
export default config;
