<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>

    <van-popup
      v-model="isChannelShow"
      position="bottom"
      :style="{ height: '98%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
      ><ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'

export default {
  name: 'Home',
  created () {
    this.getMyChannel()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelShow: false
    }
  },
  methods: {
    // 三种情况
    // 1.没有登录，第一次装好app，第一次打开的时候只能去ajax拿
    // 2.没有登录，但是第二次打开，有可能频道被编辑过，这样本地存储就有值，从本地存储拿
    // 3.登录过，直接从ajax拿
    // 只要本地存储有数据且没有登录吗，就从本地拿，否则就从ajax拿
    async getMyChannel () {
      const channels = getItem(CHANNELS)
      if (!this.$store.state.user.token && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          // console.log('res', res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  min-width: 66px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  line-height: 82px;
  text-align: center;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 66px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
