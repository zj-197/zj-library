import type { BaseContextType, UseChartOptions, Config, ContextType } from './type';
interface MergeXAxisType {
    (spaceFill: string | number, ...array: Array<Array<any>>): {
        date: Array<string>;
        data: Array<Array<string | number>>;
    };
    format: (list: Array<any>, mapKey: {
        date: string;
        data: string;
    }) => Array<any>;
}
/**
 * 合并x轴
 *
 * @example
 *     mergeXAxis([{date: 2025-01-12, data: 12}, {date: 2025-01-13, data: 13}], [{date: 2025-01-06, data: 6}, {date: 2025-01-14, data: 14}])
 *     返回值为{date: [2025-01-06, 2025-01-12, 2025-01-13, 2025-01-14], data: [[spaceFill, 12, 13, spaceFill], [6, spaceFill, spaceFill , 14]]}
 *
 * @param spaceFill 空白默认填充 一般为0
 * @param array 多个数据源
 */
export declare const mergeXAxis: MergeXAxisType;
interface ToolTipParamsType {
    seriesName: string;
    value: number | string;
    color: string;
    [key: string]: any;
}
/**
 * 格式化tooltip
 *
 * @param axisName 坐标轴名称
 * @param series 系列数组
 */
export declare function formatToolTip(axisName: string, series: ToolTipParamsType[]): string;
/**
 * Chart的公共逻辑
 *
 * @param reference Dom引用
 * @param context 上下文
 * @param config 配置项
 */
export declare function useChart<T>(reference: any, context: ContextType<T>, config?: UseChartOptions): void;
export declare const group: BaseContextType['group'];
/**
 * Chart的公共逻辑
 *
 * @param config 配置对象
 * @param Ctor 构造器
 * @param [title] 标题
 */
export declare function createContext<T>(config: Config[], Ctor: new (config: Config[], title?: string) => T, title?: string): ContextType<T>;
export {};
