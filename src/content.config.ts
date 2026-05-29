import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, type CollectionEntry } from 'astro:content'

// Schema for draft posts
const DraftJournalEntrySchema = z.object({
  draft: z.literal(true),
  title: z.string(),
  publishedDate: z.coerce.date().optional(),
  excerpt: z.string().optional()
})
// Schema for published posts
const PublishedJournalEntrySchema = z.object({
  draft: z.literal(false).optional(),
  title: z.string(),
  publishedDate: z.coerce.date(),
  excerpt: z.string().optional()
})
// Discriminated union of published and draft posts
const JournalEntrySchema = z.discriminatedUnion('draft', [
  PublishedJournalEntrySchema,
  DraftJournalEntrySchema
])

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
  schema: JournalEntrySchema
})

export const collections = { journalEntries }
