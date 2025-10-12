/** 带有重置原数据的钩子 */
export default function useResettableRef<T extends {
    [key: string]: any;
}>(state: T): {
    state: T;
    reset: (data?: T) => void;
};
