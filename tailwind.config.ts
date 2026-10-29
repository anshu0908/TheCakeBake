import type { Config } from "tailwindcss";

// Every colour resolves to a token in app/tokens.css (the brand's own values, unchanged).
const c = (name: string) => `rgb(var(--rgb-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: c("white"),
        cream: { DEFAULT: c("cream"), 50: c("cream-50"), 100: c("cream"), 200: c("cream-200"), 300: c("cream-300") },
        cocoa: { DEFAULT: c("cocoa"), 700: c("cocoa-700"), 600: c("cocoa-600"), 500: c("cocoa-500"), 400: c("cocoa-400") },
        blush: { DEFAULT: c("blush"), 50: c("blush-50"), 100: c("blush-100"), 200: c("blush-200"), 500: c("blush"), 600: c("blush-600"), 700: c("blush-700") },
        gold: { DEFAULT: c("gold"), 700: c("gold-700"), 300: c("gold-300"), 400: c("gold-400"), 500: c("gold"), 600: c("gold-600") },
        whatsapp: { DEFAULT: c("whatsapp"), 700: c("whatsapp-700") },
      },
      fontFamily: {
        serif: ["var(--font-display)"],
        sans: ["var(--font-body)"],
      },
      borderRadius: { card: "var(--radius-card)", field: "var(--radius-field)" },
      transitionTimingFunction: { out: "var(--ease-out)" },
      boxShadow: {
        soft: "var(--shadow-card)",
        lift: "var(--shadow-overlay)",
      },
    },
  },
  plugins: [],
};
export default config;
