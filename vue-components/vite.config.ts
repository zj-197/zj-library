import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
const __dirname = dirname(fileURLToPath(import.meta.url))
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'index.ts')
            },
            name: '$ZJComponents',
            fileName: (format, entryName) => {
                if (format === 'cjs') return `${entryName}.${format}`
                return `${entryName}.${format}.js`
            },
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            external: ['vue', '@zj-library/utils', '@zj-library/vue-hooks', 'element-plus'],
            output: {
                exports: 'named',
                chunkFileNames: 'chunks/[name].[hash].js',
                globals: {
                    '@zj-library/utils': '$ZJUtils',
                    '@zj-library/vue-hooks': '$ZJHooks',
                    vue: 'Vue',
                    'element-plus': 'ElementPlus'
                }
            }
        }
    }
})
