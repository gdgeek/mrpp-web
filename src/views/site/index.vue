<template>
  <Site>
    <div class="module-head">
      <h1 class="module-welcome">欢迎!</h1>
      <p class="module-text">准备好出发了么？</p>
      <el-alert v-if="alert.show" :title="alert.title" :type="alert.type">
        {{ alert.description }}
      </el-alert>
      <div class="module-link">
        <router-link to="/site/login">
          <el-link type="primary" :underline="false">登录账号</el-link>
        </router-link>
        <br>
        <router-link to="/site/signup">
          <el-link type="primary" :underline="false">注册用户</el-link>
        </router-link>
      </div>
    </div>
    <hr>
    <div class="module-body">
      <div class="module-hint">微信扫码，得到测试资格</div>
      <img
        src="@/assets/image/qrcode.jpg"
        class="module-qrcode"
        width="100%"
        alt="qrcode"
      >
    </div>
  </Site>
</template>

<script>
// @ is an alias to /src
import Site from '@/components/Site.vue'
export default {
  name: 'ModuleIndex',
  components: {
    Site
  },
  computed: {
    alert() {
      return this.$store.state.flash.main
    }
  },
  destroyed() {
    this.$store.commit('flashClean')
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
