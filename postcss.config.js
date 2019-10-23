const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.hbs', './src/**/*.js'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

const cssnano = require('cssnano')({
  preset: 'default'
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.ELEVENTY_ENV === 'production' ? [purgecss, cssnano] : [])
  ]
}
