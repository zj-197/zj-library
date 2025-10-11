# echarts钩子封装
使用示例：
```vue
<script setup lang="ts">
import { formatToolTip, useAxisChart } from '@/hooks/echarts';
import { ref } from 'vue';
defineOptions({
	name: 'Example',
});
const echartsContainer = ref();
let chart = useAxisChart(echartsContainer, [
	{
		seriesName: '实名认证车辆数',
		seriesDataKey: 'carIdentity',
		seriesType: 'bar',
	},
	{
		seriesName: '异常车辆总数',
		seriesDataKey: 'abnormalCarNum',
		seriesType: 'bar',
	},
	{
		seriesName: '单车（平均）公网异常事件数',
		seriesDataKey: 'avgPubNetAbnormalNum',
		seriesType: 'bar',
	},
]);
chart.options.value.setTitle('省市异常数据比对');
// 第一个参数为左，第二个参数为右
chart.options.value.setYAxis({
	name: "数量",
	nameLocation: "end",
}, {
	name: "百分比",
	nameLocation: "end",
	axisLabel: {
		formatter: '{value} %'
	}
});
// yAxisIndex 为1关联右边，为0关联左边
chart.options.value.setSeriess((item:any) => {
	if (item.__dataKey__.endsWith('Rate')) {
		item.yAxisIndex = 1
	} else {
		item.yAxisIndex = 0
	}
})

chart.options.value.setTooltip({
	formatter: (params:any) => {
		const whiteList = ['实名认证车辆数', '异常车辆总数', '单车（平均）公网异常事件数', '单车（平均）私网异常事件数']
		const axiosName = params[0].name
		const itemList = params.map((item:any) => {
			const obj = {
				value: item.value,
				seriesName: item.seriesName,
				color: item.color
			}
			if (!whiteList.includes(item.seriesName)) {
				obj.value = obj.value + '%'
			}
			return obj
		})
		return formatToolTip(axiosName, itemList)
	},
})
chart.options.value.setLegend({
	top: '30px',
});
chart.options.value.setGrid({
	bottom: '20px',
});

function setChartData(data: any) {
	chart.options.value.setXAxis({
		data: chart.group(data, 'districtName'),
		type: 'category',
	});
	chart.options.value.setSeriesDatas((dataKey: string) => {
		return chart.group(data, dataKey);
	});
}
// 去除实名认证数的百分比符号

const isLoading = ref(false);
const serverData = ref<any>();

function getFakeData() {
	const getRandomNum = () => (Math.random() * 100) >> 0;
	const citys = ['重庆', '四川', '湖北', '湖南', '山西', '北京']
	const keys = chart.config.map(item2 => item2.seriesDataKey);
	return Array.from({ length: citys.length }, (_, index) => {
		return keys.reduce((preVal, curVal) => {
			preVal[curVal] = getRandomNum();
			return preVal
		}, {
			districtName: citys[index],
		});
	})
}

/**
 * @param statsDate 日期：yyyy-MM-dd（某一天）
 * @param vehicleSeries 车系ID
 * */
async function refresh(statsDate: string, vehicleSeries: string) {
	try {
		isLoading.value = true;
		const data = getFakeData();
		setChartData(data);
		serverData.value = data;
	} finally {
		isLoading.value = false;
	}
}

defineExpose({
	refresh,
});
</script>

<template>
	<el-container style="height: 50vh">
		<el-main style="width: 65%" v-loading="isLoading">
			<div style="width: 100%; height: 100%" ref="echartsContainer"></div>
		</el-main>
		<el-main>
			<div class="tableContainer">
				<el-table height="100%" :data="serverData" stripe size="large" highlight-current-row v-loading="isLoading">
					<el-table-column
						v-for="item in chart.config"
						:key="item.seriesDataKey"
						:prop="item.seriesDataKey"
						:label="item.seriesName"
					></el-table-column>
				</el-table>
			</div>
		</el-main>
	</el-container>
</template>

<style scoped lang="scss">
.tableContainer {
	width: 100%;
	height: 100%;

	:deep(.el-table) {
		--el-table-border-color: transparent;

		th {
			background-color: #fcfcfc !important;
			border-radius: 0 !important;
			position: relative;
			color: #3b3b3b;
		}
	}
}
</style>

```
