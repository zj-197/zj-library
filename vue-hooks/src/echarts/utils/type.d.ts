import type { SeriesOption as EchartsSeriesOption, EChartsType } from 'echarts/types/dist/echarts';
import type { Ref, UnwrapRef } from 'vue';
import AxisChart from '../charts/axis-chart';
import PieChart from '../charts/pie-chart';
export interface BaseContextType {
    e?: EChartsType;
    group: <T extends {
        [k: string]: any;
    }>(list: Array<T>, prop: keyof T) => Array<any>;
    config: Config[];
}
export interface ContextType<T> extends BaseContextType {
    options: Ref<UnwrapRef<T>>;
}
export type AxisContext = ContextType<AxisChart>;
export type PieContext = ContextType<PieChart>;
type SeriesType = 'bar' | 'line' | 'pie';
export interface CustomSeriesOption {
    __dataKey__: string;
}
export type UseChartOptions = {
    scheduler: (echartsInit: () => void) => any;
};
export type SeriesOption = EchartsSeriesOption & CustomSeriesOption;
export type SeriesTypeEnum = {
    [K in SeriesType]: K;
};
export interface Config {
    seriesType: SeriesType;
    seriesName: string;
    seriesDataKey: string;
}
export {};
