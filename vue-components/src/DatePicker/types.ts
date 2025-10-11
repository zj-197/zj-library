import {type DatePickerProps as ElDatePickerProps} from 'element-plus'

interface CustomProps {
	availableStartDate: Date, // 可选的开始日期
	availableEndDate: Date, // 可选的结束日期
}

export type RequiredPickerProps = ElDatePickerProps & CustomProps

export type DatePickerProps = Partial<RequiredPickerProps>

