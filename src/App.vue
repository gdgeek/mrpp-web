<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import { AbilityRouter, UpdateAbility } from '@/ability/ability'
import { getToken, setToken } from '@/utils/auth'
import { token } from '@/api/servers'
export default {
  name: 'App',

  watch: {
    '$store.state.user.roles': function() {
      UpdateAbility(this.$ability, this.$store.state.user.roles)
    }

  },
  created() {
    const self = this
    setInterval(function() {
      self.heartbeat()
    }, 360000)

    this.$router.beforeEach((to, from, next) => {
      if (self.$can('goto', new AbilityRouter(to.path))) {
        next()
      } else {
        this.$message.error('权限不足！')
      }
    })
  },

  methods: {
    heartbeat() {
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
