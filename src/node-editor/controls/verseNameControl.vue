<template>
  <el-form :inline="true" size="mini">
    <el-form-item class="el-form-item" :inline="true" label="名称">
      <el-tag size="small" @click="changeVerseName()"> {{ value.name }}</el-tag>
    </el-form-item>
  </el-form>
</template>

<script>

import { putVerse } from '@/api/v1/verse'
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

    verseName: {
      get() {
        return this.root.$store.state.verse.data.name
      },
      set(value) {
        this.root.$store.commit('verse/setVerseName', value)
        this.refresh()
      }
    }
  },
  mounted() {
    this.value.name = this.root.$store.state.verse.data.name
    this.value.id = this.root.$store.state.verse.data.id
    this.refresh()
  },

  methods: {
    changeVerseName() {
      const id = this.root.$store.state.verse.data.id
      const self = this
      this.$prompt('请输入新的名称', '修改【宇宙】名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: self.value.name
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        putVerse(id, { name: value }).then(() => {
          // this.root.$store.commit('setMetaName', value)
          self.value.name = value
          this.root.$store.commit('verse/setVerseName', value)
          // this.root.$store.state.verse.data.name = value
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

