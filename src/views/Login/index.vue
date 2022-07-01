<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号不符合格式' },
        ]"
      >
        <!-- 插槽和属性名同时有的时间，优先插槽 -->
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
        <MyIcon name="shouji" slot="left-icon"></MyIcon>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是6位' },
        ]"
      >
        <!-- <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i> -->
        <MyIcon name="yanzhengma" slot="left-icon"></MyIcon>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!-- 加native-type=‘button’把他变成普通按钮，不再带有提交属性 -->
          <van-button
            @click="onSendSms"
            v-else
            size="small"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '18042476213',
      code: '246810',
      time: 5 * 1000,
      isCountDownShow: false// 默认不显示倒计时效果
    }
  },
  methods: {
    async onSubmit (values) {
      const res = await login(values)
      console.log(res)
      // token有效期2小时，两种思路，让用户重新登录，refresh_token
      this.$store.commit('setUser', res.data.data)
      this.$router.push({ name: 'my' })
    },
    async onSendSms () {
      try {
        // 验证表单，验证一下点发送时候有没有填写手机号
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true// 显示倒计时
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        console.log(err)
        // 轻提示
        this.$toast.fail('手机号格式不对')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
  margin-right: 39px;
}
.yzm {
  position: fixed;
  right: 10px;
  width: 152px;
  height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  .van-button__content {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
</style>
