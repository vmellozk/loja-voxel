import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  root: 'src', // raiz é src

  publicDir: '../public', // 📌 corrige a pasta pública

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        categorias: resolve(__dirname, 'src/pages/categorias.html'),
        productPage: resolve(__dirname, 'src/pages/productPage.html'),
      },
    },
    outDir: '../dist', // sai de src
    emptyOutDir: true,
  },
})
