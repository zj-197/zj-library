import { type FormItemProps as ElFormItemProps } from 'element-plus'
type ValueType = 'string' | 'number' | 'array' | 'object' | 'boolean' | 'date'

interface CustomFormItem  {
	valueType: ValueType,
	pattern: RegExp,
	trigger: 'change' | 'blur',
	message: string
}
export type FormItemPropsRequired = ElFormItemProps & CustomFormItem

export type FormItemProps = Partial<FormItemPropsRequired>
