<template>
  <Site>
    <el-form class="login-body" ref="form" :model="form" label-width="75px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" suffix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.name" suffix-icon="el-icon-lock"></el-input>
      </el-form-item>

      <el-form-item class="login-button">
        <el-button type="primary" @click="onSubmit">开始创造世界</el-button>
      </el-form-item>
    </el-form>
    <div class="login-link">
      <router-link to="/site/signup">
        <el-link type="primary" :underline="false">注册新账号 </el-link>
      </router-link>
      <br />
      <router-link to="/site/request-password-reset">
        <el-link type="primary" :underline="false">找回遗忘的密码 </el-link>
      </router-link>
      <br />
    </div>
  </Site>
</template>

<script>
// @ is an alias to /src
import Site from '@/components/Site.vue'

export default {
  name: 'Login',
  components: {
    Site
  },
  data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-body {
  margin-top: 20px;
  height: 100%;
  max-width: 100%;
  padding: 10px 40px 0px 10px;
}
.login-button {
  padding-left: 146px;
}
.login-link {
  padding: 0 10px;
  margin-bottom: 20px;
}
.login-link a{ 
  color: rgb(28, 160, 212); 
} 
</style>

