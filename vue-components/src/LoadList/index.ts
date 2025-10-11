import { withInstall } from '../install'
import type { SFCWithInstall } from '../component-install-types'
import ZJLoadList from './index.vue'
export const LoadList: SFCWithInstall<typeof ZJLoadList> = withInstall(ZJLoadList)

export default LoadList

export * from './types'
export type LoadListInstance = InstanceType<typeof ZJLoadList> & unknown
