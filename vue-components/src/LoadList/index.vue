<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { LoadListProps, PageConfigData, PageConfig } from './types'
defineOptions({
    name: 'LoadList'
})

const props = withDefaults(defineProps<LoadListProps>(), {
    paginationBackground: true,
    paginationSize: 'default',
    paginationLayout: 'total, sizes, prev, pager, next, jumper'
})

const emits = defineEmits<{
    (e: 'loaded', pagerData: PageConfigData): void
}>()

const realPageConfig = computed<PageConfig>(() => {
    return Object.assign(
        {
            list: 'list',
            total: 'total'
        },
        props.pageConfig
    )
})

const pagerData = reactive<PageConfigData>({
    page: 1,
    list: [],
    pageSize: 10,
    total: 10
})
const isLoading = ref<boolean>(false)
const isError = ref<boolean>(false)

const isShowEmpty = computed<boolean>(() => {
    if (isLoading.value) return false
    if (!Array.isArray(pagerData.list)) return true
    if (pagerData.list.length === 0) return true
    return false
})

async function getData() {
    let page = pagerData.page
    const pageSize = pagerData.pageSize
    try {
        isLoading.value = true
        isError.value = false
        const res = await props.load(page, pageSize, pagerData.total)
        const total: number = res[realPageConfig.value.total]
        const list: any[] = res[realPageConfig.value.list] || []
        pagerData.total = total
        pagerData.list = list
        isLoading.value = false
        emits('loaded', pagerData)
        return res
    } catch (e) {
        console.error(e)
        isError.value = true
        isLoading.value = false
        pagerData.list.length = 0
        pagerData.total = 0
        return Promise.reject(e)
    }
}

if (props.isAutoLoad) {
    getData()
}

// 删除的时候刷新列表的方法
const refreshOfDelete = (delCount = 1) => {
    const { pageSize, total, page } = pagerData
    const maxPage = Math.max(Math.ceil((total - delCount) / pageSize), 1)
    pagerData.page = Math.min(maxPage, page)
    return getData()
}

function refresh(isForce?: boolean, isScrollTop = !props.disableScrollTop) {
    // 强制刷新页码归0
    if (isForce) {
        pagerData.page = 1
    }
    if (isScrollTop) {
        scrollToTop()
    }
    return getData()
}

const loadContainer = ref<any>()

// 滚动到顶部
function scrollToTop() {
    if (props.scrollContainer) {
        props.scrollContainer.scroll({
            top: 0,
            behavior: 'smooth'
        })
        return
    }
    let el: Element | null = loadContainer.value
    const overflowOfScroll = ['overlay', 'auto', 'scroll']
    while (el) {
        // 如果可以滚动
        if (el.scrollHeight > el.clientHeight && overflowOfScroll.includes(getComputedStyle(el).overflowY)) {
            if (el === document.body) {
                el = document.documentElement || document.body
            }
            el.scroll({
                top: 0,
                behavior: 'smooth'
            })
            break
        } else {
            el = el.parentElement
        }
    }
}
function handlePagination() {
    if (!props.disableScrollTop) {
        scrollToTop()
    }
    return getData()
}

defineExpose({
    refresh,
    scrollToTop,
    refreshOfDelete
})
</script>

<template>
    <div ref="loadContainer" v-loading="isLoading" element-loading-text="加载中...">
        <slot :list="pagerData.list" :page="pagerData.page" :pageSize="pagerData.pageSize" :total="pagerData.total"></slot>
        <template v-if="!props.hideDefaultEmptyOrErrorHandle">
            <slot name="error" v-if="isError">
                <el-empty :description="props.errorText || '加载错误'">
                    <el-button type="primary" size="small" @click.stop="getData">重新加载</el-button>
                </el-empty>
            </slot>
            <slot name="empty" v-else-if="isShowEmpty">
                <el-empty :description="props.emptyText || '暂无数据'">
                    <el-button type="primary" size="small" @click.stop="getData">重新加载</el-button>
                </el-empty>
            </slot>
        </template>
        <el-row :justify="props.paginationAlign || 'center'" align="middle">
            <el-pagination
                v-model:current-page="pagerData.page"
                :total="pagerData.total"
                :background="props.paginationBackground"
                :hide-on-single-page="props.hideOnSinglePage"
                :layout="props.paginationLayout"
                :size="props.paginationSize"
                v-model:page-size="pagerData.pageSize"
                @current-change="handlePagination"
                @size-change="handlePagination"
            ></el-pagination>
        </el-row>
    </div>
</template>
