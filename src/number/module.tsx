export interface PropsInterface {
    /**
     * 值
     */
    value?: number | string

    /**
     * 初始值
     */
    defaultValue?: number | string

    /**
     * 最小值
     */
    min?: number

    /**
     * 最大值
     */
    max?: number

    /**
     * 增减步长
     */
    step?: number

    /**
     * 是否支持浮点类型
     */
    float?: boolean

    /**
     * 长按变化频率
     */
    speed?: number

    [x: string]: any
}

export class Props implements PropsInterface {
    value = ''
    min = -Infinity
    max = Infinity
    step = 1
    float = false
    speed = 200
}

export interface StateInterface {
    value?: string
}

export class State implements StateInterface {

}