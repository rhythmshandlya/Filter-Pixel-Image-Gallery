/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "secondary-color": "#022b28",
        white: "#fff",
        gray: {
          100: "#1b1b1b",
          200: "rgba(0, 0, 0, 0.42)",
        },
      },
      fontFamily: {
        inter: "Inter",
      },
    },
    fontSize: {
      base: "20px",
      "5xl": "28px",
      xl: "20px",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
