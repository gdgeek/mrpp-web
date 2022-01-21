<template>
  <el-container class="home-container">
    <el-container>
      <el-aside id="discovery-el-aside" width="200px">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            v-if="menu !== null"
            :default-active="active"
            class="el-menu-vertical-demo"
            background-color="#f4f5f7"
          >
            <el-menu-item index="-1" @click="navigation()">
              <i class="el-icon-menu" />
              <span slot="title" style="font-weight: 700;">导航</span>
            </el-menu-item>
            <div v-if="menu.items.length !== 0">
              <el-menu-item
                v-for="it in menu.items"
                :key="it.id"
                :index="'-1-' + it.id.toString()"
                @click="goto(it, -1)"
              >
                <span slot="title">{{ it.title.rendered | ellipsis }}</span>
              </el-menu-item>
            </div>

            <div
              v-for="item in menu.children"
              :key="item.id"
              :hidden="item.items.length === 0"
            >
              <el-submenu
                v-if="item.items.length < subTitleLength"
                class="mrpp-el-submenu"
                :index="item.id.toString()"
              >
                <template slot="title" class="mrpp-el-submenu-title">
                  {{ item.name }}
                </template>
                <el-menu-item-group>
                  <div v-if="item.items.length !== 0">
                    <el-menu-item
                      v-for="it in item.items"
                      :key="it.id"
                      :index="item.id.toString() + '-' + it.id.toString()"
                      @click="goto(it, item.id)"
                    >
                      {{ it.title.rendered | ellipsis }}
                    </el-menu-item>
                  </div>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item
                v-else
                :index="item.id.toString()"
                @click="gotoCategories(item.id)"
              >
                <template slot="title" class="mrpp-el-submenu-title">
                  <i class="el-icon-menu" /> {{ item.name }}
                </template>
              </el-menu-item>
            </div>

          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main id="discovery-el-main">

        <div v-if="article !== null">
          <el-card class="box-card">
            <span slot="header" class="mrpp-title">
              <b class="card-title" nowrap>{{ article.title }}</b>
            </span>
            <span v-html="article.content" />
          </el-card>
        </div>
        <div v-else-if="menu !== null ">
          <div v-if="active === '-1'">
            <div>
              <el-divider content-position="left">
                <big style="font-weight: 700;color: #3ea1d7;">{{ title }}</big>
              </el-divider>
            </div>
            <el-row :gutter="10">
              <waterfall :options="{}">
                <waterfall-item
                  v-for="it in menu.items"
                  :key="it.id"
                >
                  <el-col style="width:280px">
                    <div style="cursor: pointer" @click="goto(it, -1)">
                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <span>{{ it.title.rendered }}</span>
                        </div>
                        <div style="overflow: hidden" v-html="it.excerpt.rendered" />
                      </el-card>
                      <br>
                    </div>
                  </el-col>
                </waterfall-item>
              </waterfall>
            </el-row>
            <br>
          </div>
          <div
            v-for="item in menu.children"
            :key="item.id"
            :hidden="item.items.length === 0"
          >
            <div v-if="active === '-1' || active == item.id.toString()">
              <div>
                <el-divider content-position="left">
                  <span style="color:#1d7296">{{ item.name }}</span>
                </el-divider>
              </div>
              <el-row :gutter="10">

                <waterfall :options="{}">
                  <waterfall-item
                    v-for="it in item.items"
                    :key="it.id"
                  >
                    <el-col style="width:280px">
                      <div style="cursor: pointer" @click="goto(it, item.id)">
                        <el-card class="box-card">
                          <div slot="header" class="clearfix">
                            <span>{{ it.title.rendered }}</span>
                          </div>
                          <div style="overflow: hidden" v-html="it.excerpt.rendered" />
                        </el-card>
                        <br>
                      </div>
                    </el-col>
                  </waterfall-item>
                </waterfall>
              </el-row>
              <br>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Categories, Tree, Posts, Article } from '@/api/wordpress.js'
import { Waterfall, WaterfallItem } from 'vue2-waterfall'
export default {
  name: 'MrPPDiscovery',
  components: {
    Waterfall,
    WaterfallItem
  },
  // Control overflow hidden titles
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 9) {
        return value.slice(0, 9) + '...'
      }
      return value
    }
  },
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
      active: '-1',
      subTitleLength: 4
    }
  },
  watch: {
    $route: function(to, from) {
      if (typeof this.$route.query.articleid !== 'undefined') {
        this.select(this.$route.query.articleid)
        this.active =
          this.$route.query.categories.toString() +
          '-' +
          this.$route.query.articleid.toString()
      } else if (typeof this.$route.query.categories !== 'undefined') {
        this.article = null
        this.active = this.$route.query.categories.toString()
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
    gotoCategories(categories) {
      const self = this
      this.$router.push({
        path: self.$route.path,
        query: { categories }
      })
    },
    goto(item, categories) {
      const self = this
      this.$router.push({
        path: self.$route.path,
        query: { articleid: item.id, categories }
      })
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

<style lang="scss">
#discovery-el-aside {
  position: fixed;
  z-index: 10;
  top: 52px;
  bottom: 0;
  overflow-x: hidden !important;
  overflow-y: auto;
  box-sizing: border-box;
  // background-color: #ddf0e9;
  background-color: #f4f5f7;

}
#discovery-el-main {
  min-height: calc(100vh - 50px);
  margin: 0 5px 0 205px;
}
</style>
