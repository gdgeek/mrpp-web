<template>
  <div v-if="!item.hidden">
    <div v-if="!item.items">

      <app-link :to="item.url[0]" v-if="this.$route.path !== item.url[0]"  :align="align">
        <el-menu-item index="item.url[0]"><font-awesome-icon :icon="item.icon"></font-awesome-icon>  <span v-if="!collapse">{{item.label}}</span></el-menu-item>
      </app-link>
      <div v-else :align="align">
        <el-menu-item disabled index="item.url[0]"><font-awesome-icon :icon="item.icon"></font-awesome-icon>  <span v-if="!collapse">{{item.label}}</span></el-menu-item>
      </div>
    </div>
    <div v-else>
       <el-submenu ref="subMenu" :index="item.url[0]" popper-append-to-body>
        <template slot="title" >
          <div :align="align" >
          <font-awesome-icon :icon="item.icon"></font-awesome-icon> <span v-if="!collapse">{{item.label}}</span>
          </div>
         
        </template>
       
        <sidebar-item
        v-for="child in item.items"
        :key="child.url[0]"
        :is-nest="true"
        :item="child"
        :base-path="child.url[0]"
        class="nest-menu"
        />
    </el-submenu>
       
    </div>
  
    

    <el-submenu v-if="false" ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    collapse: {
      type: Boolean,
      required: true
    },
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    align() {
      return this.collapse? 'center': 'left'
    }
  },
  created() {
    console.log(this.$route.path)
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
