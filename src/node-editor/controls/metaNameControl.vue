<template>
  <el-form :inline="true" size="mini">
    <el-form-item class="el-form-item" :inline="true" :label="data.title">

      <el-tag type="success" size="small" @click="changeMetaName()"> {{ value.name }}</el-tag>
    </el-form-item>
  </el-form>
</template>

<script>

import { putMeta } from '@/api/v1/meta'
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],
  data() {
    return {
      value: {
        name: '名称',
        id: -1
      }
    }
  },
  computed: {

    metaName: {
      get() {
        return this.root.$store.state.meta.data.name
      },
      set(value) {
        this.root.$store.commit('setMetaName', value)
        this.refresh()
      }
    }
  },
  mounted() {
    // const value = this.getData(this.data.key)
    /* if (typeof value !== 'undefined') {
      this.value = value
    } else if (typeof this.data.default !== 'undefined') {
      this.value = this.data.default
    }*/
    this.value.name = this.root.$store.state.meta.data.name
    this.value.id = this.root.$store.state.meta.data.id
    this.refresh()
  },

  methods: {
    changeMetaName() {
      const id = this.root.$store.state.meta.data.id
      const self = this
      this.$prompt('请输入新的名称', '修改【元】名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: self.value.name
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        putMeta(id, { name: value }).then(() => {
          this.root.$store.commit('meta/setMetaName', value)
          self.value.name = value
          //  this.root.$store.state.meta.data.name = value
          this.$message({
            type: 'success',
            message: '新的名称是: ' + value
          })
          this.refresh()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    refresh() {
      if (this.data) {
        this.putData(this.data.key, this.value)
      }
      this.emitter.trigger('process', { status: 'node' })
    }
  }
}
</script>

