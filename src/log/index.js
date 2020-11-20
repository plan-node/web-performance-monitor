import { single } from '../utils'

import { __STORAGE_KEY__ } from '../config'

const isDev = process.env.NODE_ENV === 'development'

export class WebLogger {
  constructor(opt) {
    let { host, project, logstore, time, count } = opt
    this.timer = null
    this.host = host //所在区域的host
    this.project = project //project名称
    this.logstore = logstore //logstore名称
    this.time = time || 10 //定义时间，number类型
    this.count = count || 10 //定义数据条数，number类型
    this.arr = []
    this.initSendLocalChunk()
    this.monitorPageClose()
  }

  monitorPageClose() {
    window.onunload = () => {
      if (this.arr.length > 0) {
        localStorage.setItem(__STORAGE_KEY__, JSON.stringify(this.arr))
      }
    }
  }

  initSendLocalChunk() {
    const beforeLoggerChunk = localStorage.getItem(__STORAGE_KEY__)
    if (beforeLoggerChunk && typeof beforeLoggerChunk === 'string') {
      try {
        const sendObj = JSON.parse(beforeLoggerChunk)
        this.logger(sendObj)
        localStorage.removeItem(__STORAGE_KEY__)
      } catch (e) {}
    }
  }

  createHttpRequest() {
    if (window.ActiveXObject) {
      return new ActiveXObject('Microsoft.XMLHTTP')
    } else if (window.XMLHttpRequest) {
      return new XMLHttpRequest()
    }
  }

  logger(arr = this.arr) {
    let url =
      'https://' +
      this.project +
      '.' +
      this.host +
      '/logstores/' +
      this.logstore +
      '/track'

    try {
      const httpRequest_ = this.createHttpRequest()
      httpRequest_.open('POST', url, false)
      httpRequest_.setRequestHeader('x-log-apiversion', '0.6.0')
      const reqPayload = JSON.stringify({
        __logs__: arr
      })
      httpRequest_.setRequestHeader('x-log-bodyrawsize', reqPayload.length)
      const blob = new Blob([reqPayload], {
        type: 'application/x-protobuf'
      })
      httpRequest_.send(blob)
    } catch (ex) {
      if (
        window &&
        window.console &&
        typeof window.console.log === 'function'
      ) {
        console.log(
          'Failed to log to ali log service because of this exception:\n' + ex
        )
        console.log('Failed log data:', url)
      }
    }
  }

  transString(obj) {
    let newObj = {}
    for (let i in obj) {
      newObj[i] = String(obj[i])
    }
    return newObj
  }

  send(pre, originObj) {
    // 若有前缀统一附加
    if (pre) {
      originObj = single(pre, originObj)
    }
    const obj = this.transString(originObj)

    // for development
    if (isDev) {
      console.log(obj)
      return
    }

    if (this.timer) {
      this.arr.push(obj)

      if (this.arr.length === this.count) {
        clearTimeout(this.timer)
        this.timer = null

        this.logSending(this.arr)
      }
    } else {
      const that = this

      this.arr.push(obj)
      this.timer = setTimeout(function () {
        that.logSending(that.arr)
      }, this.time * 1000)
    }
  }

  logSending(content) {
    if (content && content.length > 0) {
      this.logger()
      clearTimeout(this.timer)
      this.timer = null
      this.arr = []
    }
  }
}
