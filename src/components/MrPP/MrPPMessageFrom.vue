<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>

    <el-form-item label="内容" prop="body">
      <editor
        id="edit"
        v-model="form.body"
        api-key="nmpheyzdn3q78nliem5jlyz3w1qktvzd3can1siffivt3twq"
        :init="{
          height: 300,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
        }"
      /></el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
// import Doing2 from '@/views/document/workdata/doing/doing2'
export default {
  name: 'MrPPMessageFrom',
  components: {
    'editor': Editor
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      config: {
        attribution: false,
        language: 'zh_cn',
        events: {
          initialized: function() {
            console.log('initialized')
          }
        }
      },
      form: {
        title: '',
        body: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        body: [
          { required: true, message: '请填写内容', trigger: 'blur' },
          { min: 10, message: '长度至少10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.data !== null) {
      this.form.title = this.data.title
      this.form.body = this.data.body
    }
  },
  methods: {
    submitForm(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('post', self.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    clear() {
      this.resetForm('form')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
