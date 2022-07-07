<template>
  <div>
    <van-loading v-if="isLoading" size=".63333rem" />
    <van-icon
      v-else
      :color="is_collected ? 'yellow' : '#777'"
      :name="is_collected ? 'star' : 'star-o'"
      @click="onClick"
    />
  </div>
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      // ajax开始
      this.isLoading = true
      // 获取目标文章id
      const target = this.$route.params.article_id
      if (this.is_collected) {
        // 取消收藏
        try {
          await delCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      }
      // ajax结束
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
