import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'

export default defineConfig({
  integrations: [preact()],

  // Doesn't seem that useful to me, and injects a bunch of weight into the page
  devToolbar: {
    enabled: false
  }
})
