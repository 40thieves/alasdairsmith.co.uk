module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/img')

  eleventyConfig.addHandlebarsHelper('join', (array, sep, options) =>
    array.map(item => options.fn(item)).join(sep)
  )

  return {
    dir: {
      input: 'src',
      output: 'dist',
      templateFormats: ['hbs', 'css']
    }
  }
}
