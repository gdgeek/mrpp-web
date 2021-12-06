<template>
  <div>

    <h2 class="login-title">微信扫码（登陆/注册）</h2>
    <div v-if="active">
      <el-image
        :src="qrcode "
        style="width: 100%; height: 300px"
        fit="contain"
        lazy
      />
    </div>

  </div>
</template>

<script>

import { qrcode, openid } from '@/api/wechats'
import { setToken } from '@/utils/auth'
// @ is an alias to /src
export default {
  name: 'MrPPQrcode',
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      qrcode: null,
      token: null,
      interval: null
    }
  },
  watch: {
    active(value) {
      const self = this
      if (value) {
        if (self.qrcode === null) {
          self.init()
        }
        self.enable()
      } else {
        self.disable()
      }
    }
  },
  beforeDestroy() {
    this.disable()
  },
  methods: {
    init() {
      const self = this
      qrcode().then(response => {
        console.log(response.data.qrcode)
        self.qrcode = response.data.qrcode
        self.token = response.data.token
      })
    },
    refresh() {
      const self = this
      openid(this.token).then((response) => {
        console.log(response.data)
        if (typeof (response.data) !== 'undefined') {
          console.log(self.token)
          console.log(response.data.token)
          if (typeof (response.data.token) !== 'undefined' && response.data.token === self.token) {
            if (typeof (response.data.access_token) !== 'undefined') {
              setToken(response.data.access_token)
              this.$router.push('/')
              // this.$router.push({ path: '/site/wechat-login', query: { token: response.data.token }})
            } else {
              this.$router.push({ path: '/site/wechat-signup', query: { token: response.data.token }})
            }
          }
        }
      })
    },
    enable() {
      const self = this
      self.interval = setInterval(() => {
        self.refresh()
      }, 3000)
    },
    disable() {
      const self = this
      clearInterval(self.interval)
    }
  }
}
</script>
