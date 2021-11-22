<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import { getToken, setToken } from '@/utils/auth' // get token from cookie
import { token } from '@/api/servers'
export default {
  name: 'App',
  created() {
    const self = this
    setInterval(function() {
      self.heartbeat()
    }, 2000000 + Math.floor(Math.random() * 300000))
  },

  methods: {

    heartbeat() {
      console.log(1)
      const tk = getToken()
      if (tk !== null) {
        token().then(response => {
          console.log(response.data.token)
          setToken(response.data.token)
        })
      }
    }
  }
}
</script>
