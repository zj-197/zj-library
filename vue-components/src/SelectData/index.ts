import { withInstall } from '../install'
import type { SFCWithInstall } from '../component-install-types'
import ZJSelectData from './index.vue'
export const SelectData: SFCWithInstall<typeof ZJSelectData> = withInstall(ZJSelectData)

export default SelectData

export * from './types'
export type SelectDataInstance = InstanceType<typeof ZJSelectData> & unknown
