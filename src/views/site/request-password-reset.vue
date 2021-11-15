<template>
  <Site>
    <p class="request-tips">请填写你的电子邮件。一个重置密码的链接将被发送到那里。</p>
    <el-form ref="form" class="request-body" :model="form" label-width="80px">
      <el-form-item label="密码">
        <el-input v-model="form.name" suffix-icon="el-icon-lock" />
      </el-form-item>

      <el-form-item class="request-button">
        <el-button type="primary" @click="onSubmit">确定</el-button>
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

export default {
  name: 'RequestIndex',
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
      console.log('submit!')
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
  font-weight: lighter;
}
.request-body {
  margin-top: 20px;
  height: 100%;
  max-width: 100%;
  padding: 10px 60px 0px 10px;
}
.request-button {
  padding-left: 180px;
}
.request-link {
  padding: 0 10px;
  margin-bottom: 20px;
}
.request-link a{
  color: rgb(28, 160, 212);
}
</style>

