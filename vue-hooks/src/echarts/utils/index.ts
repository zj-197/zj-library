import * as echarts from 'echarts'
import { nextTick, onMounted, onUnmounted, ref, toRaw, toValue, watch } from 'vue'
import type { BaseContextType, UseChartOptions, Config, ContextType } from './type'
interface MergeXAxisType {
    (
        spaceFill: string | number,
        ...array: Array<Array<any>>
    ): {
        date: Array<string>
        data: Array<Array<string | number>>
    }

    format: (list: Array<any>, mapKey: { date: string; data: string }) => Array<any>
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
export const mergeXAxis: MergeXAxisType = function (spaceFill, ...array) {
    const map = new Map()
    const dateSet = new Set()
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            const item = array[i][j]
            dateSet.add(item.date)
            let mapValue = map.get(item.date)
            if (!mapValue) {
                map.set(item.date, (mapValue = []))
            }
            mapValue.push({ i, j })
        }
    }

    // 先对横坐标日期进行排序
    const dateSort = [...dateSet].sort((a: any, b: any) => {
        const aDate = new Date(a)
        const bDate = new Date(b)
        if (isNaN(aDate.getTime()) && isNaN(bDate.getTime())) return 0
        return aDate.getTime() - bDate.getTime()
    }) as Array<string>

    const res: Array<Array<{ date: string; data: string | number }>> = []
    // 生成数据表格
    for (let i = 0; i < array.length; i++) {
        res[i] = []
        for (const item of dateSort) {
            res[i].push({
                date: item as string,
                data: spaceFill
            })
        }
    }

    // 填充数据
    for (const [key, value] of map) {
        for (const item of value) {
            const resItem = res[item.i]
            const indexDate = resItem.findIndex((item) => item.date === key)
            resItem[indexDate].data = array[item.i][item.j].data
        }
    }
    return {
        date: dateSort,
        data: res.map((item) => item.map((item) => item.data))
    }
}

/**
 * 将数组格式化为对应格式
 *
 * @param list 空白默认填充
 * @param mapKey 映射的键
 */
mergeXAxis.format = function (list, mapKey) {
    return list.map((item) => {
        Object.defineProperty(item, 'date', {
            value: item[mapKey.date]
        })
        Object.defineProperty(item, 'data', {
            value: item[mapKey.data]
        })
        return item
    })
}

interface ToolTipParamsType {
    seriesName: string // 系列名称
    value: number | string // 当前值
    color: string // 颜色值
    [key: string]: any
}

/**
 * 格式化tooltip
 *
 * @param axisName 坐标轴名称
 * @param series 系列数组
 */
export function formatToolTip(axisName: string, series: ToolTipParamsType[]) {
    let itemStr = ''
    for (let i = 0; i < series.length; i++) {
        const item = series[i]
        itemStr += `
      	<div style="margin: 10px 0 0;line-height:1;">
						<div style="margin: 0px 0 0;line-height:1;">
							<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>
							<span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">${item.seriesName}</span>
							<span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">${item.value}</span>
							<div style="clear:both"></div>
						</div>
						<div style="clear:both"></div>
					</div>
		`
    }
    const str = `
		<div class="echarts-custom-tooltip">
		<div style="margin: 0px 0 0;line-height:1;">
			<div style="margin: 0px 0 0;line-height:1;">
				<div style="font-size:14px;color:#666;font-weight:400;line-height:1;">${axisName}</div>
				<div style="margin: 10px 0 0;line-height:1;">
					${itemStr}
					<div style="clear:both"></div>
				</div>
				<div style="clear:both"></div>
			</div>
			<div style="clear:both"></div>
		</div>
	</div>
	`
    return str
}

/**
 * Chart的公共逻辑
 *
 * @param reference Dom引用
 * @param context 上下文
 * @param config 配置项
 */
export function useChart<T>(reference: any, context: ContextType<T>, config?: UseChartOptions) {
    const options = context.options
    const initFn = () => {
        context.e = echarts.init(toValue(reference), undefined, {
            locale: 'CN',
            renderer: 'canvas'
        })
        context.e.setOption(toRaw(options.value) as any)
    }
    if (config && typeof config.scheduler === 'function') {
        config.scheduler(initFn)
    } else {
        onMounted(() => {
            nextTick(initFn)
        })
    }
    watch(
        options,
        () => {
            if (context.e) {
                context.e.setOption(toRaw(options.value) as any, true)
            }
        },
        { deep: true }
    )
    let timer: any = null
    const resizeFn = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            context.e!.resize()
        }, 200)
    }
    window.addEventListener('resize', resizeFn)
    onUnmounted(() => {
        window.removeEventListener('resize', resizeFn)
        clearTimeout(timer)
        timer = null
        context.e!.dispose()
    })
}

export const group: BaseContextType['group'] = function (list, prop) {
    return list.map((item) => item[prop])
}

/**
 * Chart的公共逻辑
 *
 * @param config 配置对象
 * @param Ctor 构造器
 * @param [title] 标题
 */

export function createContext<T>(config: Config[], Ctor: new (config: Config[], title?: string) => T, title?: string) {
    return {
        group,
        config,
        options: ref<T>(new Ctor(config, title))
    } as ContextType<T>
}
