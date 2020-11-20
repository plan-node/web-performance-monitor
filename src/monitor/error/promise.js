import { send } from '../../sender/send'
import { pre, stores } from '../../config'
import { getStackMessage, getPathSelect } from '../../utils'

export default () => {
  window.addEventListener(
    'unhandledrejection',
    function (e) {
      let message = ''

      let stack = ''

      let filename = ''

      let line = 0
      let col = 0
      let reason = e.reason
      if (typeof reason === 'string') {
        message = reason
      } else if (typeof reason === 'number') {
        message = reason.toString()
      } else if (typeof reason === 'object') {
        message = reason.message
        if (reason.stack) {
          let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
          filename = matchResult[1]
          line = matchResult[2]
          col = matchResult[3]

          stack = getStackMessage(reason.stack)
        }
      }

      let position = `${line}:${col}`

      let selector = window._lastEvent
        ? getPathSelect(window._lastEvent.path)
        : ''

      send(
        stores.promise,
        {
          type: 'error',
          subType: 'promise_error',
          message,
          stack,
          filename,
          position,
          selector
        },
        pre.promise
      )
    },
    true
  )
}
