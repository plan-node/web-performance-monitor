import { send } from '../../sender/send'
import { timeFixed } from '../../utils/time'
import { stores, pre } from '../../config'
import { single } from '../../utils'

export function recordResource() {
  const data = window.performance.getEntriesByType('resource')
  const resource = {
    script: [],
    img: [],
    link: [],
    css: []
  }

  data.forEach((item) => {
    const arr = resource[item.initiatorType]
    if (!arr) {
      return
    }
    const info = {
      name: item.name,
      ...timeFixed({ duration: item?.duration ?? '' }),
      size: item.transferSize,
      protocol: item.nextHopProtocol
    }
    if (item.initiatorType === 'link' && item.name.includes('.css')) {
      resource['css'].push(info)
    } else {
      arr.push(info)
    }
  })

  send(
    stores.performance,
    {
      type: 'performance',
      subType: 'resource',
      ...single('res', resource)
    },
    pre.performance
  )
}
