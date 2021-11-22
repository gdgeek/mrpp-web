<template>
  <div class="site-index">
    <div class="login-logo">
      <b>loading ......</b>
    </div>

  </div>
</template>
<script>

import { getToken } from '@/utils/auth' // get token from cookie
export default {
  name: 'SiteIndex',
  computed: {
    url() {
      const token = getToken()
      if (token) {
        return process.env.VUE_APP_BASE_URL + '/proxy?target=' + this.$route.path + '&token=' + token
      } else {
        return process.env.VUE_APP_BASE_URL + this.$route.path
      }
    }
  },
  created: function() {
    window.location.href = this.url
  }

}
</script>
