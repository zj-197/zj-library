import { type SelectProps as ElSelectProps } from 'element-plus'

interface CustomProps {
    options: Array<any> | ((...args: any[]) => Promise<any>)
    labelKey: string
    valueKey: string
    selected: Record<string, any>
}

export type SelectPropsRequired = ElSelectProps & CustomProps

export type SelectProps = Partial<SelectPropsRequired>
