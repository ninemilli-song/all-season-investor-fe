import * as moment from 'moment';
import axios from './api';

export function testMethod() {
    console.log('commonjs -> testMethod invoke');
}

export function testAxios() {
    console.log('commonjs -> testAxios invoke', axios);
}

/**
 * 将数值转换为千分位金额
 * @param value {number} 数值
 * @param decimal {number} 保留小数位数
 * @returns {string} 千分位金额
 */
export function formatCurrency(value, decimal = 2) {
    if (typeof value === 'number' && typeof decimal === 'number') {
        // 处理小数位数
        const newValue = value.toFixed(decimal);
        // 处理千分位
        // 1. 如果存在小数点使用toLocalString方法转换
        // 2. 否则使用正则表达式进行转换
        if (newValue.indexOf('.') !== -1) {
            return parseFloat(newValue).toLocaleString();
        }

        // \B - 非单词边界
        // x(?=y) - 正向肯定查找
        // x(?!y) - 正向否定查找
        return newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return value;
}

/**
 * 格式化时间
 * @param {*} timeStamps 时间戳
 * @param {*} template 模板 ex: YYYY/MM/DD hh:ss:mm
 */
export function formatDatetime(timeStamps, template = 'YYYY/MM/DD hh:ss:mm a') {
    return moment(timeStamps).format(template);
}
