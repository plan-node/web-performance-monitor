import { WebLogger } from '../log'
import {
  __HOST__,
  __PROJECT__,
  __LOG_STORE__,
  __MAX_TIME__,
  __LIMIT__
} from '../config'

/**
 * 创建日志对象并挂载到全局
 * @param {Object} 配置对象
 */
export function createInstance({
  host = __HOST__,
  project = __PROJECT__,
  logstore = __MAX_TIME__,
  time = __MAX_TIME__,
  count = __LIMIT__
}) {
  if (!window._logInstance) {
    window._logInstance = {}
  }
  if (window._logInstance[logstore]) {
    return window._logInstance[logstore]
  }
  const result = (window._logInstance[logstore] = new WebLogger({
    host,
    project,
    logstore,
    time,
    count
  }))
  return result
}

/**
 * 获取日志对象
 * @param {String} logstore 日志对象存储区
 */
export function getLogger(logstore) {
  if (window._logInstance && window._logInstance[logstore]) {
    return window._logInstance[logstore]
  }
  return createInstance({ logstore })
}
