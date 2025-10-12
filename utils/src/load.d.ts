type TaskType = () => Promise<any>;
/**
 * 带有错误重试功能的加载函数
 *
 * @param task 任务
 * @param onError 错误时的回调
 */
export declare function loadTaskWithRetry(task: TaskType, onError?: (retry: Function, fail: Function) => void): Promise<any>;
/**
 * 固定重试次数
 *
 * @param task 任务
 * @param count 重试次数，默认一次
 */
export declare function loadTaskRetryFixCount(task: TaskType, count?: number): Promise<any>;
/**
 * 异步任务队列
 *
 * @class
 * @class
 * @param limit 队列的窗口大小，默认为3
 */
export declare class TaskQueen {
    private runningCount;
    private limit;
    private queen;
    /**
     * 构造函数
     *
     * @param limit 队列的窗口大小，默认为3
     */
    constructor(limit?: number);
    /**
     * 运行任务
     *
     * @param task 任务
     */
    run(task: TaskType): Promise<void>;
}
/**
 * 批量执行任务
 *
 * @param tasks 任务
 * @param success 成功回调
 * @param fail 失败回调
 * @param windowSize 窗口大小
 */
export declare function loadTasks(tasks: TaskType[], success?: (res: any, index: number) => void, fail?: (err: any, index: number) => void, windowSize?: number): void;
export {};
