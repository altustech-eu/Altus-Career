/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // 40s is a professional, slow speed. 
        // Use 'linear' to prevent the "speeding up/slowing down" effect.
        "scroll-left": "scrollLeft 40s linear infinite",
      },
    },
  },
  plugins: [],
};