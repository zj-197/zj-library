import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let content = '\n'
// 组件
const cpns = []
// 指令
const directives = []

function handleCpns(cpnName) {
    let str = ''
    str += `export * from './src/${cpnName}/index'\n`
    str += `import ${cpnName} from './src/${cpnName}/index'\n`
    return str
}

function handleDirective(directiveName) {
    // 可能以后会有
    return ''
}

for (const fileName of fs.readdirSync(path.join(__dirname, '../src'), { encoding: 'utf8' })) {
    const name = path.basename(fileName)
    if (fs.existsSync(path.join(__dirname, '../src', fileName, 'index.ts'))) {
        if (fs.existsSync(path.join(__dirname, '../src', fileName, 'index.vue')) || fs.existsSync(path.join(__dirname, '../src', fileName, 'types.ts'))) {
            content += handleCpns(name)
            cpns.push(name)
        } else {
            content += handleDirective(name)
            directives.push(name)
        }
    }
}

content += `
import type { App, Plugin } from '@vue/runtime-core'
export const INSTALLED_KEY = Symbol('INSTALLED_KEY')

const makeInstaller = (components: Plugin[] = []) => {
    const install = (app: App) => {
        // @ts-ignore
        if (app[INSTALLED_KEY]) return
        // @ts-ignore
        app[INSTALLED_KEY] = true
        components.forEach((c) => app.use(c))
    }
    return {
        install
    }
}
export const ZjLibraryCp = makeInstaller([${cpns.join(', ')}])
export default ZjLibraryCp
`

fs.writeFile(
    path.join(__dirname, '../', 'index.ts'),
    content,
    {
        encoding: 'utf8',
        flag: 'w',
        flush: true
    },
    (err) => {}
)
