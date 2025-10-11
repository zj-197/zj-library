import { generate } from '../../bin/gen-simple-ts-doc/index.ts'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const utils = resolve(__dirname, '../types/src')
const root = resolve(__dirname, '../../')
const utilsDesc = '一些常见的工具函数'
const utilsH1 = '工具函数'
// 生成工具函数类型声明
generate({
    src: utils,
    out: resolve(root, 'utils'),
    isOutputSingle: true,
    outputSingleConfig: {
        fileName: 'README',
        desc: utilsDesc,
        h1: utilsH1
    },
    titleMap: {}
})
// 生成工具函数类型声明
generate({
    src: utils,
    out: resolve(root, 'vitepress-docs/utils'),
    isOutputSingle: true,
    outputSingleConfig: {
        fileName: 'index',
        desc: utilsDesc,
        h1: utilsH1
    },
    titleMap: {}
})
