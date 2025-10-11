import { type FormItemProps } from './types'
import type { Writable } from 'element-plus/es/utils'
import { getCameCaseObject } from '@zj-library/utils'

export function getFormItemProps(props: any): Writable<FormItemProps> {
    return {
        error: props.error,
        for: props.for,
        inlineMessage: props.inlineMessage,
        label: props.label,
        labelPosition: props.labelPosition,
        labelWidth: props.labelWidth,
        message: props.message,
        pattern: props.pattern,
        prop: props.prop,
        required: props.required,
        rules: props.rules,
        showMessage: props.showMessage,
        size: props.size,
        trigger: props.trigger,
        validateStatus: props.validateStatus,
        valueType: props.valueType
    }
}

export function getTemplateFormItemProps(props: any) {
    props = getCameCaseObject(props)
    const completeProps = getFormItemProps(props)

    for (const key in completeProps) {
        if (key in props) {
            continue
        }
        // @ts-ignore
        delete completeProps[key]
    }

    return completeProps
}
