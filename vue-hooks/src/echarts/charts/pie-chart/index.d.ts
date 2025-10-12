import BaseCpn from '../../utils/base-chart';
import type { Config, CustomSeriesOption } from '../../utils/type';
import type { PieSeriesOption } from 'echarts/types/dist/echarts';
export default class PieChart extends BaseCpn {
    series: (PieSeriesOption & CustomSeriesOption)[];
    constructor(config: Config[], title?: string);
}
