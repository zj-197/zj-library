/**
 * 等待多少秒钟，单位为毫秒
 *
 * @param ms 传入的值
 * @example
 * sleep(20).then(() => {
 *     // 做点什么
 *  }) 等待20毫秒之后
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 是否是对象
 *
 * @param value 传入的值
 * @example
 * isObject({}) => true; isObject([]) => false
 */

export function isObject(value: any) {
    return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 深度克隆, 会克隆原型和symbol
 *
 * @param value 传入的指
 * @example
 * deepClose({a: 1, b: 2, c: {d: 'e'}, f: [1, 2], g: Symbol('f'), date: new Date()}) =>
 * 新对象{a: 1, b: 2, c: {d: 'e'}, f: [1, 2], g: Symbol('f'), date: xxx}, date为以前的对象
 * 这点针对普通对象和数组进行克隆，其他对象不进行任何操作
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
/**
 * 是否是普通对象或者数组
 *
 * @param value 传入的指
 * @example
 * isArrayOrObject({}) => true
 * isArrayOrObject([]) => true
 * isArrayOrObject(new Date()) => false
 * isArrayOrObject(new Set()) => false
 * .... 其他均为false
 *
 */
export function isArrayOrObject(value: any) {
    return Array.isArray(value) || isObject(value)
}

/**
 * 合并对象
 *
 * @param target 目标对象
 * @param mergeArray 是否合并数组
 * @param sources 源对象
 * @example
 * const target = {a: 'b', e: [2, {f: 'd'}, {g: 'h'}] }; const source = {c: 'd', e: [1]}
 * merge(target, false, source) => {a: 'b', c: 'd', e: [1]}
 * merge(target, true, source) => {a: 'b', c: 'd', e: [1, {f: 'd'}, {g: 'h'}]}
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
 * @param value 判断值, 常规的空值：'', null, undefined, NaN, false 等都会判定为空
 * @param isIncludeZero 是否包含0
 * @example
 * // 默认将0也判定为空
 * isEmpty(0) => true
 * // 将0判定为不为空
 * isEmpty(0, false) => false
 *
 * // 空对象判定为空
 * isEmpty({}) => true;
 * // 空数组判定为空
 * isEmpty([]) => true
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
 * 判断值是否不为空，相当于 !isEmpty(value)
 *
 * @param value 判断值, 常规的空值：'', null, undefined, NaN, false 等都会判定为空
 * @param isIncludeZero 是否包含0
 * @example
 * // 默认将0也判定为0
 * isNotEmpty(0) => false
 * // 将0判定为不为空
 * isNotEmpty(0, false) => true
 *
 * // 空对象判定为空
 * isNotEmpty({}) => false;
 * // 空数组判定为空
 * isNotEmpty([]) => false
 */
export function isNotEmpty(value: any, isIncludeZero = true) {
    return !isEmpty(value, isIncludeZero)
}

/**
 * 数字后面添加 %
 *
 * @param value 传入的数值
 * @param isDecimal 是否处理小数：0.8534 => 85.3
 * @example
 * addPercentage(10) => 10%
 * addPercentage(0.4569, true) => 45.7%
 * addPercentage('10%') => 10%
 * 其他类型的值 返回空字符串
 */
export function addPercentage(value: any, isDecimal = false): string {
    if (typeof value === 'number' || typeof value === 'string') {
        if (isDecimal) {
            // @ts-ignore
            value = parseFloat(value) * 100
            value = value.toFixed(2)
        }
        return String(value).endsWith('%') ? value : value + '%'
    }
    return ''

}

/**
 * 从对象中获取属性值
 *
 * @param obj 传入的对象
 * @param path 传入的path路径：a.b[0].c
 * @param placeholder 为空时的占位符
 * @example
 * const obj = {a:{b: [1]}}
 * getPropertyValueByPath(obj, 'a.b[0]') => 1
 * getPropertyValueByPath(obj, 'a.b[1]', '--') => --
 */
export function getPropertyValueByPath(obj: Record<any, any>, path: string, placeholder?: any) {
    if (isEmpty(obj)) {
        return typeof placeholder !== 'undefined' ? placeholder : obj
    }
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
            break
        }
    }
    if (typeof placeholder !== 'undefined') {
        return isEmpty(currentObj, false) ? placeholder : currentObj
    }
    return currentObj
}

/**
 * 设置对象的属性值
 *
 * @param obj 传入的对象
 * @param path 传入的path路径
 * @param value 设置的值
 * @example
 * const obj = {a:{b: [[{e: 'd'}]]}}
 * setPropertyValueByPath(obj, 'a.b[0][1].c', 'g') => {a:{b: [[{e: 'd'}, {c: 'g'}]]}}
 */
export function setPropertyValueByPath<T>(obj: T, path: string, value: any) {
    const paths = path
        .replace(/\[/g, '.')
        .split('.')
        .filter((x) => x)
    let currentObj: any = obj
    for (let i = 0; i < paths.length - 1; i++) {
        const _p = paths[i].replace(/]/, '')
        if (!currentObj[_p]) {
            // 说明是数组
            if (paths[i + 1].endsWith(']')) {
                currentObj[_p] = []
            } else {
                currentObj[_p] = {}
            }
        }
        currentObj = currentObj[_p]
    }
    currentObj[paths[paths.length - 1].replace(']', '')] = value
    return obj
}

/**
 * Kebab（"-"分割）转为小驼峰（第一个单词全小写，后续单词首字母大写）
 *
 * @param str 输入的横杠分隔字符串（如 "hello-world"或"Hello-World"）=> helloWorld
 * @returns 小驼峰格式字符串（如 "helloWorld"）
 * @example
 * kebabToCamelCase('hello-world') => helloWorld
 * kebabToCamelCase('Hello-World') => helloWorld
 * kebabToCamelCase('HeLlo') => hello
 */
export function kebabToCamelCase(str: string): string {
    // 1. 按 "-" 分割字符串，过滤空字符（处理连续 "-" 或首尾 "-" 场景）
    const words = camelCaseToKebab(str).split('-').filter((word) => word.trim() !== '')
    // 2. 边界处理：若分割后无有效单词，返回空字符串
    if (words.length === 0) return ''
    // 3. 处理第一个单词（全小写）
    const firstWord = words[0]
    // 4. 处理后续单词（首字母大写 + 其余小写）
    const restWords = words.slice(1).map((word) => {
        if (word.length === 0) return '' // 兜底空字符串（理论上已被 filter 过滤）
        return word[0].toUpperCase() + word.slice(1)
    })

    // 5. 拼接所有单词，返回小驼峰结果
    return firstWord + restWords.join('')
}

/**
 * 小驼峰转为kebab（"-"分割）
 *
 * @param str 输入的横杠分隔字符串（如 "helloWorld"或"HelloWorld"）=> hello-world
 * @returns 小驼峰格式字符串（如 "hello-world"）
 * @example
 * camelCaseToKebab("helloWorld") => hello-world
 * camelCaseToKebab("FooBar") => foo-bar
 */
export function camelCaseToKebab(str: string) {
    const hyphenateRE = /([^-])([A-Z])/g
    return str.replace(hyphenateRE, '$1-$2').toLowerCase()
}

/**
 * 将对象键转为小驼峰
 *
 * @param object 传入的对象
 * @example
 * const obj = {a: 'b', 'foo-bar': 'fooBar', CameCase: 'CameCase'}
 * getCameCaseObject(obj) => {a: 'b', fooBar: 'fooBar', cameCase: 'CameCase'}
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
 * @param task 轮询一个Promise任务
 * @param success 成功时的回调
 * @param fail 失败的回调
 * @param immediate 是否立即开始
 * @param step 每一次轮询后，增加的时间，单位毫秒
 * @param startWaitTime 初始等待时间（毫秒）
 * @example
 * const task = async () => {}
 * const pollHandler = polling(task)
 * pollHandler.paused() // 暂停
 * pollHandler.resumed() // 恢复执行
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

/**
 * 判断一个值是否是原始类型
 *
 * @param value 传入的值
 * @example
 * isPrimitive(对象) => false
 * isPrimitive(() => {}) => false
 * 其他情况均为true
 */
export function isPrimitive(value: any) {
    if (value && typeof value === 'object') return false
    if (typeof value === 'function') return false
    return true
}

/**
 * 判断两个值是否相等， 原始值通过Object.is判断，非原始值递归判断
 *
 * @param v1 值一
 * @param v2 值二
 * @example
 * isEquals('foo', 'bar') => false
 * isEquals({a: 'b', c: {d: 'e'}}, 'bar') => false
 * isEquals({a: 'b', c: {d: 'e'}}, {a: 'b', c: {d: 'e'}}) => true
 */

export function isEquals(v1: any, v2: any): boolean {
    if (isPrimitive(v1) || isPrimitive(v2)) {
        return Object.is(v1, v2)
    }
    // 长度不同认为不同
    if (Object.keys(v1).length !== Object.keys(v2).length) return false
    for (const key in v1) {
        // 如果key在v2当中的话，在进行比较
        if (key in v2) {
            if (!isEquals(v1[key], v2[key])) return false
        } else {
            return false
        }
    }
    return true
}

/**
 * 数组去重，重的概念：原始类型用Object.is比较，非原始类型递归Object.is比较
 *
 * @param list 需要去重的数组
 * @example
 * // 内部使用isEquals去比较
 * uniqueArray([{a: 'b', c: 'd'}, { a: 'b' }, {a: 'b'}, 1, 1, 'foo', 'foo', 'bar']) => [{a: 'b', c: 'd'}, {a: 'b'}, 1,'foo','bar']
 */

export function uniqueArray<T>(list: Array<T>): T[] {
    if (!Array.isArray(list)) return []
    const res = []

    outer: for (const item of list) {
        for (const r of res) {
            if (isEquals(item, r)) {
                continue outer
            }
        }
        res.push(item)
    }
    return res
}

/**
 * 格式化时间
 *
 * @param dateTime 需要格式化的时间戳
 * @param formatStr 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns 返回格式化后的字符串
 * @example
 * formatDate() => 当前时间，比如：2025-10-10
 * formatDate(new Date(2021, 9, 15, 23, 59, 9), 'yyyy-mm-dd hh:MM:ss') => 2021-10-15 23:59:09
 */
export function formatDate(dateTime: any = null, formatStr = 'yyyy-mm-dd') {
    let date
    // 若传入时间为假值，则取当前时间
    if (!dateTime) {
        date = new Date()
    }
    // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
    else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
        date = new Date(dateTime * 1000)
    }
    // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
    else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
        date = new Date(Number(dateTime))
    }
    // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
    // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
    else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
        date = new Date(dateTime.replace(/-/g, '/'))
    }
    // 其他都认为符合 RFC 2822 规范
    else {
        date = new Date(dateTime)
    }

    const timeSource: any = {
        y: date.getFullYear().toString(), // 年
        m: (date.getMonth() + 1).toString().padStart(2, '0'), // 月
        d: date.getDate().toString().padStart(2, '0'), // 日
        h: date.getHours().toString().padStart(2, '0'), // 时
        M: date.getMinutes().toString().padStart(2, '0'), // 分
        s: date.getSeconds().toString().padStart(2, '0') // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }

    for (const key of Object.keys(timeSource)) {
        const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
        if (ret) {
            // 年可能只需展示两位
            const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
            formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
        }
    }

    return formatStr
}

/**
 * 时间戳转为多久之前
 *
 * @param timestamp 时间戳
 * @param format 格式化规则如果为时间格式字符串，超出一定时间范围，返回固定的时间格式； 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns 转化后的内容
 * @example
 * // 以当前时间为基准
 * timeFrom() => 刚刚
 * // 指定时间距离当前时间过去了多少
 * timeFrom(new Date(2025, 9, 10, 18, 10, 9).getTime()) => 2025-10-10 或 刚刚 或 几分钟前 或 几个小时前 或 几天前
 * timeFrom(new Date(2025, 9, 10, 18, 10, 9).getTime(), 'yyyy-mm-dd hh:MM:ss') => 2025-10-10 18:10:09 或 刚刚 或 几分钟前 或 几个小时前 或 几天前
 * timeFrom(new Date(2025, 9, 10, 18, 10, 9).getTime(), false) => 2025-10-10 或 刚刚 或 几分钟前 或 几个小时前 或 几天前 或 几个月前 或 几年前
 */
export function timeFrom(timestamp: null | string | number = null, format: string | false = 'yyyy-mm-dd') {
    if (timestamp == null) timestamp = Number(new Date())
    // @ts-ignore
    timestamp = parseInt(timestamp)
    // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
    if (timestamp.toString().length == 10) timestamp *= 1000
    let timer = new Date().getTime() - timestamp
    timer = Math.floor(timer / 1000)
    // 如果小于5分钟,则返回"刚刚",其他以此类推
    let tips = ''
    switch (true) {
        case timer < 300:
            tips = '刚刚'
            break
        case timer >= 300 && timer < 3600:
            tips = `${Math.floor(timer / 60)}分钟前`
            break
        case timer >= 3600 && timer < 86400:
            tips = `${Math.floor(timer / 3600)}小时前`
            break
        case timer >= 86400 && timer < 2592000:
            tips = `${Math.floor(timer / 86400)}天前`
            break
        default:
            // 如果format为false，则无论什么时间戳，都显示xx之前
            if (format === false) {
                if (timer >= 2592000 && timer < 365 * 86400) {
                    tips = `${Math.floor(timer / (86400 * 30))}个月前`
                } else {
                    tips = `${Math.floor(timer / (86400 * 365))}年前`
                }
            } else {
                tips = formatDate(timestamp, format)
            }
    }
    return tips
}

/**
 * 生成sku数组，数组里面每一项都是一条sku组合，其实就是计算笛卡尔积。
 * @param attrs 属性列表
 * @example
 * genSkus({color: ['red', 'green', 'blue'], shape: ['circle', 'round'], size: ['small', 'medium', 'large']}) =>
 * 生成 [{color: 'red', size: 'small', shape: 'circle'}, ...]
 * @returns skus数组
 */
export function genSkus<T extends Record<string, readonly any[]>>(attrs: T): Array<{[K in keyof T]: T[K][number]}> {
    const keys = Object.keys(attrs)
    if (keys.length === 0) return []
    const combine = (index: number, template:any) => {
        if (index >= keys.length) return [template];
        const key = keys[index];
        const values = attrs[key];
        const res:any[] = []
        for (const value of values) {
            res.push(...combine(index + 1, { ...template, [key]: value }))
        }
        return res
    }
    return combine(0, {})
}

/**
 * 去除地址中前后的斜杠
 * @param url 属性列表
 * @example
 * normalizeUrl('//a/b/c//') => 'a/b/c'
 * normalizeUrl('/a/b/c/') => 'a/b/c'
 */
export function normalizeUrl (url: string): string {
    return url.replace(/^\/+|\/+$/g, '')
}
