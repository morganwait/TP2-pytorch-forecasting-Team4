import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        jakarta: ["var(--font-jakarta)"],
      },
      colors: {
        navy: "#1e3a5f",
        "navy-light": "#2d5282",
        parchment: "#f8f7f4",
        ink: "#292524",
        muted: "#78716c",
        accent: "#1d4ed8",
        "accent-light": "#eff6ff",
        border: "#e7e5e4",
      },
    },
  },
  plugins: [],
};
export default config;
