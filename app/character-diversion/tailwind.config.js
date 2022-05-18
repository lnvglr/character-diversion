module.exports = {
  content: [],
  theme: {
    fontFamily: {
      sans: ['Gramatika'],
    },
    extend: {},
  },
  plugins: [require('tailwind-css-variables')({
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
  })],
  darkMode: 'class',
}
