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
          <mr-p-p-table :items="items" />
          <br>
          <el-pagination
            layout="prev, pager, next"
            :total="50"
          />
        </el-card>
      </el-main>

    </el-container>
    <mr-p-p-editor @post="post" />
  </div>
</template>

<script>
import MrPPEditor from '@/components/MrPP/MrPPEditor.vue'
import MrPPTable from '@/components/MrPP/MrPPTable.vue'
import MrPPHeader from '@/components/MrPP/MrPPHeader/index.vue'

import { getMessages, postMessage } from '@/api/v1/message'
export default {
  name: 'CommuityIndex',
  components: {
    MrPPEditor,
    MrPPTable,
    MrPPHeader
  },
  data() {
    return {
      items: null,
      sorted: '-created_at',
      searched: '',
      pagination: { current: 1, count: 1, size: 20, total: 20 }
    }
  },
  methods: {
    succeed(items) {
      alert(items)
      this.items = items
    },
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
            self.succeed(response.data)
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
      /* postMessage(data).then(r => {
        const items = this.items
        this.items = null
        items.unshift(data)
        this.items = items
      })*/
    }
  }

}
</script>
