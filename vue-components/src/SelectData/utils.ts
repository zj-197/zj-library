/**
 * @文件功能描述: 选择字典和钩子
 * @作者: 左建
 * @创建日期: 2025/6/18 15:13
 * @最后更新作者:
 * @最后更新日期:
 * @最新更新内容:
 */

import { ref, type Ref } from 'vue';

function getArray (res:any): Array<any> {
	let array:any = null
	if (Array.isArray(res)) {
		array = res
	} else if (typeof res === 'object' && res) {
		array = res.data
	}
	return Array.isArray(array) ? array : [];
}
type optionsParams = {
	label: string;
	value: string | number;
};

export function getSelectedItemByValue(options: Ref<optionsParams[]>, value: any) {
	return options.value.find((item) => String(item.value) === String(value));
}

function getConfig() {
	const loading = ref<boolean>(false);
	const options = ref<optionsParams[]>([]);
	return {
		options,
		loading,
	};
}




export function useRemoteSearchData(requestFn: Function, mapFn: (item: any, index: number) => optionsParams) {
	const { options, loading } = getConfig();
	// 远程搜索
	const remoteMethod = async (query: any) => {
		if (query) {
			loading.value = true;
			try {
				const res = await requestFn(query);
				const respList = getArray(res);
				options.value.length = 0;
				respList.forEach((item: any, index: number) => {
					const obj = mapFn(item, index);
					options.value.push(obj);
				});
			} finally {
				loading.value = false;
			}
		} else {
			options.value.length = 0;
			loading.value = false;
		}
	};
	return {
		options,
		loading,
		remoteMethod,
	};
}

// 获取远程数据
export function useRemoteData(requestFn: Function, mapFn: (item: any, index: number) => optionsParams = (item:any) => ({label: item.label, value: item.value})) {
	const config = getConfig();
	config.loading.value = true;
	requestFn().then((res:any) => {
		config.loading.value = false;
		const respList = getArray(res);
		config.options.value.length = 0;
		respList.forEach((item: any, index: number) => {
			const obj = mapFn(item, index);
			config.options.value.push(obj);
		});
	}).catch(() => {
		config.loading.value = false;
	})
	return config;
}

export function getOptionsConfig (props:any) {
	let dict: ReturnType<typeof getConfig> = getConfig();
	const mapFn: any = (item: any) => {
		// 是否是原始类型
		const isPritive = !(typeof item === 'object' && item !== null);
		return {
			label: isPritive ? item || '' : item[props.labelKey],
			value: isPritive ? item : item[props.valueKey],
		};
	}
	if (props.options) {
		if (Array.isArray(props.options)) {
			dict = useRemoteData(() => {
				return Promise.resolve(props.options)
			}, mapFn);
		} else {
			if (props.remote) {
				dict = useRemoteSearchData(props.options, mapFn);
			} else {
				dict = useRemoteData(props.options, mapFn);
			}
		}
	}
	return dict
}

