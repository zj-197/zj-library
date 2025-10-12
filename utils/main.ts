import { loadTaskWithRetry, loadTaskRetryFixCount, loadTasks } from './src/load'
import { sleep } from './src/utils'
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
