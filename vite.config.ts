/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import * as path from 'path';

const getCache = ({ name, urlPattern }) => ({
  urlPattern,
  handler: 'CacheFirst' as const,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days.
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['**/*'],
      injectRegister: 'script',
      manifest: {
        background_color: '#190B17',
        categories: ['entertainment', 'games', 'social'],
        description: 'marvin.best, des histoires sorties de son contexte...',
        dir: 'ltr',
        display: 'standalone',
        icons: [
          {
            sizes: '192x192',
            src: '/icons/192.png',
            type: 'image/png',
          },
          {
            sizes: '384x384',
            src: '/icons/384.png',
            type: 'image/png',
          },
          {
            sizes: '512x512',
            src: '/icons/512.png',
            type: 'image/png',
          },
          {
            sizes: '1024x1024',
            src: '/icons/1024.png',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: '/icons/512.png',
            type: 'image/png',
          },
        ],
        id: 'marvin.best',
        lang: 'fr-FR',
        name: 'marvin.best',
        orientation: 'portrait',
        screenshots: [
          {
            sizes: '512x512',
            src: '/icons/512.png',
            type: 'image/png',
          },
        ],
        short_name: 'marvin.best',
        start_url: '/',
        theme_color: '#E83668',
      },
      workbox: {
        globPatterns: ['**/*'],
        runtimeCaching: [
          getCache({
            urlPattern: ({ url }) => /\/api\/people\?/.test(url.href),
            name: "api-cache-people",
          }),
          getCache({
            urlPattern: ({ url }) => /^\/api\/people\/light/.test(url.pathname),
            name: "api-cache-people-options",
          }),
        ]
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@api',
        replacement: path.resolve(__dirname, 'src/api'),
      },
      {
        find: '@app',
        replacement: path.resolve(__dirname, 'src/app'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/shared/components'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
      {
        find: '@helpers',
        replacement: path.resolve(__dirname, 'src/helpers'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/shared/hooks'),
      },
      {
        find: '@home',
        replacement: path.resolve(__dirname, 'src/home'),
      },
      {
        find: '@images',
        replacement: path.resolve(__dirname, 'src/images'),
      },
      {
        find: '@mocks',
        replacement: path.resolve(__dirname, 'src/mocks'),
      },
      {
        find: "@people",
        replacement: path.resolve(__dirname, "src/people"),
      },
      {
        find: "@sentences",
        replacement: path.resolve(__dirname, "src/sentences"),
      },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, 'src/shared'),
      },
      {
        find: "@src",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles'),
      },
      {
        find: '@tests',
        replacement: path.resolve(__dirname, 'src/tests'),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['html'],
    },
  },
});
