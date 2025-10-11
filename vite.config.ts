import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))
import vue from '@vitejs/plugin-vue'
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'index.ts')
            },
            name: '$ZJ',
            fileName: (format, entryName) => {
                if (format === 'cjs') return `${entryName}.${format}`
                return `${entryName}.${format}.js`
            },
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            // 确保外部化处理那些
            // 你不想打包进库的依赖
            external: ['vue', '@zj-library/utils', '@zj-library/vue-components', '@zj-library/vue-hooks'],
            output: {
                // 2. 代码拆分的 Chunk 文件 → 输出到 custom-dist/chunks/
                chunkFileNames: 'chunks/[name].[hash].js',
                // 在 UMD 构建模式下为这些外部化的依赖
                // 提供一个全局变量
                globals: {
                    '@zj-library/utils': '$ZJUtils',
                    '@zj-library/vue-components': '$ZJComponents',
                    '@zj-library/vue-hooks': '$ZJHooks',
                    vue: 'Vue'
                }
            }
        }
    }
})
