<template>
  <el-form :inline="true" size="mini">
    <el-form-item class="el-form-item" :inline="true" :label="data.title">
      <el-input v-model="metaName" :readonly="true" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],

  computed: {

    metaName: {
      get() {
        return this.root.$store.state.meta.name
      },
      set(value) {
        this.root.$store.commit('putMetaName', value)
        this.refresh()
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
    refresh() {
      if (this.data) {
        this.putData(this.data.key, this.value)
      }
      this.emitter.trigger('process')
    }
  }
}
</script>

