export interface GridAwareGeo {
  latitude?: number
  longitude?: number
}

export interface GridAwareContext {
  apiKey: string
  getGeo(): GridAwareGeo
}

export type GridAwareCarbonIntensityLevel = 'high' | 'moderate' | 'low'

export class GridAware {
  context: GridAwareContext

  constructor(context: GridAwareContext) {
    this.context = context
  }

  async check(): Promise<GridAwareCarbonIntensityLevel> {
    const geo = this.getGeo()
    return this.getCarbonIntensityLevel(geo)
  }

  getGeo(): { latitude: number; longitude: number } {
    const { longitude, latitude } = this.context.getGeo()

    if (!isLongitude(longitude) || !isLatitude(latitude)) {
      throw new Error('Lng/Lat malformed')
    }

    return { longitude, latitude }
  }

  async getCarbonIntensityLevel({
    latitude,
    longitude
  }: {
    latitude: number
    longitude: number
  }) {
    performance.mark('getCarbonIntensityLevelStart')

    const carbonIntensityLevelQueryParams = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString()
    })

    const res = await fetch(
      `https://api.electricitymaps.com/v4/carbon-intensity-level/latest?${carbonIntensityLevelQueryParams}`,
      {
        headers: {
          'auth-token': `${this.context.apiKey}`
        }
      }
    )
    if (!res.ok) {
      throw new Error('Error response from carbon intensity level request')
    }

    const json = await res.json()
    if (json?.data?.at(0)?.level == null) {
      throw new Error(
        'No carbon intensity level returned from carbon intensity level request'
      )
    }

    const carbonIntensityLevel = json.data.at(0).level

    performance.mark('getCarbonIntensityLevelEnd')
    performance.measure(
      'getCarbonIntensityLevel',
      'getCarbonIntensityLevelStart',
      'getCarbonIntensityLevelEnd'
    )

    return carbonIntensityLevel
  }
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
