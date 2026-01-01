import { defineConfig } from 'astro/config'

export default defineConfig({
  // Doesn't seem that useful to me, and injects a bunch of weight into the page
  devToolbar: {
    enabled: false
  }
})
