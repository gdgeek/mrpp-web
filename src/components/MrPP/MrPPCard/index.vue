<template>
  <div><el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>模型名称：<b>{{ item.name }}</b></span>

      <el-button-group style="float: right;" :inline="true">
        <el-button type="plain" size="mini" icon="el-icon-delete" />
        <el-button type="plain" size="mini" icon="el-icon-edit" />&nbsp;
      </el-button-group>
    </div>

    <span>{{ item.description }}</span>

    <hr>
    <div class="bottom clearfix">

      <router-link :to="'/polygen/view?id='+item.id">
        <el-button type="warning" size="mini">初始模型数据</el-button>
      </router-link>
    </div>
  </el-card></div>
</template>

<script>
export default {
  name: 'MrPPCard',
  props: {
    item: {
      type: Object,
      required: null
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>
