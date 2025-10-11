/**
 * @文件功能描述: 带有重置状态功能的钩子
 * @作者: 左建
 * @创建日期: 2025/9/1 15:25
 * @最后更新作者:
 * @最后更新日期:
 * @最新更新内容:
 */
import { reactive } from 'vue'
import { deepClone, merge } from '@zj-library/utils'

/** 带有重置原数据的钩子 */
export default function useResettableRef<T extends { [key: string]: any }>(
    state: T
): {
    state: T
    reset: (data?: T) => void
} {
    let stateRef: any = reactive(deepClone(state))
    return {
        state: stateRef,
        reset: (data) => {
            let cloneValue: any = data
            if (!cloneValue) {
                cloneValue = deepClone(state)
            } else {
                cloneValue = merge(deepClone(state), false, cloneValue)
            }
            for (const key of Object.keys(state)) {
                if (key in cloneValue) {
                    stateRef[key] = cloneValue[key]
                }
            }
        }
    }
}
