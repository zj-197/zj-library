import { withInstall } from '../install'
import type { SFCWithInstall } from '../component-install-types'
import ZJFormItem from './index.vue'
export const FormItem: SFCWithInstall<typeof ZJFormItem> = withInstall(ZJFormItem)

export default FormItem

export * from './types'
export type FormItemInstance = InstanceType<typeof ZJFormItem> & unknown
