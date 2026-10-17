import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// BASE_PATH é definido pelo fluxo do GitHub Actions (por exemplo "/dummy-sheet-osr/").
// Sem ele, o site fica na raiz, como no DummySheet original.
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [svelte()],
})
