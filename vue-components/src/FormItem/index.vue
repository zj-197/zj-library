<script setup lang="ts">
import { ElFormItem } from 'element-plus'
import { type ComponentInstance, computed, getCurrentInstance, h, useSlots } from 'vue'
import { type FormItemProps } from './types'

defineOptions({
    name: 'FormItem'
})
const props = withDefaults(defineProps<FormItemProps>(), {
    showMessage: true
})
const slots = useSlots()
function hasSelect(slot: any) {
    if (!slot) return null
    const selectArray = ['radio', 'checkbox', 'select', 'switch', 'picker', 'upload', 'slider', 'cascader']
    for (const item of slot) {
        let name = ''
        if (typeof item.type === 'string') {
            name = item.type
        } else if (item.type === 'object') {
            name = item.type.name
        }
        if (new RegExp(selectArray.join('|'), 'i').test(name)) {
            return true
        }
    }
    return false
}
const rules = computed<Array<any>>(() => {
    if (Array.isArray(props.rules)) {
        return props.rules
    }
    const obj = Object.create(null)
    if (props.pattern) {
        obj.pattern = props.pattern
    }
    obj.required = props.required
    if (props.pattern || props.required) {
        obj.type = props.valueType
        obj.trigger = props.trigger
    }
    const isSelect = hasSelect(typeof slots.default === 'function' ? slots.default() : null)
    obj.message = props.message || (isSelect ? '请选择' : '请输入')
    return [obj]
})
const vm = getCurrentInstance()
const changeRef = (instance: any) => {
    if (vm) {
        // 暴露方法
        vm.exposed = vm.exposeProxy = instance || {}
    }
}
defineExpose({} as ComponentInstance<typeof ElFormItem>)
</script>

<template>
    <component :is="h(ElFormItem, { ...$attrs, ...props, rules, ref: changeRef }, $slots)"></component>
</template>
