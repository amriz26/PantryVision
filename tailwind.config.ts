import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f1117",
        surface: "#1a1d27",
        surface2: "#22263a",
        border: "#2e3352",
        accent: "#6c63ff",
        accent2: "#a78bfa",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
