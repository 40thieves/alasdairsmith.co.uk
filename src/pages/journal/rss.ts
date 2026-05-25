import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getJournalEntries } from '../../utils'

export const GET: APIRoute = async (context) => {
  const journalEntries = await getJournalEntries()

  return rss({
    title: 'Alasdair Smith | Journal',
    description:
      'Alasdair Smith is a frontend-focused engineer and leader based in London',
    // URL in prod
    site: context.site!,
    items: journalEntries.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      content: post.rendered?.html
    })),
    customData: `<language>en-GB</language>`
  })
}
