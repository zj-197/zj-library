/**
 * @文件功能描述: echarts 钩子导出的函数
 * @作者: 左建
 * @创建日期: 2025/8/25 17:27
 * @最后更新作者:
 * @最后更新日期:
 * @最新更新内容:
 */
import AxisChart from './charts/axis-chart';
import PieChart from './charts/pie-chart';
import type { Config, UseChartOptions } from './utils/type';
import { formatToolTip, mergeXAxis } from './utils';
export { formatToolTip, mergeXAxis };
/**
 * 使用直角坐标系的图表
 *
 * @param reference Dom引用
 * @param config 配置项
 * @param [options] UseChartOptions 类型，scheduler为自定义调度echarts的初始化函数
 * @param [title] 图表名称
 */
export declare function useAxisChart(reference: any, config: Config[], options?: UseChartOptions, title?: string): import("./utils/type").ContextType<AxisChart>;
/**
 * 饼图
 *
 * @param reference Dom引用
 * @param config 配置项
 * @param [options] UseChartOptions 类型，scheduler为自定义调度echarts的初始化函数， 默认在onMounted的时候调用
 * @param [title] 图表名称
 */
export declare function usePieChart(reference: any, config: Config[], options?: UseChartOptions, title?: string): import("./utils/type").ContextType<PieChart>;
