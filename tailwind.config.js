/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Material Design 3 - Clean Light Theme
        primary: "#004ac6",
        "on-primary": "#ffffff",
        "primary-container": "#dbe1ff",
        "on-primary-container": "#001a78",

        secondary: "#505f76",
        "on-secondary": "#ffffff",
        "secondary-container": "#d0e1fb",
        "on-secondary-container": "#0a1929",

        tertiary: "#6c5b00",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#f7df00",
        "on-tertiary-container": "#1f1800",

        surface: "#faf8ff",
        "on-surface": "#1c1b1f",
        "surface-dim": "#d9d9e5",
        "surface-bright": "#faf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3fe",
        "surface-container": "#ededf9",
        "surface-container-high": "#e7e7f3",
        "surface-container-highest": "#e1e2ed",

        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#410e0b",

        outline: "#737686",
        "outline-variant": "#c3c6d7",
        "on-surface-variant": "#49454e",

        "inverse-surface": "#313033",
        "inverse-on-surface": "#f4eff4",
        "inverse-primary": "#b4c5ff",

        success: "#1b6b3a",
        "on-success": "#ffffff",
        "success-container": "#a6f4c5",
        "on-success-container": "#002111",

        warning: "#7c5800",
        "on-warning": "#ffffff",
        "warning-container": "#ffddb0",
        "on-warning-container": "#271900",

        info: "#00639e",
        "on-info": "#ffffff",
        "info-container": "#cbe6ff",
        "on-info-container": "#001e31",

        "surface-variant": "#e3e1ec",
        "primary-dark": "#0039a6",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      spacing: {
        "unit-1": "4px",
        "unit-2": "8px",
        "unit-3": "12px",
        "unit-4": "16px",
        "unit-5": "20px",
        "unit-6": "24px",
        "unit-8": "32px",
        "unit-10": "40px",
        "unit-12": "48px",
        gutter: "24px",
      },
      fontFamily: {
        sans: [
          "Vazirmatn",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-lg": ["57px", { lineHeight: "64px", fontWeight: "400" }],
        "display-md": ["45px", { lineHeight: "52px", fontWeight: "400" }],
        "display-sm": ["36px", { lineHeight: "44px", fontWeight: "400" }],

        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "400" }],
        "headline-md": ["28px", { lineHeight: "36px", fontWeight: "400" }],
        "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "400" }],

        "title-lg": ["22px", { lineHeight: "28px", fontWeight: "500" }],
        "title-md": ["16px", { lineHeight: "24px", fontWeight: "500" }],
        "title-sm": ["14px", { lineHeight: "20px", fontWeight: "500" }],

        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],

        "label-lg": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "label-md": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "label-sm": ["11px", { lineHeight: "16px", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};
