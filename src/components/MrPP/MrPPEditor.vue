<template>
  <el-card class="box-card">
    <el-divider content-position="left">发帖</el-divider>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="内容" prop="body">
        <froala id="edit" v-model="form.body" :tag="'textarea'" :config="config" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </el-card>
</template>

<script>
// import { postMessage } from '@/api/v1/message'
export default {
  data() {
  //  console.log(postMessage)
    return {

      config: {
        attribution: false,
        language: 'zh_cn',
        //  toolbarButtons: [['bold',''], ['undo', 'redo', 'bold'], ['alert', 'clear', 'insert']],
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
