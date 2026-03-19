import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#020F2C",
          slate: "rgba(255,255,255,0.65)",
          cyan: "#D9E4FF",
          coral: "#F5F8FF",
          sand: "rgba(255,255,255,0.08)",
          teal: "#A9BFFF",
        },
        ink: {
          900: "#F6F8FF",
          700: "#C6D4FF",
          600: "#A9B9E9",
          500: "#8A99C9",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-work-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(11, 31, 58, 0.18)",
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
