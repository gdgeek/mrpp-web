<template>
  <Site>
    <p class="resend-tips">请输入您的邮箱，我们会重新发送验证邮件到这里。</p>
    <el-form ref="form" class="resend-body" :rules="rules" :model="form" label-width="70px">
     <el-form-item label="电子邮件">
       <el-input v-model="form.email" suffix-icon="el-icon-message" />
     </el-form-item>
      <el-form-item class="resend-button">
        <el-button style="width: 160px" type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
     <el-alert
        :title="title"
        type="error"
        v-show="isShow"
        :closable="false"
      ></el-alert>
    <div class="resend-link">
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

export default {
  name: 'resendPasswordReset',
  components: {
    Site
  },
  data() {
    return {
      isShow: false,
      title: 'test',
      form: {
        email: null,
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
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.resend-tips {
  margin: 30px 60px 0;
  text-align: center;
}
.resend-body {
  margin-top: 20px;
  height: 100%;
  max-width: 100%;
  padding: 10px 60px 0px 10px;
}
.resend-button {
  padding-left: 46px;
}
.resend-link {
  padding: 0 10px;
  margin-bottom: 20px;
}
.resend-link a{
  color: rgb(28, 160, 212);
}
</style>

