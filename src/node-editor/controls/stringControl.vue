<template>
  <el-form :inline="true" size="mini">
    <el-form-item class="el-form-item" :inline="true" :label="data.title">
      <el-input v-model="value" :readonly="readonly" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],

  data() {
    return {
      value_: ''
    }
  },
  computed: {
    readonly() {
      if (typeof this.value.readonly !== 'undefined') {
        return this.value.readonly
      }
      return this.data.readonly
    },
    value: {
      get() {
        return this.value_
      },
      set(value) {
        this.value_ = value
        this.refresh()
      }
    }

  },
  mounted() {
    const value = this.getData(this.data.key)
    if (typeof value !== 'undefined') {
      this.value = value
    }
  },
  methods: {
    refresh() {
      if (this.data) { this.putData(this.data.key, this.value) }
      this.emitter.trigger('process')
    }
  }
}
</script>

