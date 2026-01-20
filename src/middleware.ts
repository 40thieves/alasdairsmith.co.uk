import { defineMiddleware } from 'astro:middleware'

import { GridAware, GridAwareSession } from './grid-aware'

const COOKIE_MAX_AGE = 3_600 // (1 hour)

export const onRequest = defineMiddleware(async (context, next) => {
  if (import.meta.env.DISABLE_GRID_AWARE === 'true') {
    console.warn('Grid aware disabled, skipping grid-aware check')
    return next()
  }

  const cookie = context.cookies.get('grid-aware-co2')
  if (cookie) {
    try {
      const cachedJson = cookie.json()
      context.locals.co2AboveThreshold = cachedJson.co2AboveThreshold
      context.locals.co2Value = cachedJson.co2Value
    } catch (e) {
      console.warn(
        'Error retrieving cached value, skipping grid-aware check',
        e
      )
    }
    return next()
  }

  const gridAware = new GridAware({
    session: context.session as GridAwareSession<string>,
    getGeo: () => {
      // Allow overriding via DEV_GEO env var
      if (import.meta.env.DEV_GEO != null) {
        try {
          return JSON.parse(import.meta.env.DEV_GEO)
        } catch (e) {}
      }
      const { longitude, latitude } = context.locals.netlify.context.geo
      console.log('from netlify geo', longitude, latitude)
      return { longitude, latitude }
    }
  })

  try {
    const { co2AboveThreshold, co2Value } = await gridAware.check()

    // Make the value available to locals (i.e. in the components)
    context.locals.co2AboveThreshold = co2AboveThreshold
    context.locals.co2Value = co2Value

    // Persist as a cookie
    context.cookies.set(
      'grid-aware-co2',
      { co2Value, co2AboveThreshold },
      { maxAge: COOKIE_MAX_AGE }
    )
  } catch (e) {
    console.error('Error from GridAware, skipping grid-aware check', e)
  }

  return next()
})
