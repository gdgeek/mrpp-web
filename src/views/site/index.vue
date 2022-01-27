<template>
  <mr-p-p-site>

    <div v-if="countdown" class="module-head">

      <h1 class="module-welcome">一切即将开始!</h1>
      <p class="module-text">距离网站发布时间：</p>
      <p class="module-text">还剩下{{ leftDay }}天，{{ leftHour }}小时{{ leftMinute }}分{{ leftSecond }}秒。</p>
      <p class="module-text">
        <font-awesome-icon icon="check-circle" @click="touch('a')" />-
        <font-awesome-icon icon="biking" @click="touch('b')" />-
        <font-awesome-icon icon="snowflake" @click="touch('c')" />
      </p>

    </div>
    <div v-else class="module-head">
      <h1 class="module-welcome">欢迎!</h1>
      <p class="module-text">准备好出发了么？</p>

      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane name="login" label="账户密码登录"><mr-p-p-login>账户密码登录</mr-p-p-login></el-tab-pane>
        <el-tab-pane name="qrcode" label="微信扫码（登陆/注册）"><mr-p-p-qrcode :active="qrcode">微信扫码进入</mr-p-p-qrcode></el-tab-pane>
      </el-tabs>

    </div>

  </mr-p-p-site>
</template>

<script>
// @ is an alias to /src
import MrPPSite from '@/components/MrPP/MrPPSite'
import MrPPLogin from '@/components/MrPP/MrPPLogin'
import MrPPQrcode from '@/components/MrPP/MrPPQrcode'
export default {
  name: 'ModuleIndex',
  components: {
    MrPPSite,
    MrPPLogin,
    MrPPQrcode
  },
  data() {
    return {
      activeName: 'login',
      leftDay: 0,
      leftHour: 0,
      leftMinute: 0,
      leftSecond: 0,
      countdown: true,
      passowrd: ''
    }
  },
  computed: {
    qrcode() {
      return this.activeName === 'qrcode'
    }
  },
  watch: {
    $route: {
      handler: function(value) {
        if (value.params.id) {
          this.computeLeftTime()
          this.countDown = setInterval(() => {
            this.computeLeftTime()
          }, 1000)
        } else {
          clearInterval(this.countDown)
          this.countDown = ''
        }
      },
      deep: true
    }
  },
  created() {
    this.computeLeftTime()
    this.countDown = setInterval(() => {
      this.computeLeftTime()
    }, 1000)
  },
  destroyed() {
    // this.$store.commit('flashClean')
  },
  methods: {
    touch(key) {
      if (key === 'c') {
        this.passowrd = ''
      }
      this.passowrd += key
      if (this.passowrd === 'cba') {
        this.countdown = false
      }
    },
    computeLeftTime() { // 计算倒计时
      const endDate = new Date(new Date('2022-02-01T00:00:00'))
      const nowDate = new Date()
      if (endDate <= nowDate) {
        clearInterval(this.countDown)
        // 更新项目状态
        this.countdown = false
      } else {
        const totalSeconds = parseInt((endDate - nowDate) / 1000)
        // 天数
        this.leftDay = Math.floor(totalSeconds / (60 * 60 * 24))
        // 取模（余数）
        var modulo = totalSeconds % (60 * 60 * 24)
        // 小时数
        this.leftHour = Math.floor(modulo / (60 * 60)) > 9 ? Math.floor(modulo / (60 * 60)) : '0' + Math.floor(modulo / (60 * 60)).toString()
        modulo = modulo % (60 * 60)
        // 分钟
        this.leftMinute = Math.floor(modulo / 60) > 9 ? Math.floor(modulo / 60) : '0' + Math.floor(modulo / 60).toString()
        // 秒
        this.leftSecond = modulo % 60 > 9 ? modulo % 60 : '0' + (modulo % 60).toString()
      }
    },
    handleClick(tab, event) {
      console.log(this.activeName)
    }

  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.module-head {
  padding: 10px 10px 10px 10px;
  max-width: 100%;
}

.module-title {
  font-size: 14px;
  padding: 10px 10px 10px 10px;
  text-align: center;
  color: #666;
}

.module-welcome {
  margin-top: 20px;
  font-size: 36px;
  font-weight: normal;
  color: #666;
}

.module-text {
  font-size: 21px;
  font-weight: lighter;
  color: #666;
}

.module-link {
  margin-top: 10px;
}
.module-link a {
  color: rgb(28, 160, 212);
  font-size: 16px;
  line-height: 22px;
}

.module-body {
  padding-top: 14px;
  height: 100%;
  max-width: 100%;
  padding: 10px 10px 20px 10px;
}

.module-hint {
  font-size: 14px;
  font-weight: lighter;
  color: #666;
  font-weight: bold;
}

.module-qrcode {
  margin-top: 2px;
  padding: 6px;
  border: 1px solid;
  border-radius: 4px;
  border-color: rgb(213, 216, 216);
}
</style>
