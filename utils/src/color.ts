/**
 * 颜色相关的处理
 *
 * @author 左建
 * @exports mix, darken,  light
 */

/**
 * 解析十六进制颜色为 RGB 对象
 *
 * @param hex 十六进制颜色（支持 #fff、#ffffff 格式）
 * @returns RGB 通道值（r, g, b 范围 0-255）
 */
function parseHexColor(hex: string): { r: number; g: number; b: number } {
    // 移除 # 号
    const cleanedHex = hex.replace(/^#/, '')
    // 处理 3 位简写（如 #f00 → #ff0000）
    const normalizedHex =
        cleanedHex.length === 3
            ? cleanedHex
                  .split('')
                  .map((char) => char + char)
                  .join('')
            : cleanedHex

    // 提取 R、G、B 通道（16进制转10进制）
    return {
        r: parseInt(normalizedHex.slice(0, 2), 16),
        g: parseInt(normalizedHex.slice(2, 4), 16),
        b: parseInt(normalizedHex.slice(4, 6), 16)
    }
}

/**
 * 将 RGB 值转换为十六进制颜色
 *
 * @param r 红色通道（0-255）
 * @param g 绿色通道（0-255）
 * @param b 蓝色通道（0-255）
 * @returns 十六进制颜色（如 #1963dc）
 */
function rgbToHex(r: number, g: number, b: number): string {
    // 确保值在 0-255 范围内
    const clamp = (value: number): number => Math.max(0, Math.min(255, Math.round(value)))
    // 转换为两位十六进制（补零）
    const toHex = (value: number): string => {
        const hex = clamp(value).toString(16)
        return hex.length === 1 ? `0${hex}` : hex
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * 模拟 SCSS mix() 函数，混合两种颜色
 *
 * @param color1 第一种颜色（十六进制，如 #1963dc）
 * @param color2 第二种颜色（十六进制，如 #ffffff）
 * @param weight 第一种颜色的权重（0-100 或 "0%-100%"，默认 50）
 * @returns 混合后的十六进制颜色
 */
export function mix(color1: string, color2: string, weight: number | string = 50): string {
    // 解析两种颜色的 RGB 值
    const { r: r1, g: g1, b: b1 } = parseHexColor(color1)
    const { r: r2, g: g2, b: b2 } = parseHexColor(color2)

    // 处理权重（转换为 0-1 的比例）
    let ratio: number
    if (typeof weight === 'string') {
        // 处理 "50%" 格式（提取数字部分）
        ratio = parseFloat(weight.replace(/%/, '')) / 100
    } else {
        // 处理数字格式（如 50）
        ratio = weight / 100
    }
    // 限制比例在 0-1 之间（类型安全：确保不会超出范围）
    ratio = Math.max(0, Math.min(1, ratio))

    // 计算混合后的 RGB 值（按权重比例混合）
    const r = r1 * ratio + r2 * (1 - ratio)
    const g = g1 * ratio + g2 * (1 - ratio)
    const b = b1 * ratio + b2 * (1 - ratio)

    // 转换为十六进制并返回
    return rgbToHex(r, g, b)
}

/**
 * 与白色混合，传10表示变浅到原来的10%
 *
 * @param color 第一种颜色（十六进制，如 #1963dc）
 * @param weight 第一种颜色的权重（0-100 或 "0%-100%"，默认 50）
 * @returns 混合后的十六进制颜色
 */
export function light(color: string, weight: number | string = 50) {
    return mix(color, '#ffffff', weight)
}

/**
 * 与黑色混合 传10表示加深10%
 *
 * @param color 第一种颜色（十六进制，如 #1963dc）
 * @param weight 第一种颜色的权重（0-100 或 "0%-100%"，默认 50）
 * @returns 混合后的十六进制颜色
 */
export function darken(color: string, weight: number | string = 50) {
    return mix('#000000', color, weight)
}
