/**
 * 颜色相关的处理
 *
 * @author 左建
 * @exports mix, darken,  light
 */
/**
 * 模拟 SCSS mix() 函数，混合两种颜色
 *
 * @param color1 第一种颜色（十六进制，如 #1963dc）
 * @param color2 第二种颜色（十六进制，如 #ffffff）
 * @param weight 第一种颜色的权重（0-100 或 "0%-100%"，默认 50）
 * @returns 混合后的十六进制颜色
 */
export declare function mix(color1: string, color2: string, weight?: number | string): string;
/**
 * 与白色混合，传10表示变浅到原来的10%
 *
 * @param color 第一种颜色（十六进制，如 #1963dc）
 * @param weight 第一种颜色的权重（0-100 或 "0%-100%"，默认 50）
 * @returns 混合后的十六进制颜色
 */
export declare function light(color: string, weight?: number | string): string;
/**
 * 与黑色混合 传10表示加深10%
 *
 * @param color 第一种颜色（十六进制，如 #1963dc）
 * @param weight 第一种颜色的权重（0-100 或 "0%-100%"，默认 50）
 * @returns 混合后的十六进制颜色
 */
export declare function darken(color: string, weight?: number | string): string;
