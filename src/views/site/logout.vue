<template>
  <Site>
    <div class="logout-head">
      <h1 class="logout-welcome">欢迎!</h1>
      <p class="logout-text">准备好出发了么？</p>
      <div>
         <p class="logout-lead"></p>
      </div>
    </div>
  </Site>
</template>

<script>
// @ is an alias to /src
import Site from '@/components/Site.vue'

import { Logout } from '@/api/user'
export default {
  name: 'Logout',
  components: {
    Site
  },
  created: function (){
    verifEmail(this.token).then(response => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    })
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.logout-head {
  padding: 10px 10px 10px 10px;
  max-width: 100%;
}

.logout-title {
  font-size: 14px;
  padding: 10px 10px 10px 10px;
  text-align: center;
  color: #666;
}

.logout-welcome {
  margin-top: 20px;
  font-size: 36px;
  font-weight: normal;
  color: #666;
}

.logout-text {
  font-size: 21px;
  font-weight: lighter;
  color: #666;
}

.logout-lead {
  font-size: 21px;
  font-weight: lighter;
  color: #666;
}
</style>