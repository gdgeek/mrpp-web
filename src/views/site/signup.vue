<template>
  <Site>
    <div class="signup-head">
      <el-form class="signup-form" label-width="70px">
        <el-form-item label="用户名">
          <el-input suffix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input suffix-icon="el-icon-message" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input suffix-icon="el-icon-lock" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input suffix-icon="el-icon-view" />
        </el-form-item>
        <el-form-item label="邀请码">
          <el-input suffix-icon="el-icon-connection" />
        </el-form-item>
        <el-form-item>
          <el-button-group class="signup-button">
            <el-button type="primary">注册</el-button>
            <el-button>重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
      <div class="signup-link">
        <router-link to="/site/login">
          <el-link type="primary" :underline="false">登录账号 </el-link>
        </router-link>
        <br>
        <router-link to="/site/request-password-reset">
          <el-link type="primary" :underline="false">找回遗忘的密码 </el-link>
        </router-link>
        <br>
      </div>
    </div>
    <hr>
    <div class="signup-body">
      <div class="signup-hint">微信扫码，得到测试资格</div>
      <img
        src="@/assets/qrcode.jpg"
        class="signup-qrcode"
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
  name: 'Signup',
  components: {
    Site
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.signup-head {
  padding: 10px 10px 10px 10px;
  max-width: 100%;
}
.signup-form {
  margin-top: 10px;
  height: 100%;
  max-width: 100%;
  padding: 10px 20px 0px 10px;
}
.signup-button {
  padding-left: 50px;
}
.signup-link {
  padding: 10px 10px 10px 10px;
}
.signup-link a{
  color: rgb(28, 160, 212);
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
