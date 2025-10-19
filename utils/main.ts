import { sleep, setPropertyValueByPath, camelCaseToKebab, isEquals, formatDate, timeFrom } from './src/utils'
let index = 0

const fn1 = async () => {
    await sleep(500)
    console.log('fn1')
}
const fn2 = async () => {
    await sleep(500)
    console.log('fn2')
}
const fn3 = async () => {
    await sleep(500)
    console.log('fn3')
    return Promise.reject('错误fn3')
}
const fn4 = async () => {
    await sleep(500)
    console.log('fn4')
}
const fn5 = async () => {
    await sleep(500)
    console.log('fn5')
}
const obj = {}
console.log({ b: { c: [[{ e: 1 }]] } })
console.log(setPropertyValueByPath(obj, 'b.c[0][0].e', 1), 'setPropertyValueByPath')
console.log(camelCaseToKebab('GelloorldHeelp'), 'setPropertyValueByPath')

console.log(timeFrom(1760814851))
