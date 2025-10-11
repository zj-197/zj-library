import type {ButtonProps, ElMessageBoxOptions} from "element-plus";

export type SugarButtonPropsRequired = Omit<ButtonProps, 'loading'> & {
    // 自动loading
    autoLoading: boolean,
    // 自动弹出ELMsgBox
    autoMessageBox: boolean,
    messageBoxOptions: ElMessageBoxOptions
}

export type SugarButtonProps = Partial<SugarButtonPropsRequired>
