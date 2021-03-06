export const timing = {
  // 同一个浏览器上一个页面卸载(unload)结束时的时间戳。如果没有上一个页面，这个值会和fetchStart相同。
  navigationStart: 1543806782096,

  // 上一个页面unload事件抛出时的时间戳。如果没有上一个页面，这个值会返回0。
  unloadEventStart: 1543806782523,

  // 和 unloadEventStart 相对应，unload事件处理完成时的时间戳。如果没有上一个页面,这个值会返回0。
  unloadEventEnd: 1543806782523,

  // 第一个HTTP重定向开始时的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0。
  redirectStart: 0,

  // 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的时间戳。
  // 如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
  redirectEnd: 0,

  // 浏览器准备好使用HTTP请求来获取(fetch)文档的时间戳。这个时间点会在检查任何应用缓存之前。
  fetchStart: 1543806782096,

  // DNS 域名查询开始的UNIX时间戳。
  //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和fetchStart一致。
  domainLookupStart: 1543806782096,

  // DNS 域名查询完成的时间.
  //如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
  domainLookupEnd: 1543806782096,

  // HTTP（TCP） 域名查询结束的时间戳。
  //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart一致。
  connectStart: 1543806782099,

  // HTTP（TCP） 返回浏览器与服务器之间的连接建立时的时间戳。
  // 如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
  connectEnd: 1543806782227,

  // HTTPS 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0。
  secureConnectionStart: 1543806782162,

  // 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。
  requestStart: 1543806782241,

  // 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳。
  //如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
  responseStart: 1543806782516,

  // 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时
  //（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳。
  responseEnd: 1543806782537,

  // 当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的时间戳。
  domLoading: 1543806782573,

  // 当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的时间戳。
  domInteractive: 1543806783203,

  // 当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳。
  domContentLoadedEventStart: 1543806783203,

  // 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳。
  domContentLoadedEventEnd: 1543806783216,

  // 当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的时间戳
  domComplete: 1543806783796,

  // load事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是0。
  loadEventStart: 1543806783796,

  // 当load事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.
  loadEventEnd: 1543806783802
}
