import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'

export const mockRequest = setupServer()

// Start server before all tests
beforeAll(() => mockRequest.listen({ onUnhandledRequest: 'error' }))

// Close server after all tests
afterAll(() => mockRequest.close())

// Reset handlers after each test for test isolation
afterEach(() => mockRequest.resetHandlers())

// Enable debugging logging for MSW
if (process.env.DEBUG_MSW) {
  mockRequest.events.on('request:start', ({ request }) => {
    console.log('Outgoing:', request.method, request.url)
  })
}
