import { recordLastEvent as startRecordLastEvent } from './event'

import jsSyntaxMonitor from './error/jsSyntax'
import promiseMonitor from './error/promise'
import resourceMonitor from './error/resource'

import performanceMonitor from './performance'

// 事件监听
startRecordLastEvent()

// 错误监察器
jsSyntaxMonitor()

promiseMonitor()

resourceMonitor()

// 性能监察器
performanceMonitor()
