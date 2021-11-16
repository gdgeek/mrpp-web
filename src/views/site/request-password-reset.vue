<template>
  <Site>
    <p class="request-tips">请输入您注册时候的邮箱，一个重置密码的链接将被发送到那里。</p>
    <el-form ref="form" class="request-body" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="注册邮箱"  prop="email">
        <el-input v-model="form.email" suffix-icon="el-icon-lock" />
      </el-form-item>

      <el-form-item class="request-button">
        <el-button style="width: 160px" type="primary" @click="submit('form')">确定</el-button>
      </el-form-item>
    </el-form>
    <div class="request-link">
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

import { requestPasswordReset } from '@/api/user'
export default {
  name: 'RequestPasswordReset',
  components: {
    Site
  },
  data() {
    return {
       form: {
        email: null
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submit (formName) {
      let self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.postEmail()
        } else {
          return false
        }
      })
    },
    postEmail () {
      let self = this
      requestPasswordReset({
        PasswordResetRequestForm: self.form
      }).then((response) => {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
        
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.request-tips {
  margin: 30px 60px 0;
  text-align: center;
}
.request-body {
  margin-top: 20px;
  height: 100%;
  max-width: 100%;
  padding: 10px 60px 0px 10px;
}
.request-button {
  padding-left: 46px;
}
.request-link {
  padding: 0 10px;
  margin-bottom: 20px;
}
.request-link a{
  color: rgb(28, 160, 212);
}
</style>

