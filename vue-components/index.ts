export * from './src/DatePicker/index'
export * from './src/FormItem/index'
export * from './src/LoadList/index'
export * from './src/FormTable/index'
export * from './src/SelectData/index'
export * from './src/SugarButton/index'
import type { App, Plugin } from '@vue/runtime-core'
import DatePicker from './src/DatePicker/index'
import FormItem from './src/FormItem/index'
import LoadList from './src/LoadList/index'
import FormTable from './src/FormTable/index'
import SelectData from './src/SelectData/index'
import SugarButton from './src/SugarButton/index'

const INSTALLED_KEY = Symbol('INSTALLED_KEY')
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
// 如果还有其他组件在这点加
export const ZjLibraryCp = makeInstaller([DatePicker, FormItem, LoadList, FormTable, SelectData, SugarButton])
export default ZjLibraryCp
