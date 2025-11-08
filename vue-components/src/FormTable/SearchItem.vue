<script setup lang="ts">
import { Search, Refresh } from '@element-plus/icons-vue'
import { formContextKey } from 'element-plus'
import { computed, inject, nextTick, ref } from 'vue'

const props = withDefaults(
    defineProps<{
        searchText?: string
        resetText?: string
    }>(),
    {
        searchText: '搜索',
        resetText: '重置'
    }
)
const emits = defineEmits<{
    (e: 'search', openLoading: Function, closeLoading: Function): void
    (e: 'reset', openLoading: Function, closeLoading: Function): void
}>()
const formContext = inject(formContextKey)

const isSearchLoading = ref(false)
const isResetLoading = ref(false)
const handleSearch = async () => {
    await formContext?.validateField()
    emits(
        'search',
        () => (isSearchLoading.value = true),
        () => (isSearchLoading.value = false)
    )
}
const handleReset = async () => {
    formContext?.resetFields()
    await nextTick()
    formContext?.clearValidate()
    emits(
        'reset',
        () => (isResetLoading.value = true),
        () => (isResetLoading.value = false)
    )
}
const containerStyle = computed(() => {
    const styles: any = {
        marginLeft: 'auto'
    }
    return styles
})
defineOptions({
    name: 'FormTableSearchItem'
})
</script>

<template>
    <el-form-item>
        <template v-slot:label>
            <span style="color: transparent">.</span>
        </template>
        <div :style="containerStyle">
            <el-button :disabled="isResetLoading" type="primary" :icon="Search" :loading="isSearchLoading" @click.stop="handleSearch">{{ props.searchText }}</el-button>
            <el-button :disabled="isSearchLoading" :loading="isResetLoading" :icon="Refresh" @click.stop="handleReset">{{ props.resetText }}</el-button>
        </div>
    </el-form-item>
</template>
