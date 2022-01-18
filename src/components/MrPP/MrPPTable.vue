<template>
  <div>
    <el-divider content-position="left">帖子</el-divider>
    <el-table
      v-if="items != null"
      :data="items"
      style="width: 100%"
      @row-click="select"
    >
      <el-table-column
        prop="title"
        label="标题"
      />

      <el-table-column
        prop="title"
        label="朋克"
        width="180"
      />

      <el-table-column
        prop="updated_at"
        label="发布时间"
        width="180"
      />
      <el-table-column
        prop="body"
        label="发布时间"
        width="180"
      />
    </el-table>
  </div>
</template>

<script>
import { getMessages } from '@/api/v1/message'
export default {
  name: 'CommuityIndex',

  data() {
    return {
      items: null
    }
  },
  computed: {
    html() {
      return this.filterHtml('<b>sadfsdf</b>')
    }
  },
  created() {
    const self = this
    getMessages().then(r => {
      console.error(r.data)
      self.items = r.data
    })
  },
  methods: {
    select(item) {
      alert(JSON.stringify(item))
    },
    filterHtml(html) {
      return html.replace(/<[^>]*>/g, '')
    }
  }
}
</script>

