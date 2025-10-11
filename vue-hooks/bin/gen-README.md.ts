import { generate } from '../../bin/gen-simple-ts-doc/index.ts';
import {dirname, resolve} from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../../')
const vueHooks = resolve(__dirname, '../types/src');

const vueHooksH1 = 'vue-hooks 钩子函数'
const vueHooksDesc = '一些常用的钩子函数'

// 生成vue-hooks类型声明
generate({
    src: vueHooks,
    out: resolve(root, 'vitepress-docs/vue-hooks'),
    isOutputSingle: true,
    outputSingleConfig: {
        fileName: "index",
        h1: vueHooksH1,
        desc: vueHooksDesc,
    },
    titleMap: {}
})

// 生成vue-hooks类型声明
generate({
    src: vueHooks,
    out: resolve(root, 'vue-hooks'),
    isOutputSingle: true,
    outputSingleConfig: {
        fileName: "README",
        h1: vueHooksH1,
        desc: vueHooksDesc,
    },
    titleMap: {}
})

