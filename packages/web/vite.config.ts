import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		proxy: {
			'/api/': {
				target: process.env.API_BASE_URL || 'http://localhost:4000',
				changeOrigin: true,
				secure: false
			}
		}
	}
});
