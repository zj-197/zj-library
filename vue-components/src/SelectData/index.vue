<script setup lang="ts">
import {type SelectProps} from './types'
import {ElSelect} from "element-plus";
import {type ComponentInstance, computed, getCurrentInstance, h, mergeProps} from 'vue'
import {getOptionsConfig, getSelectedItemByValue} from "./utils";

defineOptions({
  name: "SelectData"
})
const props = withDefaults(defineProps<SelectProps>(), {
  reserveKeyword: true,
  teleported: true,
  persistent: true,
  validateEvent: true,
  showArrow: true,
  suffixTransition: true,
  labelKey: 'label',
  valueKey: 'value',
})
const emits = defineEmits<{
  (e: 'update:selected', val: Record<string, any>): void
}>()
const vm = getCurrentInstance()
const changeRef = (instance: any) => {
  if (vm) {
    // 暴露方法
    vm.exposed = vm.exposeProxy = instance || {};
  }
}
const dict = getOptionsConfig(props);
const remoteRelativeProps = computed(() => {
  if (props.remote) {
    return {
      remote: true,
      filterable: true,
      loading: dict.loading.value,
      // @ts-ignore
      remoteMethod: dict.remoteMethod,
      reserveKeyword: true,
      remoteShowSuffix: true
    };
  }
  return {}
});
defineExpose({} as ComponentInstance<typeof ElSelect>)
</script>

<template>
  <component :is="h(ElSelect, mergeProps({
    ...$attrs,
    ...props,
    ...remoteRelativeProps,
    options: dict.options.value,
    ref: changeRef
}, {
    onChange: (val:any) => {
      const item = getSelectedItemByValue(dict.options, val)
      emits('update:selected', item as Record<string, any>)
    },
}), $slots)"></component>
</template>
