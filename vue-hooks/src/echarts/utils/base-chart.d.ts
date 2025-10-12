import type { TitleComponentOption, RegisteredSeriesOption, TooltipComponentOption, ToolboxComponentOption, LegendComponentOption, Color, GridComponentOption } from 'echarts/types/dist/echarts';
import type { CustomSeriesOption, Config } from './type';
export default abstract class BaseCpn {
    title: TitleComponentOption;
    tooltip: TooltipComponentOption;
    toolbox: ToolboxComponentOption;
    legend: LegendComponentOption;
    color: Array<Color>;
    series: any[];
    grid: GridComponentOption;
    constructor();
    setTitle(options: echarts.EChartsOption['title'] | string): void;
    setTooltip(options: echarts.EChartsOption['tooltip']): void;
    setToolbox(options: echarts.EChartsOption['toolbox']): void;
    setLegend(options: echarts.EChartsOption['legend']): void;
    setSeries<T extends keyof RegisteredSeriesOption>(seriesDataKey: string, options: RegisteredSeriesOption[T]): void;
    setSeriess(fn: (item: CustomSeriesOption) => void): void;
    setSeriesData(seriesDataKey: string, data: any): void;
    setSeriesDatas(fn: Function): void;
    setColor(color: Array<string>): void;
    appendSeries(config: Config): void;
    /** 清空系列 */
    clearSeries(): void;
    setGrid(options: echarts.EChartsOption['grid']): void;
    clearData(config: Record<string, any>): void;
}
