import { send } from '../../sender/send'
import { timeFixed } from '../../utils/time'
import { stores, pre } from '../../config'

/**
 * 记录基础性能指标
 */
export function recordBase() {
  const {
    unloadEventStart,
    unloadEventEnd,
    fetchStart,
    connectStart,
    connectEnd,
    redirectStart,
    redirectEnd,
    requestStart,
    responseStart,
    responseEnd,
    domComplete,
    domLoading,
    domInteractive,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    loadEventStart
  } = window.performance.timing

  // 连接时间
  let connect = connectEnd - connectStart

  // 重定向耗时
  let redirect = redirectEnd - redirectStart

  // 首字节时间
  let ttfb = responseStart - requestStart

  // 请求耗时
  let request = responseEnd - requestStart

  // 响应读取时间
  let response = responseEnd - responseStart

  // dom解析时间
  let parseDOM = loadEventStart - domLoading

  // 脚本执行时间
  let domContentLoaded = domContentLoadedEventEnd - domContentLoadedEventStart

  // DOM 渲染耗时
  let domRender = domComplete - domLoading

  // 页面卸载耗时
  let unload = unloadEventEnd - unloadEventStart

  // 首次可交互时间
  let interactive = domInteractive - fetchStart

  // 完整加载时间
  let load = loadEventStart - fetchStart

  // 白屏时间
  let whiteScreen = window._whiteScreen ?? ''

  send(
    stores.performance,
    timeFixed({
      type: 'performance',
      subType: 'base',
      connect,
      ttfb,
      redirect,
      response,
      parseDOM,
      domContentLoaded,
      interactive,
      domRender,
      load,
      unload,
      request,
      whiteScreen
    }),
    pre.performance
  )
}
