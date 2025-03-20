import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// Étendre les matchers de test avec ceux de jest-dom
expect.extend(matchers)

// Nettoyer automatiquement après chaque test
afterEach(() => {
  cleanup()
}) 