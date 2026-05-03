import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const journalEntries = defineCollection({
  // Folder structure: either md files in root or nested inside named folders
  // journal
  // ├── blog-post-1.md
  // └── blog-post-2
  //     ├── blog-post-2.md
  //     └── img-1.png
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    'published-date': z.coerce.date()
  })
})

export const collections = { journalEntries }
