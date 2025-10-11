type TaskType = () => Promise<any>

/**
 * 带有错误重试功能的加载函数
 *
 * @param task 任务
 * @param onError 错误时的回调
 */
export function loadTaskWithRetry(task: TaskType, onError?: (retry: Function, fail: Function) => void) {
    const p = task()
    if (typeof onError !== 'function') {
        onError = function (retry, fail) {
            fail()
        }
    }
    return p.catch((err) => {
        return new Promise((resolve, reject) => {
            const retry = () => resolve(loadTaskWithRetry(task, onError))
            const fail = () => reject(err)
            onError(retry, fail)
        })
    })
}

/**
 * 固定重试次数
 *
 * @param task 任务
 * @param count 重试次数，默认一次
 */
export function loadTaskRetryFixCount(task: TaskType, count = 1) {
    return loadTaskWithRetry(task, (retry, fail) => {
        if (count <= 0) {
            fail()
        } else {
            count--
            retry()
        }
    })
}
/**
 * 异步任务队列
 *
 * @class
 * @class
 * @param limit 队列的窗口大小，默认为3
 */
export class TaskQueen {
    private runningCount: number
    private limit: number
    private queen: Array<any>
    /**
     * 构造函数
     *
     * @param limit 队列的窗口大小，默认为3
     */
    constructor(limit = 3) {
        this.limit = limit
        this.runningCount = 0
        this.queen = []
    }
    /**
     * 运行任务
     *
     * @param task 任务
     */
    async run(task: TaskType): Promise<void> {
        if (this.runningCount >= this.limit) {
            await new Promise((resolve, reject) => this.queen.push(resolve))
        }
        this.runningCount++
        try {
            return await task()
        } finally {
            this.runningCount--
            if (this.queen.length) {
                this.queen.shift()()
            }
        }
    }
}

/**
 * 批量执行任务
 *
 * @param tasks 任务
 * @param success 成功回调
 * @param fail 失败回调
 * @param windowSize 窗口大小
 */

export function loadTasks(tasks: TaskType[], success?: (res: any, index: number) => void, fail?: (err: any, index: number) => void, windowSize = 3) {
    const tq = new TaskQueen(windowSize)
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]
        tq.run(task).then(
            (res: any) => {
                if (typeof success === 'function') {
                    success(res, i)
                }
            },
            (err: any) => {
                if (typeof fail === 'function') {
                    fail(err, i)
                }
            }
        )
    }
}
