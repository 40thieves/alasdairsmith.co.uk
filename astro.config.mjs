import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'
import netlify from '@astrojs/netlify'

export default defineConfig({
  integrations: [preact()],
  adapter: netlify(),

  // Doesn't seem that useful to me, and injects a bunch of weight into the page
  devToolbar: {
    enabled: false
  }
})
