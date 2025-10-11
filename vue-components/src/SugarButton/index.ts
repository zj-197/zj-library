import { withInstall } from '../install'
import type { SFCWithInstall } from '../component-install-types'
import ZJSugarButton from './index.vue'
export const SugarButton: SFCWithInstall<typeof ZJSugarButton> = withInstall(ZJSugarButton)

export default SugarButton

export * from './types'
export type SugarButtonInstance = InstanceType<typeof ZJSugarButton> & unknown

