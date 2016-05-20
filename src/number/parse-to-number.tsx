import * as _ from 'lodash'

export default (value: any, scope: any, fullLength: boolean, ignoreParent?: boolean): string => {
    let number: string

    value = _.gt(parseFloat(value), parseFloat(scope.props.max)) ? scope.props.max : value
    value = _.lt(parseFloat(value), parseFloat(scope.props.min)) ? scope.props.min : value

    if (!scope.props.float) {
        number = _.parseInt(value).toString()
    } else {
        if (fullLength) {
            number = parseFloat(value).toFixed(scope.props.float)
        } else {
            number = parseFloat(value).toString()
        }
    }

    if (_.isNaN(number)) {
        number = '0'
    }

    // 允许空值
    if (value === '' || value === undefined) {
        number = ''
    }

    // 允许单独写一个-,因为可能在写一个负数
    if (value === '-') {
        number = '-'
    }

    // 浮点计数下允许-0
    if (scope.props.float && value === '-0') {
        number = '-0'
    }

    // 当前面有值的时候,允许后面写一个.,因为可能在写一个小数
    if (scope.props.float && value && value !== '' && value.length > 1) {
        if (value[value.length - 1] === '.' || value[value.length - 1] === '。') {
            number = number + '.'
        }
    }

    // 浮点计数下允许-0.
    if (scope.props.float && value === '-0.') {
        number = '-0.'
    }

    // 浮点时不能超过精度
    if (scope.props.float) {
        let arr = number.toString().split('.')
        // 小数点后面有值
        if (arr.length > 1 && arr[1].length > parseInt(scope.props.float)) {
            number = parseFloat(number).toFixed(scope.props.float).toString()
        }
    }

    // 传给父级干净的值
    if (!ignoreParent && number !== '' && !_.isNaN(number)) {
        if (!scope.props.float) {
            //scope.props.onChange(parseInt(number))
        } else {
            //scope.props.onChange(parseFloat(number).toFixed(scope.props.float))
        }
    }

    return number
}