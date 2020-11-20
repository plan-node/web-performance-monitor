import { send } from '../../sender/send'
import { pre, stores } from '../../config'
import { getPathSelect } from '../../utils'

export default () => {
  window.addEventListener(
    'error',
    function (e) {
      // 只处理非 window 事件
      if (e.target !== window && (e.target.src || e.target.href)) {
        let filename = e.target.src || e.target.href || ''

        let tagName = e.target.tagName?.toLocaleLowerCase() || ''

        let selector = window._lastEvent
          ? getPathSelect(window._lastEvent.path)
          : ''

        send(
          stores.resource,
          {
            type: 'error',
            subType: 'resource_error',
            filename,
            tagName,
            selector
          },
          pre.resource
        )
      }
    },
    true
  )
}
