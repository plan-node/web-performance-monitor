/**
 * 日志上报配置
 */
// 上报服务器
export const __HOST__ = 'region.log.aliyuncs.com'

// 上报项目
export const __PROJECT__ = 'project-name'

// 上报存储区
export const __LOG_STORE__ = 'store-name'

// 上报时间（单位 s）
// 当未满 __LIMIT__ 条日志时，每隔 __MAX_TIME__ 秒上报一次
export const __MAX_TIME__ = 10

// 单次上报日志数
export const __LIMIT__ = 10

/**
 * 不同日志上报区
 * 默认为均上报到 __LOG_STORE__
 */
export const stores = {
  jsSyntax: __LOG_STORE__,
  promise: __LOG_STORE__,
  resource: __LOG_STORE__,
  performance: __LOG_STORE__
}

/**
 * 不同日志上报键前缀，方便索引使用
 * 默认为空
 */
export const pre = {
  jsSyntax: '',
  promise: '',
  resource: '',
  performance: ''
}

/**
 * 本地 localStorage 存储 key 名
 * 当页面关闭时，未上报的日志会以 __STORAGE_KEY__ 存储，以待下次访问时即刻上报
 */
export const __STORAGE_KEY__ = '@logger-chunk'

/**
 * 上报保留位数
 * 默认为小数点后 3 位
 */
export const __RETAIN__ = 3
