import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

import regions from './grid-aware-regions.json' with { type: 'json' }

export interface GridAwareGeo {
  latitude?: number
  longitude?: number
}

export declare class GridAwareSession<T> {
  get(key: string): Promise<T | undefined>
  set(key: string, value: T): void
  has(key: string): Promise<boolean>
}

export interface GridAwareContext {
  session: GridAwareSession<string>
  getGeo(): GridAwareGeo
}

const CO2_THRESHOLD = 50

export class GridAware {
  context: GridAwareContext

  constructor(context: GridAwareContext) {
    this.context = context
  }

  getGeo(): { latitude: number; longitude: number } {
    const { longitude, latitude } = this.context.getGeo()

    if (!isLongitude(longitude) || !isLatitude(latitude)) {
      throw new Error('Lng/Lat malformed')
    }

    return { longitude, latitude }
  }

  async refreshToken() {
    performance.mark('refreshTokenStart')

    const res = await fetch('https://api.watttime.org/login', {
      headers: {
        Authorization: `Basic ${btoa(
          `${import.meta.env.API_USERNAME}:${import.meta.env.API_PASSWORD}`
        )}`
      }
    })

    if (!res.ok) {
      throw new Error('Bad response from API token request', {
        cause: res ? await res.text() : undefined
      })
    }

    const json = await res.json()
    this.context.session.set('api-token', json.token)

    performance.mark('refreshTokenEnd')
    performance.measure('refreshToken', 'refreshTokenStart', 'refreshTokenEnd')
  }

  async getCO2Value(region: string): Promise<number> {
    performance.mark('getCO2ValueStart')

    const makeRequest = async () => {
      const apiToken = await this.context.session.get('api-token')

      const co2QueryParams = new URLSearchParams({
        signal_type: 'co2_moer',
        region
      })

      return fetch(
        `https://api.watttime.org/v3/signal-index?${co2QueryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`
          }
        }
      )
    }

    let co2Res = await makeRequest()

    // Refresh token if expired
    if (co2Res.status === 401) {
      await this.refreshToken()
      co2Res = await makeRequest()
    }

    if (!co2Res.ok) {
      throw new Error('Bad response from CO2 request', {
        cause: await co2Res.text()
      })
    }

    const co2Json = await co2Res.json()

    if (co2Json?.data?.[0]?.value == undefined) {
      throw new Error('No CO2 value returned from CO2 request')
    }

    const value = co2Json.data[0].value

    if (!Number.isFinite(value)) {
      throw new Error('Invalid CO2 value returned from CO2 request')
    }

    performance.mark('getCO2ValueEnd')
    performance.measure('getCO2Value', 'getCO2ValueStart', 'getCO2ValueEnd')

    return value
  }

  async check() {
    const geo = this.getGeo()
    const region = getRegion(geo)

    const co2Value = await this.getCO2Value(region)

    const co2AboveThreshold = co2Value > CO2_THRESHOLD

    return {
      co2AboveThreshold,
      co2Value
    }
  }
}

function getRegion(geolocation: { latitude: number; longitude: number }) {
  performance.mark('getRegionStart')

  const regionFeature = regions.features.find((feature) =>
    booleanPointInPolygon(
      [geolocation.longitude, geolocation.latitude],
      // @ts-expect-error: For whatever reason, the feature type string in the
      // GeoJSON doesn't match the types
      feature
    )
  )

  const region = regionFeature?.properties?.['Grid Region Abbrev']

  if (!region) {
    throw new Error('Region not found')
  }

  performance.mark('getRegionEnd')
  performance.measure('getRegion', 'getRegionStart', 'getRegionEnd')

  return region
}

function isLongitude(lng: unknown): lng is number {
  return (
    typeof lng === 'number' && Number.isFinite(lng) && lng >= -180 && lng <= 180
  )
}

function isLatitude(lng: unknown): lng is number {
  return (
    typeof lng === 'number' && Number.isFinite(lng) && lng >= -90 && lng <= 90
  )
}
