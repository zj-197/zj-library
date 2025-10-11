declare module 'vue' {
    // GlobalComponents for Volar
    export interface GlobalComponents {
        DatePicker: (typeof import('@zj-library/vue-components'))['DatePicker']
        SelectData: (typeof import('@zj-library/vue-components'))['SelectData']
        LoadList: (typeof import('@zj-library/vue-components'))['LoadList']
        FormItem: (typeof import('@zj-library/vue-components'))['FormItem']
        SugarButton: (typeof import('@zj-library/vue-components'))['SugarButton']
        FormTableContainer: (typeof import('@zj-library/vue-components'))['FormTableContainer']
        FormTableItem: (typeof import('@zj-library/vue-components'))['FormTableItem']
        FormTableSearchItem: (typeof import('@zj-library/vue-components'))['FormTableSearchItem']
        TableEditColumn: (typeof import('@zj-library/vue-components'))['TableEditColumn']
        TableEditColumnAction: (typeof import('@zj-library/vue-components'))['TableEditColumnAction']
    }
}
export {}
