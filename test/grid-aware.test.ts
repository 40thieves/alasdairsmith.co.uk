import { beforeEach, expect, it, vi, type MockInstance } from 'vitest'
import { http, HttpHandler, HttpResponse } from 'msw'

import { mockRequest } from './setup'
import { gridAwareCheck, type GridAwareGeo } from '../src/grid-aware'

const MOCK_API_KEY = 'API_KEY'
const MOCK_GEO = { longitude: 0, latitude: 51 }

it('returns successfully returns carbon intensity level', async () => {
  withRequests(successfulApiRequest())

  const carbonIntensityLevel = await gridAwareCheck(MOCK_GEO, MOCK_API_KEY)

  expect(carbonIntensityLevel).toBe('moderate')
})

it('calls getGeo from context', async () => {
  withRequests(successfulApiRequest())

  await gridAwareCheck(MOCK_GEO, MOCK_API_KEY)
})

it('throws if lng/lat from getGeo is invalid', async () => {
  await expect(
    gridAwareCheck({ longitude: 190, latitude: -100 }, MOCK_API_KEY)
  ).rejects.toThrow('Lng/Lat malformed')
})

it('throws if API request is unsuccessful', async () => {
  withRequests(unsuccessfulApiRequest())

  await expect(gridAwareCheck(MOCK_GEO, MOCK_API_KEY)).rejects.toThrow(
    'Error response from carbon intensity level request'
  )
})

function withRequests(...requests: HttpHandler[]) {
  mockRequest.use(...requests)
}

interface RequestMockOpts {
  once: boolean
}

function successfulApiRequest(opts?: RequestMockOpts) {
  return http.get(
    'https://api.electricitymaps.com/v4/carbon-intensity-level/latest',
    ({ request }) => {
      const url = new URL(request.url)

      // Ensure query params are provided,
      if (!url.searchParams.get('lat')) {
        return HttpResponse.json(
          {
            error: 'Missing argument: "lat"'
          },
          { status: 400 }
        )
      }
      if (!url.searchParams.get('lon')) {
        return HttpResponse.json(
          {
            error: 'Missing argument: "lon"'
          },
          { status: 400 }
        )
      }

      return HttpResponse.json({
        zone: 'GB',
        data: [
          {
            level: 'moderate',
            datetime: '2026-04-18T08:00:00.000Z'
          }
        ]
      })
    },
    opts
  )
}

function unsuccessfulApiRequest(opts?: RequestMockOpts) {
  return http.get(
    'https://api.electricitymaps.com/v4/carbon-intensity-level/latest',
    () => {
      // Unsure what the exact response would look like for 500s, so just leave
      // it null
      return new HttpResponse(null, { status: 500 })
    },
    opts
  )
}
