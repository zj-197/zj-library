import type {
    TitleComponentOption,
    RegisteredSeriesOption,
    TooltipComponentOption,
    ToolboxComponentOption,
    LegendComponentOption,
    Color,
    GridComponentOption
} from 'echarts/types/dist/echarts'
import type { CustomSeriesOption, Config } from './type'
import { merge } from '@zj-library/utils'

export default abstract class BaseCpn {
    title: TitleComponentOption
    tooltip: TooltipComponentOption
    toolbox: ToolboxComponentOption
    legend: LegendComponentOption
    color: Array<Color>
    series: any[] // 派生类需重写
    grid: GridComponentOption

    constructor() {
        this.title = {
            show: false,
            left: 'center'
        }
        this.tooltip = {
            show: true,
            // item 为图形触发，axis坐标轴触发，none不触发
            trigger: 'axis',
            // a通常为系列名，b为类目值，c为数值
            // formatter: '{a0} <br/>{b0} : {c0}<br/>{a1} <br/>{b1} : {c1}',
            // 坐标轴指示器配置项
            axisPointer: {
                type: 'shadow' // 可选值 line（直线指示器），shadow（阴影指示器）、cross（十字准星提示器）、none（无指示器）
            }
        }
        this.toolbox = {
            show: false
        }
        this.legend = {
            show: true, // 是否显示图例组件
            left: 'center', // 与容器左侧的距离
            top: 'top', // 像素值，或者middle（中部），top（顶部），bottom（底部）
            orient: 'horizontal', // 图列列表的布局朝向，默认是horizontal水平的，可选址为horizontal和vertical
            data: []
        }
        this.series = []
        this.color = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
        this.grid = {}
    }

    // 设置标题
    setTitle(options: echarts.EChartsOption['title'] | string) {
        if (typeof options == 'string') {
            // @ts-ignore
            this.title.text = options
            // @ts-ignore
            this.title.show = true
        } else if (options && typeof options == 'object') {
            // @ts-ignore
            if (options.data) {
                this.clearData(this.title)
            }
            merge(this.title, false, options)
        }
    }

    // 设置提示框
    setTooltip(options: echarts.EChartsOption['tooltip']) {
        // @ts-ignore;
        if (options.data) {
            this.clearData(this.tooltip)
        }
        if (options && typeof options == 'object') {
            merge(this.tooltip, false, options)
        }
    }

    // 设置工具栏
    setToolbox(options: echarts.EChartsOption['toolbox']) {
        // @ts-ignore;
        if (options.data) {
            this.clearData(this.toolbox)
        }
        if (options && typeof options == 'object') {
            merge(this.toolbox, false, options)
        }
    }

    // 设置图例
    setLegend(options: echarts.EChartsOption['legend']) {
        // @ts-ignore
        if (Array.isArray(options.data)) {
            this.clearData(this.legend)
        }
        // @ts-ignore
        if (options.selected) {
            // @ts-ignore
            this.legend.selected = Array.isArray(options.selected) ? [] : {}
        }
        if (options && typeof options == 'object') {
            merge(this.legend, false, options)
        }
    }

    setSeries<T extends keyof RegisteredSeriesOption>(seriesDataKey: string, options: RegisteredSeriesOption[T]) {
        const config = this.series.find((item) => item.__dataKey__ === seriesDataKey)
        if (options.data) {
            if (config) {
                this.clearData(config)
            }
        }
        merge(config, false, options)
    }

    setSeriess(fn: (item: CustomSeriesOption) => void) {
        for (const item of this.series) {
            fn(item)
        }
    }

    setSeriesData(seriesDataKey: string, data: any) {
        const config = this.series.find((item) => item.__dataKey__ === seriesDataKey)
        config && (config.data = data)
    }

    setSeriesDatas(fn: Function) {
        for (const item of this.series) {
            item.data = fn.call(this, item.__dataKey__)
        }
    }

    setColor(color: Array<string>) {
        if (Array.isArray(color)) {
            this.color = [...new Set([...color, ...this.color])]
        }
    }

    // 追加series
    appendSeries(config: Config) {
        this.series.push({
            type: config.seriesType,
            name: config.seriesName,
            __dataKey__: config.seriesDataKey
        })
        this.clearData(this.legend)
        this.setLegend({
            data: this.series.map((item) => String(item.name))
        })
    }

    /** 清空系列 */
    clearSeries() {
        this.series.length = 0
        this.clearData(this.legend)
    }

    setGrid(options: echarts.EChartsOption['grid']) {
        if (options && typeof options == 'object') {
            // @ts-ignore
            if (options.data) {
                this.clearData(this.grid)
            }
            merge(this.grid, false, options)
        }
    }

    clearData(config: Record<string, any>) {
        if (typeof config === 'object') {
            if (Array.isArray(config.data)) {
                config.data.length = 0
            }
        }
    }
}
