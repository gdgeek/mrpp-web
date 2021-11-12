<template>
  <Site>
    <div class="login-head">
      <h1 class="login-welcome">欢迎!</h1>
      <p class="login-text">准备好出发了么？</p>
      <div class="login-link">
        <router-link to="/site/login">
          <el-link type="primary" :underline="false">登录账号 </el-link>
        </router-link>
        <br />
        <router-link to="/site/signup">
          <el-link type="primary" :underline="false">注册用户 </el-link>
        </router-link>
        <br />
      </div>
    </div>
    <hr />
    <div class="login-body">
      <div class="login-hint">微信扫码，得到测试资格</div>
      <img
        src="@/assets/qrcode.jpg"
        class="login-qrcode"
        width="100%"
        alt="qrcode"
      />
    </div>
  </Site>
</template>

<script>
// @ is an alias to /src
import Site from '@/components/Site.vue'

export default {
  name: 'LoginIndex',
  components: {
    Site
  }
}
</script>



<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-head {
  padding: 10px 10px 10px 10px;
  max-width: 100%;
}

.login-title {
  font-size: 14px;
  padding: 10px 10px 10px 10px;
  text-align: center;
  color: #666;
}

.login-welcome {
  left: 20px;
  top: 76px;
  font-size: 36px;
  font-weight: normal;
  color: #666;
}

.login-text {
  left: 20px;
  top: 152px;
  font-size: 21px;
  font-weight: lighter;
  color: #666;
}

.login-link {
  left: 20px;
  top: 220px;
}

.login-body {
  padding-top: 14px;
  height: 100%;
  max-width: 100%;
  padding: 10px 10px 20px 10px;
  // background-color: rgb(127, 193, 219);
}

.login-hint {
  font-size: 14px;
  font-weight: lighter;
  color: #666;
  font-weight: bold;
  // background-color: pink;
}

.login-qrcode {
  margin-top: 2px;
  border: 1px solid;
  border-radius: 4px;
  border-color: rgb(213, 216, 216);
}
</style>
