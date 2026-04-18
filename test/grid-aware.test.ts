import { beforeEach, expect, it, vi, type MockInstance } from 'vitest'
import { http, HttpHandler, HttpResponse } from 'msw'

import { mockRequest } from './setup'
import { GridAware, type GridAwareGeo } from '../src/grid-aware'

let getGeo: MockInstance<() => GridAwareGeo>, ga: GridAware

beforeEach(() => {
  getGeo = vi.fn().mockReturnValue({ longitude: 0, latitude: 51 })

  ga = new GridAware({
    apiKey: 'API_KEY',
    getGeo: getGeo as unknown as () => GridAwareGeo
  })
})

it('returns successfully returns carbon intensity level', async () => {
  withRequests(successfulApiRequest())

  const carbonIntensityLevel = await ga.check()

  expect(carbonIntensityLevel).toBe('moderate')
})

it('calls getGeo from context', async () => {
  withRequests(successfulApiRequest())

  await ga.check()

  expect(getGeo).toHaveBeenCalled()
})

it('throws if lng/lat from getGeo is invalid', async () => {
  getGeo.mockReturnValue({ longitude: 190, latitude: -100 })

  await expect(ga.check()).rejects.toThrow('Lng/Lat malformed')
})

it('throws if API request is unsuccessful', async () => {
  withRequests(unsuccessfulApiRequest())

  await expect(ga.check()).rejects.toThrow(
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
