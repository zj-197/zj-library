import BaseCpn from '../../utils/base-chart';
import type { Config, CustomSeriesOption } from '../../utils/type';
import type { MapSeriesOption, VisualMapComponentOption } from 'echarts/types/dist/echarts';
interface MapConfig extends Config {
    map: MapSeriesOption['map'] | 'china';
    geoIndex: MapSeriesOption['geoIndex'];
}
export declare function registerChinaCity(): void;
export default class MapChart extends BaseCpn {
    series: (MapSeriesOption & CustomSeriesOption)[];
    visualMap: VisualMapComponentOption[];
    constructor(config: MapConfig[], title?: string);
    setSeries(seriesDataKey: string, options: (typeof this.series)[0]): void;
    setSeriess(fn: (item: MapSeriesOption & CustomSeriesOption) => void): void;
}
export {};
