import { reactive } from 'vue'

/** 上下文钩子，常用于复杂的应用场景，比如分散到不同组件，不同模块之间需要共享或操作同一份数据时 */
export default function useContext<T extends Record<string, any>>() {
    const context = reactive<T>({} as T)
    return {
        context,
        setContext(key: string, value: any) {
            context[key] = value
        }
    }
}
