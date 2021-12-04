<template>
  <mr-p-p-site>{{ qrcode }}
  </mr-p-p-site>
</template>

<script>

import { wechatQrcode } from '@/api/sites'
// @ is an alias to /src
import MrPPSite from '@/components/MrPP/MrPPSite'
export default {
  name: 'Wechat',
  components: {
    MrPPSite
  },

  data() {
    return {
      qrcode: 123
    }
  },
  created() {
    wechatQrcode().then(response => {
      console.log(response.data.qrcode)
      this.qrcode = response.data.qrcode
    })
    // alert(1)
  }

}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.signup-title {
  color: #444444;
  margin: 20px 0 20px;
  text-align: center;
  font-weight: bold;
}
.signup-head {
  padding: 0 10px 10px 10px;
  max-width: 100%;
}
.signup-form {
  margin-top: 20px;
  height: 100%;
  max-width: 100%;
  padding: 10px 20px 0px 10px;
}
.signup-link {
  padding: 10px 10px 10px 10px;
}
.signup-link a {
  color: rgb(28, 160, 212);
  font-size: 16px;
}

.signup-body {
  padding-top: 14px;
  height: 100%;
  max-width: 100%;
  padding: 10px 10px 20px 10px;
}

.signup-hint {
  font-size: 14px;
  font-weight: lighter;
  color: #666;
  font-weight: bold;
}

.signup-qrcode {
  margin-top: 2px;
  border: 1px solid;
  border-radius: 4px;
  border-color: rgb(213, 216, 216);
}
</style>
