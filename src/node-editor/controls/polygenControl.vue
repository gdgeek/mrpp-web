<template>
  <el-form ref="value" size="mini" label-width="40px">
    <el-form-item class="el-form-item" label="模型">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ['data', 'root', 'emitter', 'getData', 'putData'],

  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted() {
    const value = this.getData(this.data.key)
    if (typeof value !== 'undefined') {
      this.value = value
    }
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

