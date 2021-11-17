<template>
  <Site>
    <h2 class="reset-title">重置密码</h2>
    <p class="reset-tips">请输入您新的密码，用于重置。</p>
    <el-form ref="form" class="reset-body" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="密码" prop="password">
        <el-input autocomplete="off" suffix-icon="el-icon-lock" v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="form.checkPassword" autocomplete="off" suffix-icon="el-icon-view" />
      </el-form-item>
      <el-form-item class="reset-button">
        <el-button style="width: 120px" type="primary" @click="submit('form')">确定</el-button>
      </el-form-item>
    </el-form>
    <div class="reset-link">
      <router-link to="/site/login">
        <el-link type="primary" :underline="false">登录账号 </el-link>
      </router-link>
      <br>
      <router-link to="/site/signup">
        <el-link type="primary" :underline="false">注册用户 </el-link>
      </router-link>
      <br>
    </div>
  </Site>
</template>

<script>
// @ is an alias to /src
import Site from '@/components/Site.vue'

import { RestpPassword } from '@/api/user'
export default {
  name: 'ResetPassword',
  components: {
    Site
  },
  data() {
    return {
       form: {
        password: null
      },
      rules: {
         password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度应该大于6', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.reset-title {
    color: #444444;
    margin: 20px 0 20px;
    text-align: center;
    font-weight: bold;
}
.reset-tips {
  margin: 10px 60px 0;
  text-align: center;
}
.reset-body {
  margin-top: 20px;
  height: 100%;
  max-width: 100%;
  padding: 10px 30px 0px 20px;
}
.reset-button {
  text-align:right;
}
.reset-link {
  
  padding: 0 10px;
  margin-bottom: 20px;
}
.reset-link a{
  color: rgb(28, 160, 212);
  font-size: 16px;
}
</style>

