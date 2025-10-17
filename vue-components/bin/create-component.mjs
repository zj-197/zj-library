import path from 'node:path'
import fs from 'node:fs'
import {fileURLToPath} from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
let cpName = process.argv[2];
cpName = cpName.slice(0, 1).toUpperCase() + cpName.slice(1);
const cpDir = path.join(__dirname, '../src', cpName)
fs.mkdirSync(cpDir, { recursive: true });

function createFile (fileName, content) {
  fs.writeFile(path.join(cpDir, fileName), content, {
    encoding: 'utf-8',
    mode: 0o644,
    flag: 'wx'
  }, (err) => {
  })
}

const indexTs = `
import { withInstall } from '../install'
import type { SFCWithInstall } from '../component-install-types'
import ZJ${cpName} from './index.vue'
export const ${cpName}: SFCWithInstall<typeof ZJ${cpName}> = withInstall(ZJ${cpName})

export default ${cpName}

export * from './types'
export type ${cpName}Instance = InstanceType<typeof ZJ${cpName}> & unknown
`

const indexVue = `
<script setup lang="ts">
import type {${cpName}Props} from './types'
defineOptions({
    name: "${cpName}"
})
const props = withDefaults(defineProps<${cpName}Props>(), {
   
})
</script>

<template>
    <div class="${cpName}"></div>
</template>
`
const typesTs = `
export type ${cpName}Props = {
   
}
`

createFile('index.ts', indexTs)
createFile('index.vue', indexVue)
createFile('types.ts', typesTs)


