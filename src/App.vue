<template>
  <el-container>
    <el-header><mr-header>1</mr-header></el-header>
    <el-container>
      <el-aside width="200px"><mr-aside>1</mr-aside></el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>

</template>

<script>
// import Guest from 'Guest.vue'
import store from './store'
import { mapState, mapMutations, mapActions } from 'vuex'
import MrHeader from './MrHeader.vue'
import MrAside from './MrAside.vue'
import Vue from 'vue'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  items: [],
  computed: {
    ...mapState({
      // access_token: state => state.api.access_token,
      // api: state => state.api.url
    }),
    adminlet () {
      if (this.$route.path === '/') {
        return false
      }
      if (this.$route.path.substring(0, 5).toLowerCase() === '/site') {
        return false
      }
      return true
    }
  },
  created () {
    const self = this
    setInterval(function () {
      self.heartbeat()
    }, 2000000 + Math.floor(Math.random() * 300000))
    if (this.access_token === null) {
      const token = this.getTokenFromCookie()
      if (token === null) {
        this.logout()
      } else {
        this.setupAccessToken(token)
      }
    }
  },
  watch: {
    '$store.state.api.access_token': function () {
      this.setTokenToCookie(this.access_token)
      if (this.access_token === null) {
        return
      }
      const self = this
      self.loadUser({
        failed: function (msg) {
          self.logout()
        },
        succeed: function (data) {
          self.saveUser(data)
          self.loadMenu({
            failed: function (msg) {
              self.logout()
            },
            succeed: function (data) {
              self.saveMenu(data)
            }
          })
        }
      })
    }
  },
  methods: {
    ...mapMutations([
      'saveUser',
      'saveMenu',
      'setupAccessToken'
    ]),
    ...mapActions([
      'loadUser',
      'loadMenu'
    ]),
    heartbeat () {
      const self = this
      console.log('hb')
      if (self.access_token !== null) {
        Vue.axios.get(this.api + '/servers/token')
          .then((response) => {
            console.log(response.data)
            self.setupAccessToken(response.data)
          }).catch(err => {
            console.log(err)
          })
      }
    },
    getTokenFromCookie (token) {
      if (this.$cookies.isKey('token')) {
        let token = this.$cookies.get('token')
        if (token === 'null') {
          token = null
        }
        return token
      }
      return null
    },
    setTokenToCookie (token) {
      const cookie = this.$cookies.get('token')
      if (cookie !== token) {
        this.$cookies.set('token', token)
      }
    },
    logout () {
      this.setupAccessToken(null)
      if (this.adminlet) {
        this.$router.push({ path: '/' })
      }
    }
  },
  components: {
    'mr-header': MrHeader,
    'mr-aside': MrAside
    // 'mr-guest': Guest
  },
  store
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
