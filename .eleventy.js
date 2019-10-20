const pwaPlugin = require('eleventy-plugin-pwa')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/js')
  eleventyConfig.addPassthroughCopy({ 'src/root/*': '.' })

  eleventyConfig.addHandlebarsHelper('join', (array, sep, options) =>
    array.map(item => options.fn(item)).join(sep)
  )

  eleventyConfig.addHandlebarsHelper('dev', options => {
    const env = process.env.ELEVENTY_ENV
    return !env || env.toLowerCase().startsWith('dev')
      ? options.fn(this)
      : options.inverse(this)
  })

  eleventyConfig.addPlugin(pwaPlugin)

  return {
    dir: {
      input: 'src',
      output: 'dist',
      templateFormats: ['hbs']
    }
  }
}
