<template>
  <div>

    <el-button size="mini" round @click="editMeta">编辑{{ data.key }}</el-button>
    <!-- <input type="number" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""> -->
  </div>

</template>

<script>
export default {
  props: ['data', 'readonly', 'emitter', 'ikey', 'getData', 'putData'],

  data() {
    return {
      value: 0
    }
  },
  mounted() {
    this.value = this.getData(this.ikey)
  },

  methods: {
    editMeta() {
      alert(1)
    },
    change(e) {
      this.value = +e.target.value
      this.update()
    },
    update() {
      if (this.ikey) { this.putData(this.ikey, this.value) }
      this.emitter.trigger('process')
    }
  }
}
</script>

<style>
</style>

