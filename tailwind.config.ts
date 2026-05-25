import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Editorial palette — warm pearl + deep midnight, a single accent.
        pearl: "#f8f5ef",
        bone: "#ede7da",
        midnight: "#1c1d24",
        ink: "#0c0d12",
        clay: "#8a857a",
        burnt: "#5a564d",
        accent: "#c66b4a", // dusty coral — warm, salon-friendly
        accentSoft: "#f0d3c4",
      },
      fontFamily: {
        // Loaded via next/font in layout.tsx
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        prose: "68ch",
        readable: "44rem",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
      },
    },
  },
  plugins: [],
};

export default config;
