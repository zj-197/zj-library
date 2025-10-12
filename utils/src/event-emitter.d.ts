type FnType = (...args: any[]) => void;
/**
 * 事件发射器
 *
 * @class
 * @class
 */
export default class EventEmitter {
    private events;
    private paddingEvents;
    constructor();
    /**
     * 监听事件
     *
     * @param event 事件名称
     * @param callback 回调函数
     */
    on(event: string | Array<string>, callback: FnType): void;
    /**
     * 移除监听事件，如果不传任何参数，则清空所有
     *
     * @param event 事件名称
     * @param callback 回调函数，如果不传则清空该事件下的所有侦听
     */
    off(event?: string | Array<string>, callback?: FnType): void;
    /**
     * 监听一次事件
     *
     * @param event 事件名称
     * @param callback 回调函数
     */
    once(event: string, callback: FnType): void;
    /**
     * 触发事件
     *
     * @param event 事件名称
     * @param args 回调函数的参数
     */
    emit(event: string, ...args: any[]): void;
}
export {};
