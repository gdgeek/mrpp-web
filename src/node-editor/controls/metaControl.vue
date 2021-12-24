<template>
  <div>
    <el-form ref="value" :model="value" size="mini" label-width="40px">
      <el-form-item class="el-form-item" label="名称">
        <el-tag size="small" type="success" @click="changeMateName(value.id)"> {{ value.name }}</el-tag>
      </el-form-item>

      <el-form-item class="el-form-item" hidden label="id">
        <el-input v-model.number="value.id" />
      </el-form-item>

      <el-form-item class="el-form-item" label="操作">
        <el-button :disabled="value.id === -1" @click="editor(value.id)"> 进入编辑</el-button>
      </el-form-item>

    </el-form>
  </div>

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
  mounted() {
    const value = this.getData(this.data.key)
    if (typeof value !== 'undefined') {
      this.value = value
    } else if (typeof this.data.default !== 'undefined') {
      this.value = this.data.default
    }
    this.refresh()
  },

  methods: {
    changeMateName(id) {
      const self = this
      this.$prompt('请输入新的名称', '修改【元】名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: self.value.name
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        putMeta(id, { name: value }).then(() => {
          // this.root.$store.commit('setMetaName', value)
          self.value.name = value
          this.$message({
            type: 'success',
            message: '新的名称是: ' + value
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    editor(id) {
      this.root.$router.push({ path: '/verse/meta/editor', query: { id }})
    },

    refresh() {
      if (this.data) { this.putData(this.data.key, this.value) }
      this.emitter.trigger('process')
    }
  }
}
</script>

<style>
.el-form-item{
    margin-top:-10px;
}
</style>

