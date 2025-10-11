/**
 * @文件功能描述: 编辑表格相关类型
 * @作者: 左建
 * @创建日期: 2025/9/2 14:38
 * @最后更新作者:
 * @最后更新日期:
 * @最新更新内容:
 */
import { type ElTableColumnProps } from './types';
import type { Writable } from 'element-plus/es/utils';
import { type ColProps } from 'element-plus';
import { getCameCaseObject } from '@zj-library/utils';

export const EditTable = Symbol('EditTable');
// 是否正在输入中
export const IsInputting = Symbol('IsInputting');
export const __RowConfirmLoading__ = Symbol('__RowConfirmLoading__');
export const __RowDeleteLoading__ = Symbol('__RowDeleteLoading__');
export const __RowCancelLoading__ = Symbol('__RowCancelLoading__');

export function getELTableColumnProps(props: any): Writable<ElTableColumnProps> {
	return {
		label: props.label,
		prop: props.prop,
		columnKey: props.columnKey,
		width: props['width'],
		minWidth: props['minWidth'],
		fixed: props['fixed'],
		renderHeader: props['renderHeader'],
		sortable: props['sortable'],
		sortMethod: props['sortMethod'],
		sortBy: props['sortBy'],
		sortOrders: props['sortOrders'],
		resizable: props['resizable'],
		formatter: props['formatter'],
		showOverflowTooltip: props['showOverflowTooltip'],
		align: props['align'],
		headerAlign: props['headerAlign'],
		className: props['className'],
		labelClassName: props['labelClassName'],
		selectable: props['selectable'],
		reserveSelection: props['reserveSelection'],
		filters: props['filters'],
		filterPlacement: props['filterPlacement'],
		filterClassName: props['filterClassName'],
		filterMultiple: props['filterMultiple'],
		filterMethod: props['filterMethod'],
		filteredValue: props['filteredValue'],
		tooltipFormatter: props['tooltipFormatter'],
	};
}

export function getTemplateElTableColumnProps (props:any) {
	props = getCameCaseObject(props);
	const completeProps = getELTableColumnProps(props);
	for (const key in completeProps) {
		if (key in props) {
			continue;
		}
		// @ts-ignore
		delete completeProps[key];
	}
	return completeProps
}



export function getElColProps(props: any): Writable<ColProps> {
	return {
		span: props.span,
		offset: props.offset,
		push: props.push,
		pull: props.pull,
		sm: props.sm,
		md: props.md,
		xs: props.xs,
		lg: props.lg,
		xl: props.xl,
		tag: props.tag,
	};
}


export function getTemplateElColProps (props:any) {
	props = getCameCaseObject(props);
	const completeProps = getElColProps(props);
	for (const key in completeProps) {
		if (key in props) {
			continue;
		}
		// @ts-ignore
		delete completeProps[key];
	}
	return completeProps
}
