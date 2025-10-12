import { defineComponent, h, type PropType, provide, toValue } from 'vue'
import FormItem from '../FormItem/index.vue'
import { ElTableColumn, ElRow, ElCol } from 'element-plus'
import { EditTable, getTemplateElColProps, getTemplateElTableColumnProps } from './utils'
import { getTemplateFormItemProps } from '../FormItem/utils'
import { getPropertyValueByPath, isObject, noop } from '@zj-library/utils'

function getSlot<T>(slot: T): T | null {
    if (typeof slot === 'function') return slot()
    return null
}

function findAndFormatElForm(formSlot: any, isClearDefaultChildren: boolean) {
    const form = formSlot.find((item: any) => {
        if (typeof item.type === 'string') return false
        if (item.type) {
            // @ts-ignore
            const name = item.type.name
            return /ElForm/i.test(name)
        }
        return false
    })
    if (form && isClearDefaultChildren) {
        if (Array.isArray(form.children)) {
            form.children.length = 0
        } else {
            form.children = []
        }
    }
    return form
}

function findAndFormatElTable(tableSlot: any, isClearDefaultChildren: boolean) {
    const table = tableSlot.find((item: any) => {
        if (typeof item.type === 'string') return false
        if (item.type) {
            // @ts-ignore
            const name = item.type.name
            return /ElTable/i.test(name)
        }
        return false
    })
    if (table && isClearDefaultChildren) {
        if (Array.isArray(table.children)) {
            table.children.length = 0
        } else {
            if (Object.prototype.toString.call(table.children) !== '[object Object]') {
                table.children = []
            }
        }
    }
    return table
}

function renderFormItem(children: any[], item: any, name: string) {
    const nameWhiteList = ['FormTableSearchItem']
    if (nameWhiteList.includes(name)) {
        children.push(item)
    } else if (/FormTableItem/i.test(name)) {
        const props = getTemplateFormItemProps(item.props)
        const formItemVnode = h(FormItem, props, {
            default: item.children ? item.children.default || noop : noop,
            label: item.children ? item.children.formItemLabel || noop : noop,
            error: item.children ? item.children.formItemError || noop : noop
        })
        const colProps = getTemplateElColProps(item.props)
        if (typeof colProps.span === 'undefined') {
            colProps.span = 24
        }
        if (typeof colProps.md === 'undefined') {
            colProps.md = 8
        }
        if (typeof colProps.sm === 'undefined') {
            colProps.sm = 12
        }
        children.push(h(ElCol, colProps, [formItemVnode]))
    } else if (/FormItem/i.test(name)) {
        children.push(item)
    }
}

function renderTableItem(children: any[], item: any, name: string) {
    if (/FormTableItem/i.test(name)) {
        let hiddenTableColumn = false
        let hiddenValue = item.props ? item.props.hiddenTableColumn : undefined
        let hiddenValue2 = item.props ? item.props['hidden-table-column'] : undefined
        if (hiddenValue || hiddenValue === '') {
            hiddenTableColumn = true
        } else if (hiddenValue2 || hiddenValue2 === '') {
            hiddenTableColumn = true
        }
        if (hiddenTableColumn) {
            return
        }
        const props = getTemplateElTableColumnProps(item.props)
        children.push(
            h(ElTableColumn, props, {
                default: (data: any) => {
                    const { row, column, $index } = data
                    if (item.children && typeof item.children.table === 'function') {
                        return item.children.table(data)
                    } else {
                        return getPropertyValueByPath(row, item.props.prop, '--')
                    }
                }
            })
        )
    } else if (/TableColumn/i.test(name)) {
        children.push(item)
    }
}

function getSlots(slots: any, clearTableChildren = true, clearFormChildren = true) {
    const defaultSlot: any[] = getSlot(slots.default) || []
    let tableSlot = getSlot(slots.table)
    let formSlot = getSlot(slots.form)
    let form: any = null
    let table: any = null
    if (formSlot) {
        form = findAndFormatElForm(formSlot, clearFormChildren)
    }
    if (tableSlot) {
        table = findAndFormatElTable(tableSlot, clearTableChildren)
    }
    return {
        defaultSlot,
        tableSlot,
        formSlot,
        form,
        table
    }
}

function renderFormTable(slots: any, props: any) {
    const { defaultSlot, tableSlot, form, table, formSlot } = getSlots(slots)
    const tableChildren: any[] = []
    const formItemChildren: any[] = []
    for (const item of defaultSlot) {
        if (typeof item.type === 'string') {
            continue
        }
        // @ts-ignore
        const name = item.type.name
        if (form) {
            renderFormItem(formItemChildren, item, name)
        }
        if (table) {
            renderTableItem(tableChildren, item, name)
        }
    }
    if (isObject(table.children)) {
        table.children.default = () => tableChildren
    } else {
        table.children.push(...tableChildren)
    }
    form.children.push(
        h(
            ElRow,
            {
                gutter: props.gutter
            },
            formItemChildren
        )
    )
    return {
        tableSlot,
        formSlot
    }
}

function renderEditTableForm(slots: any) {
    const { tableSlot, form, formSlot, table } = getSlots(slots, false, true)
    form.children.push(tableSlot)
    return {
        formSlot,
        table,
        form
    }
}

function editTableHandler(slots: any) {
    const { table, form } = getSlots(slots, false, false)
    provide(EditTable, {
        formData: toValue(form.props.model),
        tableData: toValue(table.props.data || [])
    })
}

export default defineComponent({
    name: 'FormTableContainer',
    props: {
        type: {
            type: String as PropType<'edit' | 'default'>,
            default: 'default'
        },
        gutter: {
            type: Number,
            default: 20
        }
    },
    setup(props, { emit, slots, attrs, expose }) {
        if (props.type === 'edit') {
            editTableHandler(slots)
        }
        return () => {
            let container: any = null
            if (props.type === 'default') {
                const { tableSlot, formSlot } = renderFormTable(slots, props)
                container = h('div', attrs, [formSlot, tableSlot])
            } else if (props.type === 'edit') {
                const { formSlot } = renderEditTableForm(slots)
                container = h('div', attrs, [formSlot])
            }
            return container
        }
    }
})
