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
Vue.component('MyIcon', MyIcon)
Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
