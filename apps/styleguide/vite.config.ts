import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// SvelteKit 3 reads its config from the Vite plugin, not svelte.config.js.
export default defineConfig(async () => ({
	plugins: [
		tailwindcss(),
		...(await sveltekit({
			adapter: adapter({ pages: 'build', assets: 'build', strict: true })
		}))
	]
}));
