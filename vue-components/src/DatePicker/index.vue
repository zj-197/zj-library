<script setup lang="ts">
import { ElDatePicker } from 'element-plus';
import { type ComponentInstance, computed, getCurrentInstance, h } from 'vue';
import { type DatePickerProps } from './types';
import {
	getDateByDate,
	shortcutsOfDateAfter,
	shortcutsOfDateBefore,
	shortcutsOfDateRangeAfter,
	shortcutsOfDateRangeBefore,
} from './utils';
defineOptions({
	name: "DatePicker",
})
const props = withDefaults(defineProps<DatePickerProps>(), {
	editable: true,
	clearable: true,
	validateEvent: true,
	teleported: true
})

const shortcuts = computed(() => {
	const emptyArray:any = []
	if (props.type === 'date' || props.type === 'datetime') {
		if (props.availableStartDate) {
			if (props.availableEndDate) return emptyArray
			return shortcutsOfDateAfter
		} else {
			if (props.availableEndDate) return shortcutsOfDateBefore
			return shortcutsOfDateBefore.concat(shortcutsOfDateAfter.slice(1))
		}
	} else if (props.type === 'daterange' || props.type === 'datetimerange') {
		if (props.availableStartDate) {
			if (props.availableEndDate) return emptyArray
			return shortcutsOfDateRangeAfter
		} else {
			if (props.availableEndDate) return shortcutsOfDateRangeBefore
			return shortcutsOfDateRangeBefore.concat(shortcutsOfDateRangeAfter.slice(1))
		}
	}
	return emptyArray
})


const disabledDate = computed(() => {
	let startDate = props.availableStartDate ? getDateByDate('before', 1, 'day', props.availableStartDate) : undefined
	let endDate = props.availableEndDate;
	if (props.disabledDate) {
		return props.disabledDate
	}
	return (time: Date) => {
		let flag = false
		if (startDate) {
			if (endDate) {
				// 同时传了开始合结束日期，那么就只能选择这中间的
				if (time.getTime() > endDate.getTime() || time.getTime() < startDate.getTime()) {
					flag = true
				}
			} else {
				// 只传了开始时间，那就禁用开始时间之前的
				if (time.getTime() < startDate.getTime()) {
					flag = true
				}
			}
		} else {
			if (endDate) {
				if (time.getTime() > endDate.getTime()) {
					flag = true
				}
			}
		}
		return flag
	}
})

const placeholder = computed<string>(() => {
	if (props.placeholder) return props.placeholder;
	return '请选择'
})

const startPlaceholder = computed<string>(() => {
	if (props.startPlaceholder) return props.startPlaceholder;
	return '请选择'
})

const endPlaceholder = computed<string>(() => {
	if (props.endPlaceholder) return props.endPlaceholder;
	return '请选择'
})

const vm = getCurrentInstance()
const changeRef = (instance:any) => {
	if (vm) {
		// 暴露方法
		vm.exposed = vm.exposeProxy = instance || {};
	}
}
defineExpose({} as ComponentInstance<typeof ElDatePicker>)
</script>

<template>
	<component
		:is="h(ElDatePicker, {...$attrs, ...props, placeholder, startPlaceholder,  endPlaceholder, shortcuts, disabledDate, ref: changeRef }, $slots)">
	</component>
</template>
