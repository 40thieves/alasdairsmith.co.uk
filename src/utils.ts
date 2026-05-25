import { getCollection } from 'astro:content'
import invariant from 'tiny-invariant'

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })
const ordinalPluralRules = new Intl.PluralRules('en', { type: 'ordinal' })
const ordinalDateSuffixes: Record<string, string> = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th'
}

/**
 * Format a Date into a day number, ordinal suffix, month name and year number
 * string
 * @example
 * formatDateDayMonth(new Date("2026-01-01T00:00:00Z")) -> "1st January 2026"
 * @param date Date to format
 * @returns Formatted string
 */
export function formatDateFull(date: Date): string {
  return formatDateToParts(date)
    .map((part) => part.value)
    .join('')
}

/**
 * Format a Date into a day number, ordinal suffix and month name string
 * @example
 * formatDateDayMonth(new Date("2026-01-01T00:00:00Z")) -> "1st January"
 * @param date Date to format
 * @returns Formatted string
 */
export function formatDateDayMonth(date: Date): string {
  return formatDateToParts(date).reduce<string>(
    (acc, part) => (part.type !== 'year' ? acc + part.value : acc),
    ''
  )
}

function formatDateToParts(date: Date) {
  return dateFormatter
    .formatToParts(date)
    .reduce<Intl.DateTimeFormatPart[]>((acc, part) => {
      return part.type === 'day'
        ? acc.concat([
            part,
            // Add a literal part containing the ordinal suffix (st/nd/rd/th)
            ordinalSuffixPartFromDayNum(parseInt(part.value, 10))
          ])
        : acc.concat([part])
    }, [])
}

// Adapted from https://tinycode2.medium.com/js-and-ecmascript-date-formatting-with-ordinal-indicators-a271a23a866c
function ordinalSuffixPartFromDayNum(dayNum: number): Intl.DateTimeFormatPart {
  invariant(
    Number.isFinite(dayNum) && dayNum >= 1,
    'Expected finite, positive number'
  )

  const ordinal = ordinalPluralRules.select(dayNum)

  invariant(ordinal in ordinalDateSuffixes, 'Ordinal not in possible suffixes')
  const suffix = ordinalDateSuffixes[ordinal]

  return {
    type: 'literal',
    value: suffix
  }
}

/**
 * Gets a list of published journal entries (blog posts) as Astro content
 * collection objects, filtered to only those that are marked as published and
 * sorted by the publish date in reverse chronological order.
 *
 * @returns List of published journal entries as Astro collection objects, sorted by publish date
 */
export async function getJournalEntries(config?: { includeDrafts?: boolean }) {
  const rawPosts = await getCollection('journalEntries')

  return rawPosts
    .filter((post) => (config?.includeDrafts ? true : post.data.draft !== true))
    .toSorted(
      (a, b) =>
        !a.data.draft && !b.data.draft
          ? b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
          : -1 // Sort drafts to the top
    )
}
