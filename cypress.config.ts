import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    supportFile: 'cypress/support/e2e.ts',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
}) 