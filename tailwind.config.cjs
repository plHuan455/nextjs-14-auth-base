/** @type {import('tailwindcss').Config} */
import { withTV } from "tailwind-variants/transformer"

import { extraColors } from "./lib/tailwind/colors"
import { extraCSSClasses } from "./lib/tailwind/css-classes"
import { extraAnimations, extraKeyframes, screenSizes } from "./lib/tailwind/variables"

module.exports = withTV({
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",    
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "1rem",
        xl: "2rem",
        "2xl": "2rem",
      },
    },
    fontFamily: {
      content: ["var(--font-bergen)"]
    },
    screens: screenSizes,
    fontSize: {
      xxs: ["0.625rem", "0.875rem"], // @fs=10px => xxs
      xs: ["0.75rem", "1rem"], // @fs=12px => xs
      sm: ["0.875rem", "1.25rem"], // @fs=14px => sm
      base: ["1rem", "1.5rem"], // @fs=16px => base
      lg: ["1.125rem", "1.75rem"], // @fs=18px => lg
      xl: ["1.25rem", "1.75rem"], // @fs=20px => xl
      "0xs": ["0.625rem", "0.875rem"], // @fs=10px => 0xs
      "2xl": ["1.5rem", "2rem"], // @fs=24px => 2xl
      "3xl": ["2rem", "2.08rem"], // @fs=32px => 3xl
      "4xl": ["2.25rem", "2.5rem"], // @fs=36px => 4xl
      "4xl+": ["2.5rem", "2.75rem"], // @fs=40px => 4xl+
      "5xl": ["3rem", 1], // @fs=48px => 5xl
      "6xl": ["4rem", 1], // @fs=64px => 6xl
      "7xl": ["4.5rem", 1], // @fs=72px => 7xl
      "8xl": ["6rem", 1], // @fs=96px => 8xl
    },
    data: {
      // radix-state
      "state-checked": 'state="checked"',
      "state-uncheck": 'state="unchecked"',
      "state-open": 'state="open"',
      "state-on": 'state="on"',
      "state-off": 'state="off"',
      "state-active": 'state="active"',
      "state-inactive": 'state="inactive"',
      "state-disabled": 'state="disabled',
    },
    radix: {
      "state-open": 'state="open"',
    },
    extend: {
      containers: screenSizes,
      containerQuery: screenSizes,
      containerType: {
        size: "size",
      },
      fontSize: {
        4: ["1rem", "1.1875rem"],
      },
      boxShadow: {
        card: "0px 2px 6px 0px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)",
        popover: "2px 2px 8px 3px rgba(26, 26, 29, 0.06)",
      },
      dropShadow: {
        e200: "0px 3px 5px hsla(0, 0%, 0%, 0.3)",
        e300: "0px 6px 12px hsla(0, 0%, 0%, 0.3)",
      },
      colors: extraColors,
      transitionDuration: {
        2000: "2000ms",
      },
      keyframes: extraKeyframes,
      animation: extraAnimations,
      zIndex: {
        zBase: "var(--zBase)",
        zMatchesSlider: "var(--zMatchesSlider)",
        zBackToTopButton: "var(--zBackToTopButton)",
        zPageLoadProgress: "var(--zPageLoadProgress)",
        zHeader: "var(--zHeader)",
        zSlideBottom: "var(--zSlideBottom)",
        zContent: "var(--zContent)",
        zDropdown: "var(--zDropdown)",
        zDialog: "var(--zDialog)",
        zDialogOverlay: "var(--zDialogOverlay)",
        zMatchSlider: "var(--zMatchSlider)",
      },
      spacing: {
        "widget-pl": "1rem",
      },
    },
  },
  variants: {},
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),

    function ({ addComponents }) {
      addComponents({
        ...extraCSSClasses,
      })
    },
  ],
})
