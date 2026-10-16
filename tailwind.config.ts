import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          950: "#061224",
          900: "#0A1D37",
          800: "#102848",
          700: "#1A3A66",
          100: "#E6EDF5",
          50: "#F4F7FB",
        },
        cta: {
          500: "#D4AF37",
          600: "#C4A035",
        },
        success: {
          500: "#25D366",
          600: "#1EBE5A",
        },
        surface: "#F6F1E7",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Segoe UI", "sans-serif"],
        display: ["var(--font-poppins)", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 40px rgba(6, 18, 36, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
