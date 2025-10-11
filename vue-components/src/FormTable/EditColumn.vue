<script setup lang="ts">
import FormItem from '../FormItem/index.vue';
import {computed, inject } from 'vue';
import { EditTable, getELTableColumnProps, IsInputting } from './utils';
import { deepClone, getPropertyValueByPath } from '@zj-library/utils';
import { type FormItemProps } from '../FormItem/types';
import { type ElTableColumnProps } from './types';
import { getFormItemProps } from '../FormItem/utils';

const { formData } = inject<any>(EditTable);

type TableColumnProps = FormItemProps & ElTableColumnProps & {
	hideRequiredAsterisk?: boolean;
}
const props = withDefaults(defineProps<TableColumnProps>(), {
	showMessage: true,
	resizable: true,
	filterMultiple: true,
});

const tableColumnProp = computed<string>(() => {
  if (typeof props.prop === 'undefined') {
    return ''
  }
  return props.prop
})

const tableColumnProps = computed<ElTableColumnProps>(() => {
	return getELTableColumnProps(props)
})
const formItemProps = computed<FormItemProps>(() => {
	const fp = getFormItemProps(props)
	delete fp.prop
	delete fp.label
	return fp
})
function getFormData(index: number, row: any) {
	return formData[index] || (formData[index] = deepClone(row));
}

defineOptions({
	name: 'TableEditColumn',
});
</script>

<template>
	<el-table-column v-bind="tableColumnProps">
		<template v-slot:header="{column, $index}">
			<slot name="header" :column="column" :index="$index">
				<span v-if="!props.hideRequiredAsterisk && props.required" style="color: #f00; font-size: 14px; position: relative; top: 2px; margin-right: 1px">*</span>
				<span>{{ props.label }}</span>
			</slot>
		</template>
		<template v-slot:default="{ row, column, $index }">
			<form-item
				v-bind="formItemProps"
				:prop="$index + '.' + props.prop">
				<div class="width-per-100" :style="{ textAlign: props.align }">
					<slot
						v-if="row[IsInputting]"
						:row="row"
						:column="column"
						:index="$index"
						:cellValue="getPropertyValueByPath(row, tableColumnProp)"
						:formData="getFormData($index, row)"
					></slot>
					<slot v-else name="view" :row="row" :column="column" :index="$index" :formData="getFormData($index, row)"
                :cellValue="getPropertyValueByPath(row, tableColumnProp)">
						{{ getPropertyValueByPath(row, tableColumnProp, '--') }}
					</slot>
				</div>
			</form-item>
		</template>
		<template v-slot:filter-icon="{filterOpened}">
			<slot v-if="$slots['filter-icon']" name="filter-icon" :filter-opened="filterOpened"></slot>
		</template>
    <template v-slot:expand="{expanded}">
      <slot v-if="$slots.expand" name="expand" :expanded="expanded"></slot>
    </template>
	</el-table-column>
</template>
