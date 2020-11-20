import { send } from '../../sender/send'
import { single, getPathSelect } from '../../utils'
import { timeFixed } from '../../utils/time'
import { stores, pre } from '../../config'

/**
 * 绘制指标监察器
 */
export function recordPaint() {
  /**
   * FMP ( First Meaningful Paint ) -> 首次有意义的绘制
   * @description 页面可用性的量度标准
   */
  let FMP = null

  /**
   * LCP ( Large Contentful Paint ) -> 最大内容渲染
   * @description 在 viewport 中最大的页面元素加载时间
   */
  let LCP = null

  if (PerformanceObserver) {
    // FMP
    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries()
      FMP = perfEntries[0]

      FMP = {
        duration: FMP?.duration || '',
        startTime: FMP?.startTime || ''
      }

      observer.disconnect()
    }).observe({ entryTypes: ['element'] })

    // LCP
    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries()
      LCP = perfEntries[0]

      LCP = {
        duration: LCP?.duration || '',
        startTime: LCP?.startTime || '',
        renderTime: LCP.renderTime || ''
      }

      observer.disconnect()
    }).observe({ entryTypes: ['largest-contentful-paint'] })
  }

  /**
   * FP ( First Paint ) -> 首次绘制
   * @description 将第一个像素点绘制到屏幕的时刻
   */
  let FP = performance.getEntriesByName('first-paint')[0]
  FP = {
    duration: FP?.duration || '',
    startTime: FP?.startTime || ''
  }

  /**
   * FCP ( First Content Paint ) -> 首次内容绘制
   * @description 浏览器将第一个DOM渲染到屏幕的时间
   */
  let FCP = performance.getEntriesByName('first-contentful-paint')[0]
  FCP = {
    duration: FCP?.duration || '',
    startTime: FCP?.startTime || ''
  }

  send(
    stores.performance,
    timeFixed({
      type: 'performance',
      subType: 'paint_core',
      ...single('FP', FP),
      ...single('FCP', FCP),
      ...single('FMP', FMP),
      ...single('LCP', LCP)
    }),
    pre.performance
  )

  /**
   * FID ( First Input Delay ) -> 首次交互延迟
   * @description 首次和页面交互到页面响应交互的时间
   */
  let FID = null

  // FID
  if (PerformanceObserver) {
    new PerformanceObserver((entryList, observer) => {
      let firstInput = entryList.getEntries()[0]
      if (firstInput) {
        // 处理延迟
        let inputDelay = firstInput.processingStart - firstInput.startTime

        // 处理耗时
        let duration = firstInput.duration

        // 开始时间
        let startTime = firstInput.startTime

        // 选择器
        let selector = window._lastEvent
          ? getPathSelect(window._lastEvent?.path)
          : ''

        FID = {
          duration,
          inputDelay,
          startTime,
          selector
        }

        if (inputDelay > 0 || duration > 0) {
          send(
            stores.performance,
            timeFixed({
              type: 'performance',
              subType: 'paint_fid',
              ...single('FID', FID)
            }),
            pre.performance
          )
        }
      }
      observer.disconnect()
    }).observe({ type: 'first-input', buffered: true })
  }
}
