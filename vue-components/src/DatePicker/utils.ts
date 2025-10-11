
export function getDateByDate (type: 'before' | 'after', offset:number, unit: 'day' | 'hour' | 'minute', baseDate = new Date()): Date {
	const date = new Date(baseDate.getTime());
	let mill = 0;
	if (unit === 'day') {
		mill = 24 * 3600 * 1000
	} else if (unit === 'hour') {
		mill = 3600 * 1000
	} else if (unit === 'minute') {
		mill = 60 * 1000
	}
	if (type === 'before') {
		date.setTime(date.getTime() - offset * mill);
	} else if (type === 'after') {
		date.setTime(date.getTime() + offset * mill);
	}
	return date
}


export const shortcutsOfDateBefore = [
	{
		text: '今天',
		value: () => new Date(),
	},
	{
		text: '昨天',
		value: () => {
			return getDateByDate('before', 1, 'day')
		},
	},
	{
		text: '前天',
		value: () => {
			return getDateByDate('before', 2, 'day')
		},
	},
	{
		text: '一周前',
		value: () => {
			return getDateByDate('before', 7, 'day')
		},
	},
	{
		text: '两周前',
		value: () => {
			return getDateByDate('before', 14, 'day')
		},
	},
	{
		text: '一个月前',
		value: () => {
			return getDateByDate('before', 30, 'day')
		},
	},
	{
		text: '三个月前',
		value: () => {
			return getDateByDate('before', 30 * 3, 'day')
		},
	},
	{
		text: '一年前',
		value: () => {
			return getDateByDate('before', 365, 'day')
		},
	},
]

export const shortcutsOfDateAfter = [
	{
		text: '今天',
		value: () => new Date(),
	},
	{
		text: '明天',
		value: () => {
			return getDateByDate('after', 1, 'day')
		},
	},
	{
		text: '后天',
		value: () => {
			return getDateByDate('after', 2, 'day')
		},
	},
	{
		text: '一周后',
		value: () => {
			return getDateByDate('after', 7, 'day')
		},
	},
	{
		text: '两周后',
		value: () => {
			return getDateByDate('after', 14, 'day')
		},
	},
	{
		text: '一个月后',
		value: () => {
			return getDateByDate('after', 30, 'day')
		},
	},
	{
		text: '三个月后',
		value: () => {
			return getDateByDate('after', 30 * 3, 'day')
		},
	},
	{
		text: '一年后',
		value: () => {
			return getDateByDate('after', 365, 'day')
		},
	},
]


export const shortcutsOfDateRangeBefore = [
	{
		text: '今天',
		value: () => {
			const date = new Date();
			return [new Date(date.getFullYear(), date.getMonth(), date.getDate()), new Date()]
		},
	},
	{
		text: '最近一天',
		value: () => {
			return [getDateByDate('before', 1, 'day'), new Date()]
		},
	},
	{
		text: '最近两天',
		value: () => {
			return [getDateByDate('before', 2, 'day'), new Date()]
		},
	},
	{
		text: '最近三天',
		value: () => {
			return [getDateByDate('before', 3, 'day'), new Date()]
		},
	},
	{
		text: '最近一周',
		value: () => {
			return [getDateByDate('before', 7, 'day'), new Date()]
		},
	},
	{
		text: '最近两周',
		value: () => {
			return [getDateByDate('before', 14, 'day'), new Date()]
		},
	},
	{
		text: '最近一个月',
		value: () => {
			return [getDateByDate('before', 30, 'day'), new Date()]
		},
	},
	{
		text: '最近三个月',
		value: () => {
			return [getDateByDate('before', 90, 'day'), new Date()]
		},
	},
	{
		text: '最近一年',
		value: () => {
			return [getDateByDate('before', 365, 'day'), new Date()]
		},
	},
]

export const shortcutsOfDateRangeAfter = [
	{
		text: '今天',
		value: () => {
			const date = new Date();
			return [new Date(), new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)]
		},
	},
	{
		text: '往后一天',
		value: () => {
			return [new Date(), getDateByDate('after', 1, 'day')]
		},
	},
	{
		text: '往后两天',
		value: () => {
			return [new Date(), getDateByDate('after', 2, 'day')]
		},
	},
	{
		text: '往后三天',
		value: () => {
			return [new Date(), getDateByDate('after', 3, 'day')]
		},
	},
	{
		text: '往后一周',
		value: () => {
			return [new Date(), getDateByDate('after', 7, 'day')]
		},
	},
	{
		text: '往后两周',
		value: () => {
			return [new Date(), getDateByDate('after', 14, 'day')]
		},
	},
	{
		text: '往后一个月',
		value: () => {
			return [new Date(), getDateByDate('after', 30, 'day')]
		},
	},
	{
		text: '往后三个月',
		value: () => {
			return [new Date(), getDateByDate('after', 30 * 3, 'day')]
		},
	},
	{
		text: '往后一年',
		value: () => {
			return [new Date(), getDateByDate('after', 365, 'day')]
		},
	},
]
