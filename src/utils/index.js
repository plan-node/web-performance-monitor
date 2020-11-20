/**
 * 无限扁平化对象至一层结构，前缀会自动叠加
 * @param {String} pre 前缀
 * @param {Object} obj
 */
export function single(pre, obj) {
  const singleObj = {}

  const process = {
    String(prefix, obj) {
      singleObj[prefix] = obj
    },
    Array(prefix, obj) {
      obj.forEach((i, index) => {
        process[typeOf(i)](`${prefix}_${index}`, i)
      })
    },
    Object(prefix, obj) {
      for (let i in obj) {
        process[typeOf(obj[i])](`${prefix}_${i}`, obj[i])
      }
    },
    Number(prefix, obj) {
      singleObj[prefix] = obj
    },
    Undefined() {},
    Null() {}
  }

  process[typeOf(obj)](pre, obj)

  return singleObj
}

/**
 * 获取传入值类型
 * @param {Object} obj
 */
export function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

/**
 * 获取堆栈信息
 */
export function getStackMessage(stack) {
  if (!stack) return ''
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^')
}

/**
 * 获取 event.path 的位置选择器
 * @param {Element[]} path
 */
export function getPathSelect(path) {
  let select = []
  if (Array.isArray(path)) {
    path.forEach((i) => {
      if (i.id) {
        select.push('#' + i.id)
      } else if (i.classList || i.nodeName) {
        if (i.nodeName) {
          select.push(i.nodeName.toLowerCase())
        }
        if (i.classList) {
          let arr = Array.from(i.classList)
          let classPath = arr.join('.') ? '.' + arr.join('.') : null
          classPath && select.push(classPath)
        }
      } else {
        select.push(i.constructor.name.toLowerCase())
      }
    })
  }
  return select.reverse().join(' ')
}
