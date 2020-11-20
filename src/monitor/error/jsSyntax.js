import { stores, pre } from '../../config'
import { getStackMessage, getPathSelect } from '../../utils'
import { send } from '../../sender/send'

export default () => {
  window.addEventListener(
    'error',
    (e) => {
      // 只处理 window 事件
      if (e.target !== window) {
        return
      }

      let message = e.message || ''

      let stack = getStackMessage(e.error?.stack)

      let filename = e.filename || ''

      let position = e.lineno && e.colno && `${e.lineno}:${e.colno}`

      let selector = window._lastEvent
        ? getPathSelect(window._lastEvent.path)
        : ''

      send(
        stores.jsSyntax,
        {
          type: 'error',
          errorType: 'js_error',
          message,
          stack,
          filename,
          position,
          selector
        },
        pre.jsSyntax
      )
    },
    true
  )
}
