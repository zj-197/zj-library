import { withInstall } from '../install'
import type { SFCWithInstall } from '../component-install-types'
import ZJFormTableContainer from './Container.ts'
import ZJTableEditColumn from './EditColumn.vue'
import ZJTableEditColumnAction from './EditColumnAction.vue'
import ZJFormTableSearchItem from './SearchItem.vue'
import ZJFormTableItem from './Item.vue'
export { ZJTableEditColumn as TableEditColumn, ZJTableEditColumnAction as TableEditColumnAction, ZJFormTableSearchItem as FormTableSearchItem, ZJFormTableItem as FormTableItem }
export const FormTableContainer: SFCWithInstall<typeof ZJFormTableContainer> = withInstall(ZJFormTableContainer, {
    TableEditColumn: ZJTableEditColumn,
    TableEditColumnAction: ZJTableEditColumnAction,
    FormTableSearchItem: ZJFormTableSearchItem,
    FormTableItem: ZJFormTableItem
})

export default FormTableContainer

export * from './types'
export type FormTableContainerInstance = InstanceType<typeof ZJFormTableContainer> & unknown
