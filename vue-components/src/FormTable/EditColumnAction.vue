<script setup lang="ts">
import TableEditColumn from './EditColumn.vue'
import { deepClone } from '@zj-library/utils'
import { computed, inject } from 'vue'
import { formContextKey } from 'element-plus'
import { EditTable, IsInputting, __RowCancelLoading__, __RowConfirmLoading__, __RowDeleteLoading__, getELTableColumnProps } from './utils'
import type { ElTableColumnProps, ModelValueItemType } from './types'
defineOptions({
    name: 'TableEditColumnAction'
})

const props = withDefaults(
    defineProps<
        {
            // 编辑的回调
            editCallback?: (openLoading: Function, closeLoading: Function, row: ModelValueItemType, index: number) => void
            // 删除的回调
            deleteCallback?: (openLoading: Function, closeLoading: Function, row: ModelValueItemType, index: number) => void
            // 取消的回调
            cancelCallback?: (openLoading: Function, closeLoading: Function, row: ModelValueItemType, index: number) => void
            // 是否隐藏编辑按钮
            isHiddenEditBtn?: boolean
            // 是否隐藏删除按钮
            isHiddenDeleteBtn?: boolean
            // 是否隐藏取消按钮
            isHiddenCancelBtn?: boolean
            confirmText?: string
            cancelText?: string
            editText?: string
            deleteText?: string
            btnIsText?: boolean
        } & ElTableColumnProps
    >(),
    {
        label: '操作',
        resizable: true,
        filterMultiple: true,
        confirmText: '确定',
        cancelText: '取消',
        editText: '编辑',
        deleteText: '删除',
        btnIsText: true
    }
)
const { formData, tableData } = inject<any>(EditTable)
const formContext = inject(formContextKey)

const tableColumnProps = computed<ElTableColumnProps>(() => {
    return getELTableColumnProps(props)
})
// index行的下标索引
function setRowInputting(index: number, isInputting: boolean) {
    // 先清掉验证信息
    formContext?.clearValidate(Object.keys(tableData[index]).map((item) => index + '.' + item))
    // eslint-disable-next-line vue/no-mutating-props
    tableData[index][IsInputting] = isInputting
}

// 设置行编辑的临时快照
function setEditShortcut(index: number) {
    // eslint-disable-next-line vue/no-mutating-props
    formData[index] = deepClone(tableData[index])
}

// 行的下标索引
function validateRow(index: number) {
    const row = formData[index]
    return formContext?.validateField(Object.keys(row).map((item) => index + '.' + item))
}

async function handleConfirm(index: number) {
    await validateRow(index)
    const formDataRow = formData[index]
    const tableRow = tableData[index]
    const openLoading = () => {
        tableRow[__RowConfirmLoading__] = true
    }
    const closeLoading = () => {
        tableRow[__RowConfirmLoading__] = false
    }
    if (typeof props.editCallback === 'function') {
        await props.editCallback(openLoading, closeLoading, formDataRow, index)
    }
    // eslint-disable-next-line vue/no-mutating-props
    tableData[index] = formData[index]
    setRowInputting(index, false)
}

function handleEdit(index: number) {
    setEditShortcut(index)
    setRowInputting(index, true)
}

async function handleCancel(index: number) {
    const formDataRow = formData[index]
    const tableRow = tableData[index]
    const openLoading = () => {
        tableRow[__RowCancelLoading__] = true
    }
    const closeLoading = () => {
        tableRow[__RowCancelLoading__] = false
    }
    if (typeof props.cancelCallback === 'function') {
        await props.cancelCallback(openLoading, closeLoading, formDataRow, index)
    }
    setRowInputting(index, false)
}

// 删除
function handleDelete(index: number) {
    if (typeof props.deleteCallback === 'function') {
        const tableRow = tableData[index]
        const openLoading = () => {
            tableRow[__RowDeleteLoading__] = true
        }
        const closeLoading = () => {
            tableRow[__RowDeleteLoading__] = false
        }
        props.deleteCallback(openLoading, closeLoading, tableRow, index)
    } else {
        tableData.splice(index, 1)
    }
}

defineExpose({
    setRowInputting,
    setEditShortcut,
    validateRow,
    handleEdit,
    handleConfirm,
    async confirm() {
        await formContext?.validateField()
        const indexArr: number[] = []
        for (let i = 0; i < tableData.length; i++) {
            const item = tableData[i]
            if (item[IsInputting]) {
                indexArr.push(i)
            }
        }
        const req: any = []
        for (const item of indexArr) {
            req.push(handleConfirm(item))
        }
        await Promise.all(req)
    }
})
</script>

<template>
    <!--  S 操作列  -->
    <table-edit-column v-bind="tableColumnProps">
        <template v-slot:header="{ column, index }">
            <slot v-if="$slots.header" name="header" :column="column" :index="index"></slot>
        </template>
        <template v-slot:default="{ row, index }">
            <el-button type="primary" :text="props.btnIsText" :disabled="row[__RowCancelLoading__]" :loading="row[__RowConfirmLoading__]" @click.stop="handleConfirm(index)">
                {{ props.confirmText }}
            </el-button>
            <el-button
                v-if="!props.isHiddenCancelBtn"
                type="danger"
                :text="props.btnIsText"
                :loading="row[__RowCancelLoading__]"
                :disabled="row[__RowConfirmLoading__]"
                @click.stop="handleCancel(index)"
            >
                {{ props.cancelText }}
            </el-button>
        </template>
        <template v-slot:view="{ row, index, column }">
            <el-button type="primary" v-if="!props.isHiddenEditBtn" :text="props.btnIsText" @click="handleEdit(index)">{{ props.editText }}</el-button>
            <slot name="other-actions" :column="column" :index="index" :row="row"></slot>
            <el-button type="danger" v-if="!props.isHiddenDeleteBtn" :loading="row[__RowDeleteLoading__]" @click.stop="handleDelete(index)" :text="props.btnIsText">
                {{ props.deleteText }}
            </el-button>
        </template>
    </table-edit-column>
    <!--  E 操作列  -->
</template>
