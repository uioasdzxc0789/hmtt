import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      // console.log(arr)
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    // 根据索引删一个
    delHistory (state, index) {
      state.searchHistoryList.splice(index, 1)
    },
    // 删除所有
    delAllHistory (state) {
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
