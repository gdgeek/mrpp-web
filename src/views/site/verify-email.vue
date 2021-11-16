<template>
  <Site>
    <div class="verify-head">
      <h1 class="verify-welcome">欢迎!</h1>
      <p class="verify-text">准备好出发了么？</p>
      <div>
         <p class="verify-lead">正在验证信箱</p>
      </div>
    </div>
  </Site>
</template>

<script>
// @ is an alias to /src
import Site from '@/components/Site.vue'

export default {
  name: 'VerifyEmail',
  components: {
    Site
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.verify-head {
  padding: 10px 10px 10px 10px;
  max-width: 100%;
}

.verify-title {
  font-size: 14px;
  padding: 10px 10px 10px 10px;
  text-align: center;
  color: #666;
}

.verify-welcome {
  margin-top: 20px;
  font-size: 36px;
  font-weight: normal;
  color: #666;
}

.verify-text {
  font-size: 21px;
  font-weight: lighter;
  color: #666;
}

.verify-lead {
  font-size: 21px;
  font-weight: lighter;
  color: #666;
}
</style>