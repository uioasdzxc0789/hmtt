<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in SuggestList"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      require
    }
  },
  created () { },
  data () {
    return {
      SuggestList: '',
      str: ''
    }
  },
  methods: {
    // 因为这块要渲染的不是普通字符串，而是html片段，所以必须要用v-html，v-html是属性绑定，所以不能用过滤器
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style='color:red'>${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.SuggestList = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 500)
      },
      immediate: true
    }
  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
