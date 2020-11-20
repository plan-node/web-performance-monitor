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
<head>
  <!-- ... -->
  <script src="/dist/web-monitor.min.js"></script>
</head>
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

