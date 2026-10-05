import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FBF6EE", 50: "#FEFBF6", 100: "#FBF6EE", 200: "#F4EADB", 300: "#E9D9C0" },
        cocoa: { DEFAULT: "#3B2418", 700: "#4E3223", 600: "#6B4A38", 500: "#8A6A57", 400: "#A88C7B" },
        blush: { DEFAULT: "#D9778A", 50: "#FDF1F3", 100: "#F9DCE2", 200: "#F2BCC8", 500: "#D9778A", 600: "#C25E72", 700: "#A24A5D" },
        gold: { DEFAULT: "#B8924A", 700: "#745A22", 300: "#E3C98F", 400: "#CDAA66", 500: "#B8924A", 600: "#957431" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: { marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } }, float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } } },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(59,36,24,0.18)",
        lift: "0 20px 50px -15px rgba(59,36,24,0.28)",
      },
    },
  },
  plugins: [],
};
export default config;
