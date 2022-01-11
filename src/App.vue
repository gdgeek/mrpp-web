<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import { AbilityBuilder, Ability } from '@casl/ability'
import { getToken, setToken } from '@/utils/auth'
import { token } from '@/api/servers'
export default {
  name: 'App',

  watch: {
    '$store.state.user.roles': function() {
      this.updateAbility(this.$store.state.user.roles)
    }
  },
  created() {
    const self = this
    setInterval(function() {
      self.heartbeat()
    }, 360000)

    this.$router.beforeEach((to, from, next) => {
      if (self.$can('router', to.path)) {
        next()
      } else {
        this.$message.error('权限不足！')
      }
    })
  },

  methods: {

    updateAbility(roles) {
      if (roles === null) {
        roles = []
      }

      // alert(2)
      const { can, rules } = new AbilityBuilder(Ability)
      can('router', [
        '/site',
        '/site/logout',
        '/site/index',
        '/site/wechat-signup',
        '/site/binded-email',
        '/404'
      ])

      if (roles.find(role => role === 'user')) {
        can(['menu', 'router'], [
          '/site/logout',
          '/resource',
          '/polygen',
          '/polygen/index',
          '/polygen/upload',
          '/polygen/view',
          '/picture',
          '/picture/index',
          '/picture/upload',
          '/picture/view',
          '/video',
          '/video/index',
          '/video/upload',
          '/video/view',
          '/document',
          '/document/index',
          '/home',
          '/home/index',
          '/community',
          '/community/index',
          '/verse',
          '/verse/index'
        ])

        can('router', [
          '/verse/editor',
          '/verse/meta/editor',
          '/verse/code'
        ])
      }

      if (roles.find(role => role === 'developer')) {
        console.log('developer')
      }

      if (roles.find(role => role === 'root')) {
        console.log('root')
      }

      if (roles.find(role => role === 'admin')) {
        console.log('admin')
      }
      if (roles.find(role => role === 'manager')) {
        console.log('manager')
      }
      this.$ability.update(rules)
    },
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
