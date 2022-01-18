<template>
  <div>
    <el-divider content-position="left">帖子</el-divider>
    <el-table
      v-if="items != null"
      :data="items"
      style="width: 100%"
      @row-click="select"
    >
      <el-table-column prop="title" label="标题" />

      <el-table-column prop="author.nickname" label="朋克" width="180" />

      <el-table-column prop="updated_at" label="发布时间" width="180" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CommuityIndex',
  props: {
    items: {
      type: Array
    }
  },
  computed: {
    html() {
      return this.filterHtml('<b>sadfsdf</b>')
    }
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
