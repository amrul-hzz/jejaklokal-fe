import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sand: "#FFF2E1",
        coffee: "#675549",
        golden: "#C4A574",
        parchment: "#EDE6D3",
        linen: "#D6CBB3",
        chili: "#E85A4F",
        stone: "#4A4A4A",
        ash: "#6B6B6B",
        "gray-light": "#999999",
      },
    },
  },
  plugins: [],
} satisfies Config;
