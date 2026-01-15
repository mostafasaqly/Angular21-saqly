import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.vitest.ts'],
    include: ['src/**/*.vitest.spec.ts'],
  },
});
