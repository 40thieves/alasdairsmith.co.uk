export interface GridAwareGeo {
  latitude?: number
  longitude?: number
}

export type GridAwareCarbonIntensityLevel = 'high' | 'moderate' | 'low'

export async function gridAwareCheck(
  geo: GridAwareGeo,
  apiKey: string
): Promise<GridAwareCarbonIntensityLevel> {
  validateGeo(geo)
  return getCarbonIntensityLevel(geo, apiKey)
}

async function getCarbonIntensityLevel(
  { latitude, longitude }: Required<GridAwareGeo>,
  apiKey: string
) {
  performance.mark('getCarbonIntensityLevelStart')

  const carbonIntensityLevelQueryParams = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString()
  })

  const res = await fetch(
    `https://api.electricitymaps.com/v4/carbon-intensity-level/latest?${carbonIntensityLevelQueryParams}`,
    {
      headers: {
        'auth-token': `${apiKey}`
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

function validateGeo(geo: GridAwareGeo): asserts geo is Required<GridAwareGeo> {
  const { longitude, latitude } = geo

  if (!isLongitude(longitude) || !isLatitude(latitude)) {
    throw new Error('Lng/Lat malformed')
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
