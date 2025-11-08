<template>
    <div>
        <form-table-container type="edit">
            <template v-slot:table>
                <el-table size="default" :data="tableData">
                    <table-edit-column label="姓名" prop="name" required>
                        <template v-slot:default="{ formData }">
                            <el-input v-model="formData.name"></el-input>
                        </template>
                    </table-edit-column>
                    <table-edit-column label="年龄" prop="age" value-type="number">
                        <template v-slot:default="{ formData }">
                            <el-input v-model="formData.age"></el-input>
                        </template>
                    </table-edit-column>
                    <table-edit-column-action></table-edit-column-action>
                </el-table>
            </template>
            <template v-slot:form>
                <el-form :model="formData" size="small"></el-form>
            </template>
        </form-table-container>
        <select-data v-model="currentSelect" remote clearable v-model:selected="currentSelectedObject" :options="realOptions"></select-data>
        <form-table-container>
            <template v-slot:table>
                <el-table size="small" :data="tableData"></el-table>
            </template>
            <template v-slot:form>
                <el-form :model="formData" size="small" label-position="top"></el-form>
            </template>
            <form-table-item label="姓名" prop="name">
                <el-input tabindex="1" type="text" placeholder="请输入"></el-input>
            </form-table-item>
            <form-table-item label="年龄" prop="age">
                <el-input type="text"></el-input>
            </form-table-item>
            <form-table-search-item></form-table-search-item>
        </form-table-container>
    </div>
</template>

<script setup lang="ts">
import FormTableContainer from './FormTable/Container'
import FormTableItem from './FormTable/Item.vue'
import { reactive, ref, watch } from 'vue'
import TableEditColumn from './FormTable/EditColumn.vue'
import TableEditColumnAction from './FormTable/EditColumnAction.vue'
import FormTableSearchItem from './FormTable/SearchItem.vue'
import SelectData from './SelectData/index.vue'
import { sleep } from '@zj-library/utils'
const formData = reactive({})
const currentSelect = ref()
const currentSelectedObject = ref()
const realOptions: any = async (query: string) => {
    await sleep(500)
    return {
        data: Array.from({ length: 10 }, (_, i: number) => {
            return {
                label: 'option--' + (i + 1),
                value: i + 1
            }
        })
    }
}
const tableData = ref([
    {
        name: 'zj',
        age: 18
    }
])
</script>
