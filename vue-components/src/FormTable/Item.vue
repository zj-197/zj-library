<script setup lang="ts">
import { type FormItemProps } from '../FormItem/types';
import { type ElTableColumnProps } from './types';
import { type ColProps } from 'element-plus'
defineOptions({
  name: "FormTableItem",
})
type TableColumnProps = FormItemProps & ElTableColumnProps & Partial<ColProps> & {
	hiddenTableColumn?: boolean
}
defineProps<TableColumnProps>()
</script>

<template>
<slot></slot>
<slot name="formItemLabel"></slot>
<slot name="formItemError"></slot>
<slot name="table"></slot>
</template>
