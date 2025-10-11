export interface PageConfig {
    list: string;
    total: string;
}

export interface PageConfigData {
    list: any[];
    page: number;
    pageSize: number;
    total: number;
}

export type LoadListProps = {
    // 数据加载函数
    load: (page: number, pageSize: number, total: number) => Promise<Record<string, any>>;
    errorText?: string;
    emptyText?: string;
    isAutoLoad?: boolean;
    paginationAlign?: 'start' | 'center' | 'end';
    hideOnSinglePage?: boolean;
    disableScrollTop?: boolean;
    hideDefaultEmptyOrErrorHandle?: boolean; // 隐藏默认的当数据为空或发生错误时的处理
    scrollContainer?: any;
    paginationBackground?: boolean,
    paginationLayout?: string,
    paginationSize?: 'large' | 'default' | 'small',
} & {
    pageConfig?: Partial<PageConfig>;
}

export type LoadListInstanceExposed = {
    refresh: (isForce?: boolean, isDisableScrollTop?: boolean) => Promise<any>;
    scrollToTop: () => void;
    refreshOfDelete: (delCount: number) => Promise<any>;
}
