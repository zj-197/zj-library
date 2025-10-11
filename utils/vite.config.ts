import {defineConfig} from "vite";
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))
export default defineConfig({
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'index.ts'),
            },
            name: '$ZJUtils',
            fileName: (format, entryName) => {
                if (format === 'cjs') return `${entryName}.${format}`
                return `${entryName}.${format}.js`
            },
            formats: ["es", "cjs", "umd"],
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'chunks/[name].[hash].js',
            },
        },
    },
})




