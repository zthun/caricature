import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: 'jsdom',
    singleThread: true,
    testTimeout: 30000,
    coverage: {
      provider: 'istanbul'
    }
  }
});
