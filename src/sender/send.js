import { generalInfo } from '../monitor/general'
import { getLogger } from './index'

/**
 * 统一上报出口
 * @param {String} logstore 上报区：自定义时可以忽略此内容
 * @param {Object} msg 上报消息对象
 * @param {String} pre 上报统一前缀
 */
export function send(logstore, msg, pre = '') {
  const logger = getLogger(logstore)

  logger.send(pre, {
    ...generalInfo(),
    ...msg
  })
}
