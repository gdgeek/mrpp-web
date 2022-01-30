<template>

  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="70%"
  >

    <el-card class="box-card" style="text-align:center">
      <qrcode-vue :value="value" :size="size" level="H" />

    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
    </span>

  </el-dialog>
</template>
<script>

import QrcodeVue from 'qrcode.vue'
export default {
  name: 'MrPPQRCodeVerse',
  components: {
    QrcodeVue
  },
  data() {
    return {
      dialogTitle: '请用设备扫描二维码，进入场景。',
      dialogVisible: false,
      value: 'https://mrpp.com',
      size: 300
    }
  },

  mounted() {
    const self = this
    this.$nextTick(function() {
      this.$on('open', self.open)
    })
  },
  methods: {
    open(id) {
      const self = this
      const data = { projectId: id, 'veri': 'MrPP.com' }
      self.value = JSON.stringify(data)
      self.dialogVisible = true
    }
  }
}
</script>

