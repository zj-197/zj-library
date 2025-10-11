import BaseCpn from '../../utils/base-chart';
import type { Config, CustomSeriesOption } from '../../utils/type';
import type { MapSeriesOption, VisualMapComponentOption } from 'echarts/types/dist/echarts';
import * as echarts from 'echarts';
import { merge } from '@zj-library/utils';
import province from './province.json';
interface MapConfig extends Config {
	map: MapSeriesOption['map'] | 'china';
	geoIndex: MapSeriesOption['geoIndex'];
}
// geo: [
// 	{
// 		// 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
// 		type: 'map',
// 		map: name,
// 		roam: true,
// 		selectedMode: 'single',
// 		left: '10%',
// 		right: '10%',
// 		label: {
// 			show: true,
// 			color: darken(baseColor, 30),
// 			fontSize: 12,
// 			formatter: (params: any) => {
// 				const obj = state.mapWarningDataList.find((item: any) => {
// 					return item.name.indexOf(params.name) != -1;
// 				});
// 				if (obj) {
// 					// const str = `${params.name}\n{a|${obj.num}}`;
// 					const str = `{a|${obj.num}}`;
// 					return str;
// 				}
// 				return '';
// 			},
// 			rich: {
// 				a: {
// 					color: '#0052D9',
// 					fontSize: 14,
// 				},
// 			},
// 		},
// 		// 地图区域的多边形 图形样式。
// 		itemStyle: {
// 			areaColor: BLUE_COLOR[0],
// 			borderColor: darken(baseColor, 25),
// 			borderWidth: 1,
// 			// shadowColor: '#769EBA',
// 			// shadowBlur: 10,
// 			// shadowOffsetY: 10,
// 		},
// 		// 设置高亮状态下的多边形和标签样式
// 		emphasis: {
// 			itemStyle: {
// 				areaColor: darken(baseColor, 10),
// 				borderColor: darken(baseColor, 20),
// 				borderWidth: 1,
// 			},
// 			label: {
// 				color: darken(baseColor, 40),
// 			},
// 		},
// 		select: {
// 			itemStyle: {
// 				areaColor: darken(baseColor, 10),
// 				borderColor: darken(baseColor, 20),
// 				borderWidth: 1,
// 			},
// 			label: {
// 				color: darken(baseColor, 40),
// 			},
// 		},
// 		regions: state.regionsArr,
// 	},
// ],
// 还是得从网上拉
// export function registerChinaProvince() {
// 	echarts.registerMap('china', province)
// }
// 还是得从网上拉
export function registerChinaCity () {

}

export default class MapChart extends BaseCpn {
	series: (MapSeriesOption & CustomSeriesOption)[];
	visualMap: VisualMapComponentOption[];

	constructor(config: MapConfig[], title?: string) {
		super();
		this.series = [];
		this.visualMap = [];
		for (const item of config) {
			this.series.push({
				type: 'map',
				map: 'xx',
				roam: true,
				name: item.seriesName,
				geoIndex: item.geoIndex,
				__dataKey__: item.seriesDataKey,
			});
		}
		if (title) {
			this.setTitle(title);
		}
	}

	// @ts-ignore
	setSeries(seriesDataKey: string, options: (typeof this.series)[0]) {
		const config = this.series.find((item) => item.__dataKey__ === seriesDataKey);
		if (options.data) {
			if (config) {
				this.clearData(config);
			}
		}
		merge(config, false, options);
	}

	setSeriess(fn: (item: MapSeriesOption & CustomSeriesOption) => void) {
		for (const item of this.series) {
			fn(item);
		}
	}
}

