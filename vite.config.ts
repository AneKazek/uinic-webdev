import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import path from 'node:path';

export default defineConfig(({ command }) => ({
    define: {
        'import.meta.env.SUPABASE_URL': process.env.SUPABASE_URL,
        'import.meta.env.SUPABASE_ANON_KEY': process.env.SUPABASE_ANON_KEY,
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        ...(command === 'serve'
            ? [
                wayfinder({
                    formVariants: true,
                    command: 'php artisan wayfinder:generate --with-form',
                }),
              ]
            : []),
        visualizer({
            filename: 'bundle-visualizer.html',
            template: 'treemap',
            brotliSize: true,
        }),
        // Generate precompressed assets for production (Brotli & Gzip)
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 1024,
        }),
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 1024,
        }),
    ],
    resolve: {
        alias: {
            '@/components': path.resolve(__dirname, 'resources/js/components'),
            '@': path.resolve(__dirname, 'resources/js'),
            'next/image': path.resolve(__dirname, 'resources/js/lib/next-image-shim.tsx'),
            'next/link': path.resolve(__dirname, 'resources/js/lib/next-link-shim.tsx'),
            'next/navigation': path.resolve(__dirname, 'resources/js/lib/next-navigation-shim.ts'),
            'next/script': path.resolve(__dirname, 'resources/js/lib/next-script-shim.tsx'),
        },
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        hmr: {
            host: '127.0.0.1',
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            '@inertiajs/react',
            'lucide-react',
            '@radix-ui/react-label',
            '@radix-ui/react-dialog',
        ],
    },
    build: {
        sourcemap: false,
        cssCodeSplit: true,
        chunkSizeWarningLimit: 700,
        rollupOptions: {
            output: {
                manualChunks: {
                    recharts: ['recharts'],
                    framer: ['framer-motion'],
                    radix: [
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-tooltip',
                        '@radix-ui/react-select',
                        '@radix-ui/react-navigation-menu',
                        '@radix-ui/react-dropdown-menu',
                        '@radix-ui/react-accordion',
                    ],
                    supabase: ['@supabase/supabase-js'],
                    lucide: ['lucide-react'],
                },
            },
        },
    },
}));
