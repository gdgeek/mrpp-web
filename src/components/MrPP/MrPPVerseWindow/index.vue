<template>

  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="70%"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">

      <el-form-item label="封面图片">
        <mr-p-p-cropper ref="image" :image-url="'imageUrl'" :file-name="'verse.picture'" @saveFile="saveFile" />
      </el-form-item>
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="内容说明">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <!-- 载入截图组件 -->
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">{{ dialogSubmit }}</el-button>
    </span>

  </el-dialog>
</template>

<script>
import MrPPCropper from '@/components/MrPP/MrPPCropper.vue'

export default {
  name: 'MrPPVerseWindow',

  components: {
    MrPPCropper
  },
  props: {
    dialogTitle: {
      type: String,
      default: '选择文件'
    },
    dialogSubmit: {
      type: String,
      default: '确定'
    }
  },
  data: function() {
    return {
      dialogVisible: false,
      imageUrl: null,
      form: {
        name: '',
        desc: ''
      },
      imageId: null,
      item: null,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    const self = this
    this.$nextTick(function() {
      this.$on('show', self.show)
      this.$on('hide', self.hide)
    })
  },
  methods: {
    submitForm(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit', self.form, self.item, self.imageId)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    show(item = null) {
      const self = this
      this.item = item
      if (this.item) {
        setTimeout(() => {
          self.$refs['image'].setImageUrl(this.item.image.url)
        }, 0)
        // alert(this.item.image.url)
        this.form.name = this.item.name
        const info = JSON.parse(this.item.info)
        if (info !== null) {
          this.form.desc = info.description
        }
      }
      this.dialogVisible = true
    },
    hide() {
      this.dialogVisible = false
    },
    saveFile(imageId) {
      this.imageId = imageId
    }
  }
}
</script>

<style scoped>

</style>
