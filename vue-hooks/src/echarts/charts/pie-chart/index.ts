import BaseCpn from '../../utils/base-chart'
import type { Config, CustomSeriesOption } from '../../utils/type'
import type { PieSeriesOption } from 'echarts/types/dist/echarts'

export default class PieChart extends BaseCpn {
    series: (PieSeriesOption & CustomSeriesOption)[]

    constructor(config: Config[], title?: string) {
        super()
        this.series = []
        for (const item of config) {
            this.series.push({
                type: 'pie',
                name: item.seriesName,
                __dataKey__: item.seriesDataKey
            })
        }
        if (title) {
            this.setTitle(title)
        }
        this.tooltip = {
            show: true,
            // item 为图形触发，axis坐标轴触发，none不触发
            trigger: 'item',
            // a通常为系列名，b为类目值，c为数值
            // formatter: '{a0} <br/>{b0} : {c0}<br/>{a1} <br/>{b1} : {c1}',
            // 坐标轴指示器配置项
            axisPointer: {
                type: 'shadow' // 可选值 line（直线指示器），shadow（阴影指示器）、cross（十字准星提示器）、none（无指示器）
            }
        }
    }
    // @ts-ignore
    setSeries(seriesDataKey: string, options: PieSeriesOption & CustomSeriesOption) {
        super.setSeries(seriesDataKey, options)
    }
}
