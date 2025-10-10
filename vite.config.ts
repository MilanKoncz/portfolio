import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import path from 'path';

/**
 * Vite configuration for the SPA (React + TypeScript + Tailwind CSS)
 * - Adds React SWC plugin for fast TS/JS transformation
 * - Registers a basic PWA service worker with autoUpdate
 * - Emits gzip-compressed assets for better network performance
 * - Defines manual chunks to keep vendor/ui deps cached efficiently
 */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Milan Koncz - Portfolio',
        short_name: 'Milan Koncz',
        description: 'Personal portfolio website showcasing my work and skills',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    // Aliases can be added here if needed in the future
    alias: {},
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react'],
        },
      },
    },
  },
});
