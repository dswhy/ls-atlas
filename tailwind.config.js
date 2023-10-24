module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'fit-height': 'calc(var(--variable-vh, 1vh) * 100);',
        'initial-height': 'calc(var(--vh, 1vh) * 100);',
      },
      minHeight: {
        'fit-height': 'calc(var(--variable-vh, 1vh) * 100);',
        'initial-height': 'calc(var(--vh, 1vh) * 100);',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
