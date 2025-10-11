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
            name: '$ZJHooks',
            fileName: (format, entryName) => {
                if (format === 'cjs') return `${entryName}.${format}`
                return `${entryName}.${format}.js`
            },
            formats: ["es", "cjs", "umd"],
        },
        rollupOptions: {
            external: ['vue', '@zj-library/utils', '@zj-library/vue-components', '@zj-library/vue-hooks'],
            output: {
                chunkFileNames: 'chunks/[name].[hash].js',
                globals: {
                    '@zj-library/vue-components': '$ZJVueComponents',
                    '@zj-library/utils': '$ZJUtils',
                    '@zj-library/vue-hooks': '$ZJHooks',
                    vue: 'Vue',
                },
            },
        },
    },
})




