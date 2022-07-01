import request from '@/utils/request'

/**
 *获取我的频道
 * @returns
 */
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

/**
 *获取文章列表
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

/**
 * 获取所有列表
 */
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}

/**
 *频道数据持久化
 * @param {*} channels
 * @returns
 */
export const saveChannels = (channels) => {
  return request({
    method: 'PUT',
    url: 'user/channels',
    data: {
      channels
    }
  })
}

// get delete ->params
// post put =>data
