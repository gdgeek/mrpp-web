<template>
  <div id="CommuityIndex">
    <br>
    <el-container>

      <el-header>
        <mr-p-p-header :sorted="''" :searched="searched" @search="search" @sort="sort">
          <el-tag type="success">交流帖子</el-tag></mr-p-p-header>
      </el-header>
      <el-main><br>
        <el-card class="box-card">
          <mr-p-p-table ref="table" :items="items" />
          <br>
          <el-pagination
            layout="prev, pager, next"
            :total="50"
          />
        </el-card>
      </el-main>

    </el-container>
    <mr-p-p-editor ref="editor" @post="post" />
  </div>
</template>

<script>
import MrPPEditor from '@/components/MrPP/MrPPEditor.vue'
import MrPPTable from '@/components/MrPP/MrPPTable.vue'
import MrPPHeader from '@/components/MrPP/MrPPHeader/index.vue'

import { mapGetters } from 'vuex'
import { getMessages, postMessage } from '@/api/v1/message'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  name: 'CommuityIndex',
  components: {
    MrPPEditor,
    MrPPTable,
    MrPPHeader
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
              self.items.push({ title: item.title,
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
    sort: function(value) {
      this.sorted = value
      this.refresh()
    },
    search: function(value) {
      this.searched = value
      this.refresh()
    },
    post: function(data) {
      const self = this
      postMessage(data).then(response => {
        const date = new Date()
        self.items.unshift({
          title: response.data.title,
          body: response.data.body,
          updated_at: moment(date).format('YYYY-MM-DD HH:mm:ss'),
          author: {
            id: self.userData.id,
            username: self.userData.username,
            nickname: self.userData.nickname,
            email: self.userData.email
          }
        })
        self.$refs.editor.clear()
      })
    }
  }

}
</script>
