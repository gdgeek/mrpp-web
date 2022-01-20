<template>
  <div>

    <el-divider content-position="left">帖子</el-divider>

    <el-row
      class="mrpp-header"
      :gutter="10"
    >
      <el-col :span="12">
        <div class="grid-content"><b>标题</b></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"><b>用户</b></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"><b>发布时间</b></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"><b>操作</b></div>
      </el-col>
    </el-row>
    <div v-if="items === null ">
      <br>
      <el-skeleton :rows="10" animated />
    </div>
    <div v-for="item in items" :key="item.id">
      <el-row class="mrpp-row" :gutter="10">
        <el-col :span="12">
          <el-popover
            placement="top-start"
            :title="item.title"
            :open-delay="500"
            width="400"
            trigger="hover"
            :content="html(item.body)"
          >
            <div slot="reference" class="grid-content">
              <el-link :underline="false" type="primary" @click="gotoPost(item)">{{ item.title }}</el-link></div>
          </el-popover>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">{{ item.author.nickname }}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">{{ item.updated_at }}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button v-if="item.author.id === userData.id" size="mini" icon="el-icon-delete" circle @click="remove(item)" /></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'CommuityIndex',
  props: {
    items: {
      type: Array
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])

  },
  methods: {
    cutString(str, len) {
      // length属性读出来的汉字长度为1
      if (str.length * 2 <= len) {
        return str
      }
      var strlen = 0
      var s = ''
      for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i)
        if (str.charCodeAt(i) > 128) {
          strlen = strlen + 2
          if (strlen >= len) {
            return s.substring(0, s.length - 1) + '...'
          }
        } else {
          strlen = strlen + 1
          if (strlen >= len) {
            return s.substring(0, s.length - 2) + '...'
          }
        }
      }
      return s
    },
    remove(item) {
      this.$emit('remove', item)
    },
    gotoPost(item) {
      const self = this
      self.$router.push({ path: '/community/post', query: { id: item.id }})
    },
    filterHtml(html) {
      return html.replace(/<[^>]*>/g, '')
    },
    html(body) {
      return this.cutString(this.filterHtml(body), 100)
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 0px;
}
.mrpp-header {
  border-radius: 0px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgrey;
  background-color:gainsboro;
}
.mrpp-row {
  border-radius: 0px;
  border-style: solid;
  border-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: lightgrey;
}
.grid-content {
  border-radius: 2px;
  height: 50px;
  display: table-cell;
  vertical-align: middle;
  font-size: 14px;
  color: dimgrey;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>
