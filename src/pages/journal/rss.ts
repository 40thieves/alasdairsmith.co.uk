import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import sanitizeHtml from 'sanitize-html'
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
      // Astro docs recommend sanitising which I'm on the fence about tbh, but
      // defence in depth can't hurt
      content: sanitizeHtml(post.rendered?.html!, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      })
    })),
    customData: `<language>en-GB</language>`
  })
}
