/**
 * 等待多少秒钟，单位为毫秒
 *
 * @param ms 传入的值
 */
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 是否是对象
 *
 * @param value 传入的值
 */

export function isObject(value: any) {
    return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 深度克隆
 *
 * @param value 传入的指
 */
export function deepClone<T>(value: T): T {
    const cache = new Map()

    function _deepClone(value: any) {
        // 既非数组也非对象就不克隆，就原样返回
        if (!Array.isArray(value) && !isObject(value)) return value
        if (cache.has(value)) return cache.get(value)
        const copy = Array.isArray(value) ? [] : {}
        Object.setPrototypeOf(copy, Object.getPrototypeOf(value))
        cache.set(value, copy)
        for (const key of Object.getOwnPropertyNames(value)) {
            const desc = Object.getOwnPropertyDescriptor(value, key)
            if (desc) {
                if ('value' in desc) {
                    Object.defineProperty(copy, key, {
                        ...desc,
                        value: _deepClone(value[key])
                    })
                } else {
                    Object.defineProperty(copy, key, desc)
                }
            }
        }
        for (const symbol of Object.getOwnPropertySymbols(value)) {
            const symbolDesc = Object.getOwnPropertyDescriptor(value, symbol)
            symbolDesc && Object.defineProperty(copy, symbol, symbolDesc)
        }
        return copy
    }

    return _deepClone(value)
}

function isArrayOrObject(value: any) {
    return Array.isArray(value) || isObject(value)
}

/**
 * 合并对象
 *
 * @param target 目标对象
 * @param mergeArray 是否合并数组
 * @param sources 源对象
 */
export function merge(target: any, mergeArray: boolean, ...sources: any[]) {
    if (!isArrayOrObject(target)) return target
    for (let i = 0; i < sources.length; i++) {
        const source = sources[i]
        if (!isArrayOrObject(source)) {
            continue
        }
        for (const key in source) {
            if (Array.isArray(source[key])) {
                if (Array.isArray(target[key]) && mergeArray) {
                    merge(target[key], mergeArray, source[key])
                } else {
                    target[key] = source[key]
                }
            } else if (isObject(source[key])) {
                if (isObject(target[key])) {
                    merge(target[key], mergeArray, source[key])
                } else {
                    target[key] = source[key]
                }
            } else {
                target[key] = source[key]
            }
        }
    }
    return target
}

/**
 * 判断值是否为空
 *
 * @param value 判断值
 * @param isIncludeZero 是否包含0
 */
export function isEmpty(value: any, isIncludeZero = true) {
    switch (typeof value) {
        case 'undefined':
            return true
        case 'string':
            if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
            break
        case 'boolean':
            if (!value) return true
            break
        case 'number':
            if (value === 0) return isIncludeZero
            if (isNaN(value)) return true
            break
        case 'object':
            if (value === null || value.length === 0) return true
            for (const i in value) {
                return false
            }
            return true
    }
    return false
}

/**
 * 判断值是否不为空
 *
 * @param value 判断值
 */
export function isNotEmpty(value: any) {
    return !isEmpty(value)
}

/**
 * 数字后面添加 %
 *
 * @param value 传入的数值
 */
export function addPercentage(value: any): string {
    if (isEmpty(value, false)) return ''
    return String(value).endsWith('%') ? value : value + '%'
}

/**
 * 从对象中获取属性值
 *
 * @param obj 传入的对象
 * @param path 传入的path路径：a.b[0].c
 * @param placeholder 占位符, 默认为 --
 */
export function getPropertyValueByPath(obj: any, path: string, placeholder?: any) {
    if (isEmpty(obj)) return placeholder
    path = path.replace(/\[/g, '.').replace(/]/g, '')
    if (path.startsWith('.')) {
        path = path.slice(1)
    }
    let currentObj: any = obj
    for (const p of path.split('.')) {
        let value
        try {
            value = currentObj[p]
            currentObj = value
        } catch (e) {
            break;
        }
    }
    if (typeof placeholder !== 'undefined') {
        return isEmpty(currentObj, false) ? placeholder : currentObj
    }
    return currentObj
}

/**
 * 去除字符串中的 "-" 并转为小驼峰（第一个单词全小写，后续单词首字母大写）
 *
 * @param str 输入的横杠分隔字符串（如 "hello-world"）
 * @returns 小驼峰格式字符串（如 "helloWorld"）
 */
export function kebabToCamelCase(str: string): string {
    // 1. 按 "-" 分割字符串，过滤空字符（处理连续 "-" 或首尾 "-" 场景）
    const words = str.split('-').filter((word) => word.trim() !== '')

    // 2. 边界处理：若分割后无有效单词，返回空字符串
    if (words.length === 0) return ''
    if (words.length === 1) return words[0]
    // 3. 处理第一个单词（全小写）
    const firstWord = words[0].toLowerCase()

    // 4. 处理后续单词（首字母大写 + 其余小写）
    const restWords = words.slice(1).map((word) => {
        if (word.length === 0) return '' // 兜底空字符串（理论上已被 filter 过滤）
        return word[0].toUpperCase() + word.slice(1).toLowerCase()
    })

    // 5. 拼接所有单词，返回小驼峰结果
    return firstWord + restWords.join('')
}

/**
 * 将对象键转为小驼峰
 *
 * @param object 传入的对象
 */
export function getCameCaseObject<T>(object: T): T {
    const o = {} as any
    if (!isObject(object)) return object
    for (const key in object) {
        o[kebabToCamelCase(key)] = object[key]
    }
    return o
}

/** 空函数，常用于占位，避免重复创建函数 */
export function noop() {}

/**
 * 轮询函数， 带有暂停和恢复执行
 *
 * @param task 轮询任务，Promise
 * @param success 成功时的回调
 * @param fail 失败的回调
 * @param immediate 是否立即开始
 * @param step 每一个轮询的步进器
 * @param startWaitTime 初始等待时间（毫秒）
 */
export function polling(task: () => Promise<any>, success?: (res: any) => void, fail?: (res: any) => void, immediate = true, step = 20, startWaitTime = 100) {
    let start = startWaitTime
    let isPaused = false
    const _fn = async () => {
        if (isPaused) return
        task().then(
            async (res: any) => {
                typeof success === 'function' && success(res)
                await sleep((start += step))
                _fn()
            },
            (error: any) => {
                if (typeof fail === 'function') {
                    fail(error)
                }
                _fn()
            }
        )
    }
    immediate && _fn()
    return {
        /** 暂停执行 */
        paused() {
            isPaused = true
        },
        /**
         * 恢复执行
         *
         * @param isResetTime 是否重置等待时间为startWaitTime
         */
        resumed(isResetTime = false) {
            isPaused = false
            if (isResetTime) {
                start = startWaitTime
            }
            _fn()
        }
    }
}
