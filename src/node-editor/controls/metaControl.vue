<template>
  <div>
    <el-form ref="value" :model="value" size="mini" label-width="40px">
      <el-form-item class="el-form-item" label="名称">
        <el-input v-model="value.name" :readonly="data.readonly" />
      </el-form-item>
      <el-form-item class="el-form-item" hidden label="id">
        <el-input v-model.number="value.id" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="value.id === -1" @click="editor(value.id)">编辑</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
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

