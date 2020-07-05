module.exports = {
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      colors: {
        'pastel-green': 'hsla(85, 54%, 51%, 0.2)',
        'pastel-teal': 'hsla(173, 77%, 37%, 0.2)',
        'pastel-blue': 'hsla(204, 77%, 44%, 0.2)',
        'pastel-purple': 'hsla(326, 52%, 40%, 0.2)'
      }
    }
  },
  variants: {
    margin: ['responsive', 'first', 'hover', 'focus']
  },
  purge: {
    enable: process.env.ELEVENTY_ENV === 'production',
    content: ['./src/**/*.hbs', './src/**/*.js']
  }
}
