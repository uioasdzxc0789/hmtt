// 为了方便项目中使用本地存储的时候，简化操作，封装获取 设置 删除 全部删除工具
// window.localStorage.setItem('a', "['a']")解析这种数据会报错"['a']"，所以需要判断

/**
 *获取
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}

/**
 * 存储
 */
export function setItem (key, value) {
  if (typeof value === 'object') { // 复合数据类型
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

/**
 * 删除
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有本地存储
 */

export function clearItem () {
  window.localStorage.clearItem()
}
