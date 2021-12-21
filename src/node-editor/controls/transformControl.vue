<template>
  <div>
    <el-form size="mini" :inline="true">
      <el-form-item class="tranform-item" label="位置">
        <input v-model.number="value.transform.position.x" step="0.01" :readonly="data.readonly" type="number" class="input-left" style="width:45px;display:inline;" placeholder="x" @input="change($event)">
        <input v-model.number="value.transform.position.y" step="0.01" :readonly="data.readonly" type="number" class="input-min" style="width:45px;display:inline;" placeholder="y" @input="change($event)">
        <input v-model.number="value.transform.position.z" step="0.01" :readonly="data.readonly" type="number" class="input-right" style="width:45px;display:inline;" placeholder="z" @input="change($event)">
      </el-form-item>
      <br>
      <el-form-item class="tranform-item" label="旋转">
        <input v-model.number="value.transform.rotate.x" step="0.01" :readonly="data.readonly" type="number" class="input-left" style="width:45px;display:inline;" placeholder="x" @input="change($event)">
        <input v-model.number="value.transform.rotate.y" step="0.01" :readonly="data.readonly" type="number" class="input-min" style="width:45px;display:inline;" placeholder="y" @input="change($event)">
        <input v-model.number="value.transform.rotate.z" step="0.01" :readonly="data.readonly" type="number" class="input-right" style="width:45px;display:inline;" placeholder="z" @input="change($event)">
      </el-form-item>

      <br>
      <el-form-item class="tranform-item" label="缩放">
        <input v-model.number="value.transform.scale.x" step="0.01" :readonly="data.readonly" type="number" class="input-left" style="width:45px;display:inline;" placeholder="x" @input="change($event)">
        <input v-model.number="value.transform.scale.y" step="0.01" :readonly="data.readonly" type="number" class="input-min" style="width:45px;display:inline;" placeholder="y" @input="change($event)">
        <input v-model.number="value.transform.scale.z" step="0.01" :readonly="data.readonly" type="number" class="input-right" style="width:45px;display:inline;" placeholder="z" @input="change($event)">
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
        transform: {
          position: { x: 0, y: 0, z: 0 },
          rotate: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 }
        }
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
    editor(id) {
      this.root.$router.push({ path: '/verse/meta/editor', query: { id }})
    // alert(this.root)
    },
    change(e) {
      //  this.value = e.target.value
      console.log(this.value)
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
  .input-left{
      border:solid 1px bule;
      border-top-left-radius:3px;
      border-top-right-radius:0px;
      border-bottom-right-radius:0px;
      border-bottom-left-radius:3px;
      color: #666;
      font-size: 12px;
      padding:0px;
      text-align:center;
  }
  .input-right{
      border:solid 1px bule;
      border-top-left-radius:0px;
      border-top-right-radius:3px;
      border-bottom-right-radius:3px;
      border-bottom-left-radius:0px;
      color: #666;
      font-size: 12px;
      padding:0px;
      text-align:center;

  }
  .input-min{
      border:solid 1px bule;
      border-top-left-radius:0px;
      border-top-right-radius:0px;
      border-bottom-right-radius:0px;
      border-bottom-left-radius:0px;
      color: #666;
      font-size: 12px;
      padding:0px;
      text-align:center;
  }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
.tranform-item{
   max-height:0px;
   max-height:20px;
}
</style>
