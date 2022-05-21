module.exports = {
  content: [],
  tailwindcss: {
    viewer: true,
  },
  theme: {
    fontFamily: {
      sans: ['Gramatika'],
    },
    extend: {
      colors: {
        mint: {
          "100": "#fcfffc",
          "200": "#e9f5e8",
          "300": "#c8dbc7",
          "400": "#9cb19c",
          "500": "#6d7f6e",
          "600": "#485549",
          "700": "#313b33",
          "800": "#28302b",
          "900": "#233027",
        },
      },
    },
  },
  plugins: [
    require('tailwind-css-variables')({
      screens: false,
      fontFamily: false,
      lineHeight: false,
      letterSpacing: false,
      backgroundSize: false,
      boxShadow: false,
      zIndex: false,
      transitionDuration: 'transition-duration',
      transitionProperty: 'transition-property',
      transitionDelay: 'transition-delay',
      transitionDuration: 'transition-duration',
      transitionTimingFunction: 'transition-timing-function',
      outlineStyle: 'outline-style',
      outlineWidth: 'outline-width',
      outlineOffset: 'outline-offset',
      outlineColor: 'outline-color',
    }),
  ],
  darkMode: 'class',
}
