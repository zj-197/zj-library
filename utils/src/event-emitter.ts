type FnType = (...args: any[]) => void

function invokeWithErrorHandling(handler: Function, args: Array<any>, info: string) {
    let res
    try {
        res = args ? handler.apply(null, args) : handler.call(null)
        if (res && res.then && !res._handled) {
            res.catch((e: any) => {
                console.error(info + ' (Promise/async)')
                console.error(e)
            })
            res._handled = true
        }
    } catch (e) {
        console.error(info)
        console.error(e)
    }
    return res
}

/**
 * 事件发射器
 *
 * @class
 * @class
 */
export default class EventEmitter {
    private events: { [key: string]: Set<FnType> | null }
    private paddingEvents: { [key: string]: Array<Array<any>> | null }
    constructor() {
        this.events = Object.create(null)
        // 待触发的事件
        this.paddingEvents = Object.create(null)
    }
    /**
     * 监听事件
     *
     * @param event 事件名称
     * @param callback 回调函数
     */
    on(event: string | Array<string>, callback: FnType) {
        if (Array.isArray(event)) {
            for (const item of event) {
                this.on(item, callback)
            }
            return
        }
        let cbs = this.events[event]
        if (!cbs) {
            cbs = this.events[event] = new Set()
        }
        typeof callback === 'function' && cbs.add(callback)
        // 查看是否之前有该事件没触发的。
        const args = this.paddingEvents[event]
        if (Array.isArray(args)) {
            args.forEach((arg) => {
                const info = `future event handler for "${event}"`
                invokeWithErrorHandling(callback, arg, info)
            })
            // 清空
            this.paddingEvents[event] = null
        }
    }
    /**
     * 移除监听事件，如果不传任何参数，则清空所有
     *
     * @param event 事件名称
     * @param callback 回调函数，如果不传则清空该事件下的所有侦听
     */
    off(event?: string | Array<string>, callback?: FnType) {
        // 如果参数为空，那么直接清除所有事件
        if (!arguments.length || !event) {
            this.events = Object.create(null)
            return
        }
        // 如果是数组，说明要清除多个
        if (Array.isArray(event)) {
            for (let ev of event) {
                this.off(ev, callback)
            }
            return
        }
        const cbs = this.events[event]
        if (!cbs) {
            return
        }
        // 如果callback不存在，那么就清除所有
        if (!callback) {
            this.events[event] = null
            return
        }
        for (let cb of cbs) {
            // @ts-ignore
            if (cb === callback || cb.fn === callback) {
                cbs.delete(cb)
                break
            }
        }
    }
    /**
     * 监听一次事件
     *
     * @param event 事件名称
     * @param callback 回调函数
     */
    once(event: string, callback: FnType) {
        const fn = (...args: any[]) => {
            const info = `once event handler for "${event}"`
            invokeWithErrorHandling(callback, args, info)
            this.off(event, fn)
        }
        fn.fn = callback
        this.on(event, fn)
    }
    /**
     * 触发事件
     *
     * @param event 事件名称
     * @param args 回调函数的参数
     */
    emit(event: string, ...args: any[]) {
        let cbs = this.events[event]
        // 如果不存在，说明还没有人监听，这个时候先存起，方便之后有人来监听了，在on里面触发
        if (!cbs) {
            ;(this.paddingEvents[event] || (this.paddingEvents[event] = [])).push(args)
        } else {
            for (const cb of cbs) {
                const info = `event handler for "${event}"`
                invokeWithErrorHandling(cb, args, info)
            }
        }
    }
}
