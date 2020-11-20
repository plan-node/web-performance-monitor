import { typeOf } from '../../utils'

import { recordBase } from './base'
import { recordPaint } from './paint'
import { recordResource } from './resource'

/**
 * 性能监察器
 */
export default () => {
  // 白屏时间
  if (window.performance.timing) {
    window._whiteScreen = new Date() - window.performance.timing.navigationStart
  }

  function recordRender() {
    if (!window.performance.timing) {
      return
    }

    recordBase()
    recordPaint()
  }

  function recordPerformance() {
    recordRender()
    recordResource()
  }

  const loadEvent = window.onload
  const loadEventType = typeOf(loadEvent)

  window.onload = () => {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(recordPerformance)
    } else {
      setTimeout(recordPerformance, 0)
    }

    if (loadEventType === 'Function') {
      loadEvent()
    }
  }
}
