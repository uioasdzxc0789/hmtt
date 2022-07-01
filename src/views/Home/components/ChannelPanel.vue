<template>
  <div>
    <div class="channle-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          round
          size="small"
          plain
          hairline
          type="danger"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="index">
          <div
            class="inner"
            :style="{ color: active === index ? 'pink' : '' }"
            @click="onClick(index)"
          >
            {{ item.name
            }}<van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="channle-container">
      <div class="title">
        <h3>频道推荐</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner" @click="add(item.id)">+{{ item.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      // this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
      this.recommendChannels = _.differenceBy(res.data.data.channels, this.channels, 'id')
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      // 关闭按钮是否显示，默认隐藏
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        if (index === 0) return // 推荐是不能删的，所以要排除
        // 删除
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换高亮
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      // 登录过，把持久化放在后台服务器，没登录，放在本地
      async handler (newVal) {
        // console.log(newVal)
        if (this.$store.state.user.token) { // 登录过，从ajax拿
          // 先把频道数据处理一下
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          // 处理完数据，传到ajax函数里
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          // 没登录，直接从本地拿
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channle-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 16px;
    h3 {
      font-size: 32px;
      font-weight: normal;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 47px;
      border-radius: 20px;
    }
  }
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  color: #222222;
  font-size: 28px;
  font-weight: normal;
  text-align: center;
  line-height: 86px;
  margin-bottom: 29px;
  margin-left: 14px;
  position: relative;
  .van-icon-close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
}
</style>
