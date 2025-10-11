import type { XAXisComponentOption, YAXisComponentOption, DataZoomComponentOption, LineSeriesOption, BarSeriesOption } from 'echarts/types/dist/echarts'

import BaseCpn from '../../utils/base-chart'
import type { Config, CustomSeriesOption } from '../../utils/type'
import { merge } from '@zj-library/utils'

export default class AxisChart extends BaseCpn {
    xAxis: Array<XAXisComponentOption & { data?: Array<any> }>
    yAxis: Array<YAXisComponentOption & { data?: Array<any> }>
    dataZoom: Array<DataZoomComponentOption>
    series: ((LineSeriesOption & CustomSeriesOption) | (BarSeriesOption & CustomSeriesOption))[]

    constructor(config: Config[], title?: string) {
        super()
        this.xAxis = [
            {
                type: 'category'
            }
        ]
        this.yAxis = [
            {
                type: 'value'
            }
        ]
        this.dataZoom = [
            {
                type: 'slider',
                show: true,
                orient: 'horizontal',
                xAxisIndex: [0],
                filterMode: 'filter'
            }
        ]
        this.series = []
        for (const item of config) {
            this.series.push({
                type: item.seriesType as any,
                name: item.seriesName,
                __dataKey__: item.seriesDataKey,
                barMaxWidth: 40
            })
        }
        this.setLegend({
            data: config.map((item) => item.seriesName)
        })
        if (title) {
            this.setTitle(title)
        }
    }

    setXAxis(bottom: (typeof this.xAxis)[0], top?: (typeof this.xAxis)[0]) {
        if (Array.isArray(bottom.data)) {
            this.clearData(this.xAxis[0])
        }
        if (top && Array.isArray(top.data)) {
            this.clearData(this.xAxis[1])
        }
        merge(this.xAxis[0], false, bottom)
        if (top) {
            merge(this.xAxis[1] || (this.xAxis[1] = {}), false, top)
        }
    }

    setYAxis(left: (typeof this.yAxis)[0], right?: (typeof this.yAxis)[0]) {
        if (Array.isArray(left.data)) {
            this.clearData(this.yAxis[0])
        }
        if (right && Array.isArray(right.data)) {
            this.clearData(this.yAxis[1])
        }
        merge(this.yAxis[0], false, left)
        if (right) {
            merge(this.yAxis[1] || (this.yAxis[1] = {}), false, right)
        }
    }

    setDataZoom(dataZoom: typeof this.dataZoom) {
        merge(this.dataZoom, false, dataZoom)
    }

    setSeriess(fn: (item: (LineSeriesOption & CustomSeriesOption) | (BarSeriesOption & CustomSeriesOption)) => void) {
        for (const item of this.series) {
            fn(item)
        }
    }
}
