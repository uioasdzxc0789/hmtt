import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import MyIcon from '@/components/MyIcon.vue'
import 'vant/lib/index.css'
import 'amfe-flexible'
// import '@/styles/icon.less'
import 'vant/lib/index.less'
// import '@/styles/base.less'
import '@/styles/index.less'

// 一次性把filters/index.js中所有的按需导出全部导进来,作为obj属性，Object.keys获取整个数组
import * as obj from '@/filters/index'

import FollowUser from '@/components/FollowUser.vue'
// 引入全局注册的js文件
import '@/components'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.config.productionTip = false
Vue.component('MyIcon', MyIcon)
Vue.component(FollowUser.name, FollowUser)
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 给页面上所有的元素绑定滚动事件
//  只要谁滚动 就打印出来
// setTimeout(() => {
//   const list = document.querySelectorAll('*')
//   list.forEach(item => {
//     item.onscroll = function (e) {
//       console.log(e.target)
//     }
//   })
// }, 1000)
