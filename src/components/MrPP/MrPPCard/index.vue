<template>
  <div>
    <el-card v-if="item.info === null" class="box-card">

      <div slot="header">
        <el-card shadow="hover" :body-style="{padding: '20px' }">
          <span slot="header" class="mrpp-title"><b>{{ item.name }}</b></span>

          <img
            src="@/assets/image/none.png"
            width="100%"
            alt="none"
          >
        </el-card>
      </div>

      <div class="clearfix">
        <router-link :to="'/polygen/view?id='+item.id">
          <el-button type="warning" size="mini">初始化模型数据</el-button>
        </router-link>
        <el-button-group style="float: right;" :inline="true">
          <el-button type="plain" size="mini" icon="el-icon-delete" @click="deleted()" />
          <el-button type="plain" size="mini" icon="el-icon-edit" @click="named()" />&nbsp;
        </el-button-group>
      </div>
      <div class="bottom clearfix" />
    </el-card>
    <el-card v-else class="box-card">

      <div slot="header">
        <el-card shadow="hover" :body-style="{padding: '0px' }">
          <span slot="header" class="mrpp-title"><b>{{ item.name }}</b></span>

          <el-image
            :src="item.image.url"
            fit="contcoverain"
          />
        </el-card>
      </div>

      <div class="clearfix">
        <router-link :to="'/polygen/view?id='+item.id">
          <el-button type="primary" size="mini">查看模型</el-button>
        </router-link>
        <el-button-group style="float: right;" :inline="true">
          <el-button type="plain" size="mini" icon="el-icon-delete" @click="deleted()" />
          <el-button type="plain" size="mini" icon="el-icon-edit" @click="named()" />&nbsp;
        </el-button-group>
      </div>
      <div class="bottom clearfix" />
    </el-card>

  </div>
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
  },
  methods: {

    named() {
      const self = this
      this.$emit('named', self.item)
    },
    deleted() {
      const self = this
      this.$emit('deleted', self.item)
    }
  }
}
</script>

<style scoped>
.mrpp-title {
  font-size: 15px;
  padding: 0px 0px 0px 0px;
  color: #666;
}
</style>
