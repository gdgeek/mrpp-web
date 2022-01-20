<template>
  <div id="CommuityIndex">
    <br>
    <el-container>

      <el-header>
        <mr-p-p-header :sorted="''" :searched="searched" @search="search">
          <el-tag type="success">交流帖子</el-tag></mr-p-p-header>
      </el-header>
      <el-main><br>
        <el-card class="box-card">
          <mr-p-p-table ref="table" :items="items" @remove="deletedWindow" />
          <br>
          <el-pagination
            :current-page="pagination.current"
            :page-count="pagination.count"
            :page-size="pagination.size"
            :total="pagination.total"
            layout="prev, pager, next, jumper"
            background
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-main>

    </el-container>
    <el-card class="box-card">
      <el-divider content-position="left">发帖</el-divider>

      <mr-p-p-message-from ref="editor" @post="post" />

      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </el-card>
  </div>
</template>

<script>
import MrPPTable from '@/components/MrPP/MrPPTable.vue'
import MrPPHeader from '@/components/MrPP/MrPPHeader/index.vue'

import { mapGetters } from 'vuex'
import { getMessages, postMessage, deleteMessage } from '@/api/v1/message'

import MrPPMessageFrom from '@/components/MrPP/MrPPMessageFrom.vue'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  name: 'CommuityIndex',
  components: {
    MrPPTable,
    MrPPHeader,
    MrPPMessageFrom
  },

  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  data() {
    return {
      items: null,
      searched: '',
      pagination: { current: 1, count: 1, size: 20, total: 20 }
    }
  },

  created() {
    const self = this
    self.refresh()
  },
  methods: {
    refresh() {
      const self = this
      this.items = null
      getMessages(self.sorted, self.searched, self.pagination.current)
        .then((response) => {
          console.log(response.headers)
          self.pagination = {
            current: parseInt(response.headers['x-pagination-current-page']),
            count: parseInt(response.headers['x-pagination-page-count']),
            size: parseInt(response.headers['x-pagination-per-page']),
            total: parseInt(response.headers['x-pagination-total-count'])
          }

          if (response.data) {
            self.items = []
            response.data.forEach(item => {
              self.items.push({
                id: item.id,
                title: item.title,
                body: item.body,
                updated_at: item.updated_at,
                author: {
                  id: item.author.id,
                  username: item.author.username,
                  nickname: item.author.nickname,
                  email: item.author.email
                }// item.author
              })
            })
          }
        }).catch(function(error) {
          console.log(error)
        })
    },
    handleCurrentChange: function(page) {
      this.pagination.current = page
      this.refresh()
      console.log(this.pagination.current)
    },
    search: function(value) {
      this.searched = value
      this.refresh()
    },
    post: function(data) {
      const self = this
      postMessage(data).then(response => {
        self.items.unshift({
          id: response.data.id,
          title: response.data.title,
          body: response.data.body,
          updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          author: {
            id: self.userData.id,
            username: self.userData.username,
            nickname: self.userData.nickname,
            email: self.userData.email
          }
        })
        self.$refs.editor.clear()
      })
    },
    deletedWindow: function(item) {
      const self = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        self.deleted(item.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleted: function(id) {
      const self = this

      deleteMessage(id).then((response) => {
        self.refresh()
      }).catch(function(error) {
        console.log(error)
      })
    }
  }

}
</script>
