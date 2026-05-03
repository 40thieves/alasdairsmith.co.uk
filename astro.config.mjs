import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'
import netlify from '@astrojs/netlify'

export default defineConfig({
  integrations: [preact()],
  adapter: netlify(),

  // Disable static generation, use server rendering instead. This allows the
  // grid-aware middleware to always work
  output: 'server',

  // Doesn't seem that useful to me, and injects a bunch of weight into the page
  devToolbar: {
    enabled: false
  }
})
