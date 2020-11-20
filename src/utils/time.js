import { typeOf } from './index'
import dayjs from 'dayjs'

/**
 * 获取当前时间
 */
export function getNowTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 处理时间记录对象为秒单位且保留 3 位小数
 * @param {Object} obj
 */
export function timeFixed(obj) {
  for (let i in obj) {
    if (typeOf(obj[i]) === 'Number') {
      obj[i] = (obj[i] / 1000).toFixed(3)
    }
  }
  return obj
}
