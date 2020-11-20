import UAParser from 'ua-parser-js'

import { getNowTime } from '../../utils/time'
import { single } from '../../utils'

/**
 * 共通上报信息
 */
export function generalInfo() {
  const parser = new UAParser()
  const result = parser.getResult()

  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    date: getNowTime(),
    ...single('UA', result)
  }
}
