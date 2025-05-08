// vercel.config.mjs - Special configuration for Vercel deployment
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import path from 'path';
import ignoreTypeScriptErrors from './vite-plugin-ignore-ts-errors';

// Special Vercel-specific configuration that skips TS type checking during build
export default defineConfig({
    plugins: [
        ignoreTypeScriptErrors(),
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
    resolve: {
        alias: {
            '~': path.resolve('./app'),
            '@react-router/dev/config': path.resolve('./.react-router/types/dev/config.ts'),
            '@react-router/dev/routes': path.resolve('./.react-router/types/dev/routes.ts'),
        },
    },
    esbuild: {
        // Skip type checking during build
        legalComments: 'none',
        tsconfigRaw: {
            compilerOptions: {
                skipLibCheck: true,
                noEmit: true,
            }
        }
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
            onwarn(warning, warn) {
                // Ignore certain warnings
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
                    warning.code === 'CIRCULAR_DEPENDENCY' ||
                    warning.message.includes('@react-router/dev')) {
                    return;
                }
                warn(warning);
            },
        },
    },
});
