import { genSkus, setPropertyValueByPath, camelCaseToKebab, isEquals, formatDate, timeFrom, kebabToCamelCase } from './src/utils'

const colors = ['red', 'green', 'blue']
const sizes = ['small', 'medium', 'large']
const shapes = ['circle', 'round']

// {color: 'red', size: 'small', shape: 'circle'}
function getUrl(url: string): string {
    return url.replace(/^\/+|\/+$/g, '')
}

console.log(getUrl('10.82.12.10:8000'))

const skus = genSkus({
    size: sizes,
    shape: shapes,
    color: colors
})

console.log(kebabToCamelCase('CDE'))
