<template>
  <el-container class="home-container">

    <el-container>
      <el-aside width="260px">

        <el-menu
          v-if="menu !== null"
          :default-active="active"
          class="el-menu-vertical-demo"
        >

          <el-menu-item index="-1" @click="navigation()">
            <i class="el-icon-menu" />
            <span slot="title">导航</span>
          </el-menu-item>
          <div v-if="menu.items.length !== 0">
            <el-menu-item v-for="it in menu.items" :key="it.id" :index="'-1-'+it.id.toString()" @click="goto(it, -1)">
              <span slot="title">{{ it.title.rendered }}</span>
            </el-menu-item>
          </div>
          <el-submenu v-for="item in menu.children" :key="item.id" :index="item.id.toString()" :hidden="item.items.length ===0">
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <div v-if="item.items.length !== 0">

                <el-menu-item v-for="it in item.items" :key="it.id" :index="item.id.toString()+'-' + it.id.toString()" @click="goto(it, item.id)">{{ it.title.rendered }}</el-menu-item>

              </div>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main>
        <div v-if="article !==null">
          <el-card class="box-card">
            <span slot="header" class="mrpp-title">
              <b class="card-title" nowrap>{{ article.title }}</b>
            </span>
            <span v-html="article.content" />
          </el-card>
        </div>
        <div v-else-if="menu !== null">
          <div>
            <el-divider content-position="left"><big>{{ title }}</big></el-divider>
          </div>
          <el-row :gutter="10">
            <el-col
              v-for="it in menu.items"
              :key="it.id"
              :xs="24"
              :sm="12"
              :md="12"
              :lg="8"
              :xl="6"
            >
              <div style="cursor:pointer" @click="goto(it, -1)">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>{{ it.title.rendered }}</span>
                  </div>
                  <div class="text item" v-html=" it.excerpt.rendered" />
                </el-card>
                <br>
              </div>

            </el-col>
          </el-row>
          <br>
          <div v-for="item in menu.children" :key="item.id" :hidden="item.items.length ===0">
            <div>
              <el-divider content-position="left">{{ item.name }}</el-divider>
            </div>
            <el-row :gutter="10">
              <el-col
                v-for="it in item.items"
                :key="it.id"
                :xs="24"
                :sm="12"
                :md="12"
                :lg="8"
                :xl="6"
              >
                <div style="cursor:pointer" @click="goto(it, item.id)">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>{{ it.title.rendered }}</span>
                    </div>
                    <div class="text item" v-html=" it.excerpt.rendered" />
                  </el-card>
                  <br>
                </div>

              </el-col>
            </el-row>
            <br>
          </div>
        </div>

      </el-main>
    </el-container>

  </el-container>
</template>

<script>

import { Categories, Tree, Posts, Article } from '@/api/wordpress.js'

export default {
  name: 'MrPPDiscovery',
  props: {
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menu: null,
      article: null,
      active: '-1'
    }
  },
  watch: {
    '$route': function(to, from) {
      if (typeof this.$route.query.articleid !== 'undefined') {
        this.select(this.$route.query.articleid)
        this.active = this.$route.query.categories.toString() + '-' + this.$route.query.articleid.toString()
      } else {
        this.article = null
        this.active = '-1'
      }
    }
  },
  created() {
    const self = this

    self.readMenu(self.category).then(menu => {
      self.menu = menu
    })
  },
  methods: {
    navigation() {
      const self = this
      this.$router.push({ path: self.$route.path })
    },
    goto(item, categories) {
      const self = this
      this.$router.push({ path: self.$route.path, query: { articleid: item.id, categories }})
    },
    select(id) {
      const self = this
      Article(id).then(r => {
        self.article = {
          title: r.data.title.rendered,
          content: r.data.content.rendered
        }
      })
    },
    readMenu(category) {
      const self = this
      return new Promise((resolve, reject) => {
        Categories().then(r => {
          const menu = Tree(category, r.data)
          self.menu = menu
          const list = [menu]
          const todo = []

          while (list.length !== 0) {
            const item = list.pop()
            if (item.count > 0) {
              todo.push(item)
            }
            item.children.forEach(c => {
              list.push(c)
            })
          }
          if (todo.length === 0) {
            resolve(menu)
          } else {
            let count = 0
            todo.forEach(item => {
              Posts(item.id).then(r => {
                // item.items = r.data
                item.items = r.data.sort(function(a, b) {
                  if (!a.sort) {
                    a.sort = 0
                  }
                  if (!b.sort) {
                    b.sort = 0
                  }
                  return parseInt(a.sort) - parseInt(b.sort)
                })
                count++
                if (count === todo.length) {
                  resolve(menu)
                }
              })
            })
          }
        })
      })
    }

  }
}
</script>
<style>
  .el-header, .el-footer {
    text-align: center;
    line-height: 60px;
  }

  .el-aside {

    text-align: left;
    line-height: 200px;
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

  .el-divider {
    background-color: #b6d7fb;
    height: 2px;
  }
  .el-divider {
    background-color: #b6d7fb;
    height: 1px;
  }
</style>
