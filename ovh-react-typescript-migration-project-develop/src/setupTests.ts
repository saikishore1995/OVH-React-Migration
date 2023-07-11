// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import { MessageChannel } from 'worker_threads'
import { cleanup } from '@testing-library/react'
import { createMocks } from 'react-idle-timer'
import { server } from './test/server'

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen()
  createMocks()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.MessageChannel = MessageChannel
})
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => {
  server.close()
  cleanup()
})
