# web-performance-monitor

网页性能监控 18 项数据指标，浏览器信息，错误收集上报方案，前端工程化。

*version: 1.0*

## 监控范围

### 通用

 * 浏览器信息

 * 网页标题

 * URL

 * 上报时间 ( YYYY-MM-DD HH:mm:ss / timestamp )

### 错误收集

 * JavaScript 语法错误

 * 资源加载错误

 * Promise 错误

### 性能监控

#### Base

1. 上次页面卸载耗时

2. 连接时间

3. 重定向耗时

4. 请求耗时

5. 获取首字节时间 ( TTFB )

6. 响应读取时间

7. Dom 解析时间

8. 脚本执行时间

9. Dom 渲染耗时

10. 首次可交互时间

11. 页面完整加载时间

12. 白屏时间

#### Render

13. FMP ( First Meaningful Paint ) : 首次有意义的绘制

14. LCP ( Large Contentful Paint ) : 最大内容渲染

15. FP ( First Paint ) : 首次绘制时间

16. FCP ( First Content Paint ) : 首次内容绘制时间

17. FID ( First Input Delay ) : 首次交互延迟

#### Resource

18. 资源加载时间 ( JavaScript / Css / Img )


## 使用

本项目默认基于 Aliyun 日志监控服务上报，你可以在 `./src/config/index.js` 配置日志上报地址：

```js
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
```

之后执行构建：

```bash
  yarn build
```

最后在网站链入 `./dist/web-monitor.min.js` 即可开启上报：

```html
<body>
  <!-- ... -->
  <script src="/dist/web-monitor.min.js"></script>
</body>
```

## 开发

开发构建：

```bash
  yarn dev
```

之后在 `./test/index.html` 进行本地调试，当处于 development 模式时，所有上报均会在控制台打印。

### 自定义上报

如果你需要自定义上报，可以在统一发送出口 `./src/sender/send.js` 实现 `logger.send()` 方法。

实现前：

```js
import { generalInfo } from '../monitor/general'
import { getLogger } from './index'

// 原上报方法
export function send(logstore, msg, pre = '') {
  const logger = getLogger(logstore)

  logger.send(pre, {
    ...generalInfo(),  // 通用信息对象
    ...msg             // 当前上报信息对象
  })
}
```

实现后：

```js
import { generalInfo } from '../monitor/general'

// 新上报方法
export function send(logstore, msg, pre = '') {
  const logger = new NewLogger(options)

  logger.send({
    ...generalInfo(),
    ...msg
  })
}
```

如果需要满足更复杂的场景，可以继续实现 `./src/sender/index.js` 中派发日志实例的出口。

## 上报一览

### User-Agent

|key|说明|
|:-:|:-:|
|`UA_ua`|user-agent|
|`UA_browser_name`|浏览器名|
|`UA_browser_major`|浏览器主版本|
|`UA_browser_version`|浏览器版本|
|`UA_cpu_architecture`|系统 cpu 架构|
|`UA_engine_name`|浏览器渲染引擎|
|`UA_engine_version`|浏览器渲染引擎版本|
|`UA_os_name`|用户操作系统|
|`UA_os_version`|用户操作系统版本|

### Common

|key|说明|
|:-:|:-:|
|`title`|网页标题|
|`url`|当前网址|
|`timestamp`|上报时的时间戳|
|`date`|上报时的格式化时间|
|`type`|上报类型 `error` / `performance` |
|`subType`|上报子类型|

### Error

#### JavaScript

|key|说明|
|:-:|:-:|
|`type`|上报类型 `error` |
|`subType`|上报子类型 `js_error`|
|`message`|错误信息|
|`position`|错误位置|
|`stack`|栈信息|
|`selector`|错误元素选择器|

#### Resource

|key|说明|
|:-:|:-:|
|`type`|上报类型 `error` |
|`subType`|上报子类型 `resource_error`|
|`tagName`|错误节点标签名|
|`selector`|错误元素选择器|

#### Promise

|key|说明|
|:-:|:-:|
|`type`|上报类型 `error` |
|`subType`|上报子类型 `promise_error`|
|`message`|错误信息|
|`position`|错误位置|
|`stack`|栈信息|
|`selector`|错误元素选择器|

### Performance

#### Base

|key|说明|
|:-:|:-:|
|`type`|上报类型 `performance` |
|`subType`|上报子类型 `base`|
|`connect`|连接时间|
|`domContentLoaded`|脚本执行时间|
|`domRender`|Dom 渲染耗时|
|`interactive`|首次可交互时间|
|`load`|完整加载时间|
|`parseDOM`|Dom 解析时间|
|`redirect`|重定向耗时|
|`request`|请求耗时|
|`response`|响应读取时间|
|`ttfb`|获取首字节时间|
|`unload`|上次页面卸载耗时|
|`whiteScreen`|白屏时间|


#### Paint

##### Core

|key|说明|
|:-:|:-:|
|`type`|上报类型 `performance` |
|`subType`|上报子类型 `paint_core`|
|`FCP_duration`|首次内容绘制时间延迟|
|`FCP_startTime`|首次内容绘制开始时间|
|`FP_duration`|首次绘制时间延迟|
|`FP_startTime`|首次绘制开始时间|


##### FID

|key|说明|
|:-:|:-:|
|`type`|上报类型 `performance` |
|`subType`|上报子类型 `paint_fid`|
|`FID_duration`|首次交互处理耗时|
|`FID_inputDelay`|首次交互处理延迟|
|`FID_selector`|首次交互元素选择器|
|`FID_startTime`|首次交互时间|


#### Resource

|key|说明|
|:-:|:-:|
|`type`|上报类型 `performance` |
|`subType`|上报子类型 `resource`|
|`res_type_n_name`|`type` 类型的第 `n` 个资源名称|
|`res_type_n_duration`|`type` 类型的第 `n` 个资源加载耗时|
|`res_type_n_protocol`|`type` 类型的第 `n` 个资源所用协议|
|`res_type_n_size`|`type` 类型的第 `n` 个资源大小|

## 其他

### 上报单位

默认统一采用 `s` 为单位，保留 `3` 位小数，你可以在 `./src/config/index.js` 修改：

```js
  /**
   * 上报保留位数
   * 默认为小数点后 3 位
   */
  export const __RETAIN__ = 3
```