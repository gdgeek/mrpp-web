<template>
  <div>
    <h2 class="mrpp-title">注册新用户</h2>
    <div class="signup-head">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        class="signup-form"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" suffix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            autocomplete="off"
            suffix-icon="el-icon-lock"
            type="password"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            v-model="form.checkPassword"
            type="password"
            autocomplete="off"
            suffix-icon="el-icon-view"
          />
        </el-form-item>

        <el-form-item>
          <el-button-group class="signup-button">
            <el-button
              style="width: 120px"
              type="primary"
              @click="submit('form')"
            >
              注册
            </el-button>
          </el-button-group>
        </el-form-item>
      </el-form>

    </div>
  </div></template>

<script>
// @ is an alias to /src
import { signup } from '@/api/sites'
export default {
  name: 'MrPPSignup',

  components: {
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword')
        }
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: null,
        password: null,
        checkPassword: null
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 5, message: '用户名称长度应该大于5', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度应该大于6', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请输入校验密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open() {
      this.isShow = !this.isShow
    },
    submit(formName) {
      const self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          signup(self.form)
            .then(data => {
              self.flashSetup({
                title: '注册成功',
                description: '感谢您的注册。请检查您的收件箱中的验证邮件。'
              })
              self.$router.push({ path: '/site' })
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    error(msg) {
      this.title = ''
      if (typeof msg === 'string') {
        this.title = msg
      } else {
        let i = 0
        for (const item in msg) {
          ++i
          this.title += i + '.' + item + ' : ' + msg[item] + '\n'
        }
      }
      this.isShow = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
