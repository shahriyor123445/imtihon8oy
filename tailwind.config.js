/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        blue: "rgba(135, 206, 235, 1)",
        blu: "rgba(169, 169, 169, 1)",

        qora: "rgba(81, 81, 81, 1)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
