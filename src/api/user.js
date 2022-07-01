import request from '@/utils/request'
// 只有在vue组件views文件中才能用this.$store，在js文件中没有this，所以只能导入

/**
 *获取短信验证码
 * @param {number} mobile
 * @returns promise
 */

export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 获取用户个人资料
 */
export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}
