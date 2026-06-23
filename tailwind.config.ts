import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:       "#0a0c14",
        surface:  "#1a1d27",
        surface2: "#22263a",
        border:   "#2e3352",
        accent:   "#7c6dfa",
        accent2:  "#a78bfa",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up":    "fade-up 0.55s ease both",
        "fade-in":    "fade-in 0.45s ease both",
        "scale-in":   "scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "slide-right":"slide-right 0.35s ease both",
        "spin-slow":  "spin 0.7s linear infinite",
        "glow":       "glow-pulse 3s ease-in-out infinite",
        "float":      "float 6s ease-in-out infinite",
      },
      keyframes: {
        "fade-up":    { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-in":    { from: { opacity: "0" }, to: { opacity: "1" } },
        "scale-in":   { from: { opacity: "0", transform: "scale(0.93)" }, to: { opacity: "1", transform: "scale(1)" } },
        "slide-right":{ from: { opacity: "0", transform: "translateX(-20px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        "glow-pulse": { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "0.8" } },
        "float":      { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-18px)" } },
      },
    },
  },
  plugins: [],
};

export default config;
