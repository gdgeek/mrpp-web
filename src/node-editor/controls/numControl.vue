<template>
  <input type="number" :readonly="data.readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop="">
</template>

<script>
export default {
  props: ['data', 'emitter', 'root', 'getData', 'putData'],

  data() {
    return {
      value: 0
    }
  },
  mounted() {
    this.value = this.getData(this.data.key)
  },

  methods: {
    change(e) {
      this.value = +e.target.value
      this.update()
    },
    update() {
      if (this.data) { this.putData(this.data.key, this.value) }
      this.emitter.trigger('process')
    }
  }
}
</script>

<style>
</style>

