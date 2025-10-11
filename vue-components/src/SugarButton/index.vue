<script setup lang="ts">
import { ElMessageBox } from "element-plus";
import { reactive } from "vue";
import type {SugarButtonProps} from "./types.ts";
defineOptions({
  name: "SugarButton",
})
const props = defineProps<SugarButtonProps>()


const emits = defineEmits<{
  (e: 'click', evt: MouseEvent, ...arg:any[]): void
}>()

const loadingState = reactive({
  isLoading: false,
  closeLoading () {
    loadingState.isLoading = false
  },
  openLoading () {
    loadingState.isLoading = true
  }
})

const handleClick = async (evt: MouseEvent) => {
  if (props.autoLoading) {
    emits('click', evt, loadingState.openLoading, loadingState.closeLoading)
  } else if (props.autoMessageBox && props.messageBoxOptions) {
    try {
      await ElMessageBox(props.messageBoxOptions)
      emits('click', evt, 'confirm')
    } catch(e) {
      emits('click', evt,'cancel')
    }
  } else {
    emits('click', evt)
  }
}


</script>

<template>
<el-button v-bind="props"
           @click="handleClick"
           :loading="loadingState.isLoading">
  <slot></slot>
  <template v-slot:icon>
    <slot name="icon" v-if="$slots.icon"></slot>
  </template>
  <template v-slot:loading>
    <slot name="loading" v-if="$slots.loading"></slot>
  </template>
</el-button>
</template>
