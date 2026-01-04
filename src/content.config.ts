import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const journalEntries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/journal' }),
  schema: z.object({
    title: z.string(),
    'published-date': z.coerce.date()
  })
})

export const collections = { journalEntries }
