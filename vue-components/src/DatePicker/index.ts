import { withInstall } from '../install'
import type { SFCWithInstall } from '../component-install-types'
import ZJDatePicker from './index.vue'
export const DatePicker: SFCWithInstall<typeof ZJDatePicker> = withInstall(ZJDatePicker)

export default DatePicker

export * from './types'
export type DatePickerInstance = InstanceType<typeof ZJDatePicker> & unknown
