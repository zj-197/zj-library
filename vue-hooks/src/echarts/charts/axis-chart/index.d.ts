import type { XAXisComponentOption, YAXisComponentOption, DataZoomComponentOption, LineSeriesOption, BarSeriesOption } from 'echarts/types/dist/echarts';
import BaseCpn from '../../utils/base-chart';
import type { Config, CustomSeriesOption } from '../../utils/type';
export default class AxisChart extends BaseCpn {
    xAxis: Array<XAXisComponentOption & {
        data?: Array<any>;
    }>;
    yAxis: Array<YAXisComponentOption & {
        data?: Array<any>;
    }>;
    dataZoom: Array<DataZoomComponentOption>;
    series: ((LineSeriesOption & CustomSeriesOption) | (BarSeriesOption & CustomSeriesOption))[];
    constructor(config: Config[], title?: string);
    setXAxis(bottom: (typeof this.xAxis)[0], top?: (typeof this.xAxis)[0]): void;
    setYAxis(left: (typeof this.yAxis)[0], right?: (typeof this.yAxis)[0]): void;
    setDataZoom(dataZoom: typeof this.dataZoom): void;
    setSeriess(fn: (item: (LineSeriesOption & CustomSeriesOption) | (BarSeriesOption & CustomSeriesOption)) => void): void;
}
