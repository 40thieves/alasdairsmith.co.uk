import invariant from 'tiny-invariant'

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })
const ordinalPluralRules = new Intl.PluralRules('en', { type: 'ordinal' })
const ordinalDateSuffixes: Record<string, string> = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th'
}

export function formatDate(date: Date): string {
  return dateFormatter
    .formatToParts(date)
    .map((part) => {
      return part.type === 'day'
        ? addOrdinalSuffixToDayNum(parseInt(part.value, 10))
        : part.value
    })
    .join('')
}

// Adapted from https://tinycode2.medium.com/js-and-ecmascript-date-formatting-with-ordinal-indicators-a271a23a866c
function addOrdinalSuffixToDayNum(dayNum: number) {
  invariant(
    Number.isFinite(dayNum) && dayNum >= 1,
    'Expected finite, positive number'
  )

  const ordinal = ordinalPluralRules.select(dayNum)

  invariant(ordinal in ordinalDateSuffixes, 'Ordinal not in possible suffixes')
  const suffix = ordinalDateSuffixes[ordinal]

  return `${dayNum}${suffix}`
}
