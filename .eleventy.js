module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/img')

  eleventyConfig.addHandlebarsHelper('join', (array, sep, options) =>
    array.map(item => options.fn(item)).join(sep)
  )

  eleventyConfig.addHandlebarsHelper('dev', options => {
    const env = process.env.NODE_ENV
    return !env || env.toLowerCase().startsWith('dev')
      ? options.fn(this)
      : options.inverse(this)
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
      templateFormats: ['hbs', 'css']
    }
  }
}
