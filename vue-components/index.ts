export * from './src/DatePicker/index.ts'
export * from './src/FormItem/index.ts'
export * from './src/LoadList/index.ts'
export * from './src/FormTable/index.ts'
export * from './src/SelectData/index.ts'
export * from './src/SugarButton/index.ts'
import type { App, Plugin } from '@vue/runtime-core'
import DatePicker from "./src/DatePicker/index.ts";
import FormItem from "./src/FormItem/index.ts";
import LoadList from "./src/LoadList/index.ts";
import FormTable from "./src/FormTable/index.ts";
import SelectData from "./src/SelectData/index.ts";
import SugarButton from "./src/SugarButton/index.ts";

const INSTALLED_KEY = Symbol('INSTALLED_KEY');
const makeInstaller = (components: Plugin[] = []) => {
    const install = (app: App) => {
        // @ts-ignore
        if (app[INSTALLED_KEY]) return
        // @ts-ignore
        app[INSTALLED_KEY] = true
        components.forEach((c) => app.use(c))
    }
    return {
        install,
    }
}
// 如果还有其他组件在这点加
export const ZjLibraryCp = makeInstaller([
    DatePicker,
    FormItem,
    LoadList,
    FormTable,
    SelectData,
    SugarButton
])
export default ZjLibraryCp
