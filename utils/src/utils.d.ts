/**
 * 等待多少秒钟，单位为毫秒
 *
 * @param ms 传入的值
 */
export declare function sleep(ms: number): Promise<unknown>;
/**
 * 是否是对象
 *
 * @param value 传入的值
 */
export declare function isObject(value: any): boolean;
/**
 * 深度克隆
 *
 * @param value 传入的指
 */
export declare function deepClone<T>(value: T): T;
/**
 * 合并对象
 *
 * @param target 目标对象
 * @param mergeArray 是否合并数组
 * @param sources 源对象
 */
export declare function merge(target: any, mergeArray: boolean, ...sources: any[]): any;
/**
 * 判断值是否为空
 *
 * @param value 判断值
 * @param isIncludeZero 是否包含0
 */
export declare function isEmpty(value: any, isIncludeZero?: boolean): boolean;
/**
 * 判断值是否不为空
 *
 * @param value 判断值
 */
export declare function isNotEmpty(value: any): boolean;
/**
 * 数字后面添加 %
 *
 * @param value 传入的数值
 */
export declare function addPercentage(value: any): string;
/**
 * 从对象中获取属性值
 *
 * @param obj 传入的对象
 * @param path 传入的path路径：a.b[0].c
 * @param placeholder 占位符, 默认为 --
 */
export declare function getPropertyValueByPath(obj: any, path: string, placeholder?: any): any;
/**
 * 去除字符串中的 "-" 并转为小驼峰（第一个单词全小写，后续单词首字母大写）
 *
 * @param str 输入的横杠分隔字符串（如 "hello-world"）
 * @returns 小驼峰格式字符串（如 "helloWorld"）
 */
export declare function kebabToCamelCase(str: string): string;
/**
 * 将对象键转为小驼峰
 *
 * @param object 传入的对象
 */
export declare function getCameCaseObject<T>(object: T): T;
/** 空函数，常用于占位，避免重复创建函数 */
export declare function noop(): void;
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
export declare function polling(task: () => Promise<any>, success?: (res: any) => void, fail?: (res: any) => void, immediate?: boolean, step?: number, startWaitTime?: number): {
    /** 暂停执行 */
    paused(): void;
    /**
     * 恢复执行
     *
     * @param isResetTime 是否重置等待时间为startWaitTime
     */
    resumed(isResetTime?: boolean): void;
};
