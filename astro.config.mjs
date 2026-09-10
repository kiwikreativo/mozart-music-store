// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({ adapter: node({ mode: 'standalone' }), vite: { server: { fs: { deny: ['**/.private/**', '**/*.sqlite', '**/*.sqlite-*', '**/.env*', '**/*.{crt,pem}', '**/.git/**'] } } } });
