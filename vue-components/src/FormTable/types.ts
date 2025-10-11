import { type TableColumnCtx } from 'element-plus';

type ELTableColumnCtx = TableColumnCtx<any>


export type ModelValueItemType = {
	[key: string | symbol]: any,
}

export interface ElTableColumnPropsRequired {
	label: ELTableColumnCtx['label'];
	prop: ELTableColumnCtx['prop'];
	columnKey: ELTableColumnCtx['columnKey'],
	width: ELTableColumnCtx['width'],
	minWidth: ELTableColumnCtx['minWidth']
	fixed: ELTableColumnCtx['fixed'],
	renderHeader: ELTableColumnCtx['renderHeader'],
	sortable: ELTableColumnCtx['sortable'],
	sortMethod: ELTableColumnCtx['sortMethod'],
	sortBy: ELTableColumnCtx['sortBy'],
	sortOrders: ELTableColumnCtx['sortOrders'],
	resizable: ELTableColumnCtx['resizable'],
	formatter: ELTableColumnCtx['formatter'],
	showOverflowTooltip: ELTableColumnCtx['showOverflowTooltip'],
	align: 'left' | 'center' | 'right',
	headerAlign: ELTableColumnCtx['headerAlign'],
	className: ELTableColumnCtx['className'],
	labelClassName: ELTableColumnCtx['labelClassName'],
	selectable: ELTableColumnCtx['selectable'],
	reserveSelection: ELTableColumnCtx['reserveSelection'],
	filters: ELTableColumnCtx['filters'],
	filterPlacement: ELTableColumnCtx['filterPlacement'],
	filterClassName: ELTableColumnCtx['filterClassName'],
	filterMultiple: ELTableColumnCtx['filterMultiple'],
	filterMethod: ELTableColumnCtx['filterMethod'],
	filteredValue: ELTableColumnCtx['filteredValue'],
	tooltipFormatter: ELTableColumnCtx['tooltipFormatter']
}


export type ElTableColumnProps = Partial<ElTableColumnPropsRequired>;
