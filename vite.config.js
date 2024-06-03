import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/', // Change this to your sub-directory or '/' if it's the root
	build: {
		outDir: 'dist',
	},
});
