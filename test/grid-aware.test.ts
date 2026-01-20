import { beforeEach, expect, it, vi, type MockInstance } from 'vitest'
import { http, HttpHandler, HttpResponse } from 'msw'

import { mockRequest } from './setup'
import {
  GridAware,
  GridAwareSession,
  type GridAwareGeo
} from '../src/grid-aware'

// Mock session storage (to store API token between requests).
class MockSession<T> implements GridAwareSession<T> {
  map: Map<string, T>

  constructor() {
    // The API is essentially a promisified Map, so use a Map underneath
    this.map = new Map()
  }

  set(key: string, value: T): Promise<T> {
    this.map.set(key, value)
    return Promise.resolve(value)
  }

  async get(key: string): Promise<T | undefined> {
    return this.map.get(key)
  }

  async has(key: string): Promise<boolean> {
    return this.map.has(key)
  }
}

let getGeo: MockInstance<() => GridAwareGeo>,
  session: GridAwareSession<string>,
  ga: GridAware

beforeEach(() => {
  getGeo = vi.fn().mockReturnValue({ longitude: 0, latitude: 51 })
  session = new MockSession<string>()

  ga = new GridAware({
    session: session,
    getGeo: getGeo as unknown as () => GridAwareGeo
  })
})

it('returns successfully returns CO2 value and above threshold boolean', async () => {
  withRequests(successfulApiRequest())

  const result = await ga.check()

  expect(result.co2Value).toBe(60)
  expect(result.co2AboveThreshold).toBe(true)
})

it('calls getGeo from context', async () => {
  withRequests(successfulApiLogin(), successfulApiRequest())

  await ga.check()

  expect(getGeo).toHaveBeenCalled()
})

it('throws if lng/lat from getGeo is invalid', async () => {
  getGeo.mockReturnValue({ longitude: 190, latitude: -100 })

  await expect(ga.check()).rejects.toThrow('Lng/Lat malformed')
})

it('throws if a region not found', async () => {
  getGeo.mockReturnValue({ longitude: 0, latitude: 0 })

  await expect(ga.check()).rejects.toThrow('Region not found')
})

it('throws if API login is unsuccessful', async () => {
  withRequests(expiredSession(), unsuccessfulApiLogin())

  await expect(ga.check()).rejects.toThrow(
    'Bad response from API token request'
  )
})

it('stores the API token in the session after successful API login', async () => {
  withRequests(
    expiredSession({ once: true }),
    successfulApiLogin(),
    successfulApiRequest({ once: true })
  )

  await ga.check()

  await expect(session.get('api-token')).resolves.toBe('MOCK_AUTH_TOKEN')
})

function withRequests(...requests: HttpHandler[]) {
  mockRequest.use(...requests)
}

interface RequestMockOpts {
  once: boolean
}

function successfulApiLogin() {
  return http.get('https://api.watttime.org/login', () => {
    return HttpResponse.json({ token: 'MOCK_AUTH_TOKEN' })
  })
}

function successfulApiRequest(opts?: RequestMockOpts) {
  return http.get(
    'https://api.watttime.org/v3/signal-index',
    ({ request }) => {
      const url = new URL(request.url)

      // Ensure query params are provided,
      if (!url.searchParams.get('signal_type')) {
        return HttpResponse.json(
          {
            error: 'MISSING_SIGNAL_TYPE',
            message:
              'You must provide a valid signal type. Valid signal types are co2_moer',
            docs: 'https://docs.watttime.org/'
          },
          { status: 400 }
        )
      }
      if (!url.searchParams.get('region')) {
        return HttpResponse.json(
          {
            error: 'MISSING_REGION',
            message:
              'You must provide a valid region. You may query /region-from-loc to determine the region for a given location',
            docs: 'https://docs.watttime.org/#tag/GET-Regions-and-Maps/operation/get_reg_loc_v3_region_from_loc_get'
          },
          { status: 400 }
        )
      }

      return HttpResponse.json({ data: [{ value: 60 }] })
    },
    opts
  )
}

function expiredSession(opts?: RequestMockOpts) {
  return http.get(
    'https://api.watttime.org/v3/signal-index',
    () => {
      return HttpResponse.html(
        `<html>
<head><title>401 Authorization Required</title></head>
<body>
<center><h1>401 Authorization Required</h1></center>
<hr><center>nginx</center>
</body>
</html>`,
        { status: 401 }
      )
    },
    opts
  )
}

function unsuccessfulApiLogin() {
  return http.get('https://api.watttime.org/login', () => {
    return HttpResponse.html(
      `<html>
<head><title>403 Forbidden</title></head>
<body>
<center><h1>403 Forbidden</h1></center>
<hr><center>nginx</center>
</body>
</html>`,
      { status: 403 }
    )
  })
}
