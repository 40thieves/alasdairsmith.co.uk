import { defineMiddleware } from 'astro:middleware'

import { GridAwareElectricityMaps, GridAwareSession } from './grid-aware-2'

const GRID_AWARE_COOKIE_NAME = 'grid-aware-co2'
const GRID_AWARE_COOKIE_MAX_AGE = 3_600 // 1 hour

export const onRequest = defineMiddleware(async (context, next) => {
  if (
    new URL(context.request.url).searchParams.get('grid-aware-disabled') ===
    'true'
  ) {
    console.warn(
      'Grid aware disabled by request query, skipping grid-aware check'
    )
    context.locals.gridAwareDisabled = true
    return next()
  }

  if (import.meta.env.DISABLE_GRID_AWARE === 'true') {
    console.warn('Grid aware disabled by env, skipping grid-aware check')
    context.locals.gridAwareDisabled = true
    return next()
  }

  const cookie = context.cookies.get(GRID_AWARE_COOKIE_NAME)
  if (cookie) {
    try {
      const cachedJson = cookie.json()
      context.locals.gridAwareCarbonIntensityLevel =
        cachedJson.gridAwareCarbonIntensityLevel
    } catch (e) {
      console.warn(
        'Error retrieving cached value, skipping grid-aware check',
        e
      )
    }
    return next()
  }

  const gridAware = new GridAwareElectricityMaps({
    session: context.session as GridAwareSession<string>,
    apiCredentials: {
      username: import.meta.env.WATTTIME_API_USERNAME,
      password: import.meta.env.WATTTIME_API_PASSWORD
    },
    getGeo: () => {
      // Allow overriding via DEV_GEO env var
      if (import.meta.env.DEV_GEO != null) {
        try {
          return JSON.parse(import.meta.env.DEV_GEO)
        } catch (e) {}
      }
      const { longitude, latitude } = context.locals.netlify.context.geo
      return { longitude, latitude }
    }
  })

  try {
    const gridAwareCarbonIntensityLevel = await gridAware.check()

    // Make the value available to locals (i.e. in the components)
    context.locals.gridAwareCarbonIntensityLevel = gridAwareCarbonIntensityLevel

    // Persist as a cookie
    context.cookies.set(
      GRID_AWARE_COOKIE_NAME,
      { gridAwareCarbonIntensityLevel },
      { maxAge: GRID_AWARE_COOKIE_MAX_AGE }
    )
  } catch (e) {
    console.error('Error from GridAware, skipping grid-aware check', e)
  }

  return next()
})
