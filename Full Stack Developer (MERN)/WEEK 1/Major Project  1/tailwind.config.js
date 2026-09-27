/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        premium: "0 20px 60px rgba(15, 23, 42, 0.10)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shine: {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" }
        }
      },
      animation: {
        shimmer: "shimmer 1.7s infinite linear",
        float: "float 4s ease-in-out infinite",
        shine: "shine 1.2s ease"
      }
    }
  },
  plugins: []
};
