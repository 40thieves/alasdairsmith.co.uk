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
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/journal',
    generateId(options) {
      // Split the path into components, get the last section
      const parts = options.entry.split('/')
      const fileName = parts.at(-1)!.replace(/\.md$/, '')

      // Only one part, it's a root md
      if (parts.length < 2) return fileName

      // Get the folder name (second to last part, to account for additional
      // nesting)
      const folderName = parts.at(-2)
      // If folder name matches the filename, use just the file name
      if (folderName === fileName) return fileName

      // Fallback to original Astro logic
      return options.entry
    }
  }),
  schema: z.object({
    title: z.string(),
    'published-date': z.coerce.date()
  })
})

export const collections = { journalEntries }
