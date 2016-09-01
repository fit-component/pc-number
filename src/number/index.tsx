import * as React from 'react'
import * as classNames from 'classnames'
import Input from '../../../input/src'
import * as $ from 'jquery'
import parseToNumber from './parse-to-number'
import * as module from './module'
import Button from '../../../button/src'
import {others} from '../../../../common/transmit-transparently/src'
import './index.scss'

let interval: any

export default class Number extends React.Component<module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    constructor(props: any) {
        super(props)
        this.state = {
            value: this.props.value ? parseToNumber(this.props.value, this, true) : parseToNumber(this.props.defaultValue, this, true)
        }
    }

    // 鼠标松开后停止计数
    handleMouseUp() {
        clearInterval(interval)
    }

    componentDidMount() {
        $(document).on('mouseup', this.handleMouseUp)
    }

    componentWillUnmount() {
        $(document).off('mouseup', this.handleMouseUp)
    }

    componentWillReceiveProps(nextProps: module.PropsInterface) {
        if ('value' in nextProps) {
            this.setState({
                value: parseToNumber(nextProps.value, this, true)
            })
        }
    }

    increase() {
        interval = setInterval(() => {
            this.safeSetValue((parseFloat(this.state.value) || 0) + this.props.step, true)
        }, this.props.speed)
        this.safeSetValue((parseFloat(this.state.value) || 0) + this.props.step, true)
    }

    reduce() {
        interval = setInterval(() => {
            this.safeSetValue((parseFloat(this.state.value) || 0) - this.props.step, true)
        }, this.props.speed)
        this.safeSetValue((parseFloat(this.state.value) || 0) - this.props.step, true)
    }

    // input后跟随内容
    rightRender() {
        return (
            <div className="addon">
                <Button onMouseDown={this.increase.bind(this) } type="secondary">
                    <span className="fit-number-arrow-up"/>
                </Button>
                <Button onMouseDown={this.reduce.bind(this) } type="secondary">
                    <span className="fit-number-arrow-down"/>
                </Button>
            </div>
        )
    }

    handleChange(event: any) {
        this.safeSetValue(event.target.value)
        this.props['onChange'] && this.props['onChange'](event)
    }

    safeSetValue(value: any, fullLength?: boolean) {
        this.setState({
            value: parseToNumber(value, this, fullLength)
        })
    }

    render() {
        const _others = others(new module.Props(), this.props, ['onChange'])
        const {className, height, width} = this.props
        const classes = classNames({
            '_namespace': true,
            [className]: className
        })

        return (
            <Input {..._others}
                className={classes}
                value={this.state.value}
                onChange={this.handleChange.bind(this) }
                rightRender={this.rightRender.bind(this) }/>
        )
    }
}