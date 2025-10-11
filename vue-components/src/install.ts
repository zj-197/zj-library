import { noop } from '@zj-library/utils'
import type { App, Directive } from 'vue'
import type { SFCWithInstall } from './component-install-types'

export const withInstall = <T, E extends Record<string, any>>(
    main: T,
    extra?: E
) => {
    ;(main as SFCWithInstall<T>).install = (app: App): void => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp)
        }
    }

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            ;(main as any)[key] = comp
        }
    }
    return main as SFCWithInstall<T> & E
}


export const withInstallDirective = <T extends Directive>(
    directive: T,
    name: string
) => {
    ;(directive as SFCWithInstall<T>).install = (app: App): void => {
        app.directive(name, directive)
    }

    return directive as SFCWithInstall<T>
}

export const withNoopInstall = <T>(component: T) => {
    ;(component as SFCWithInstall<T>).install = noop

    return component as SFCWithInstall<T>
}
