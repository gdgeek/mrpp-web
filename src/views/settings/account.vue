<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账号设置</h3>
        <small>账号具体内容的配置和修改</small>
      </div>
      <el-row :gutter="24">

        <el-col :xs="16" :sm="16" :md="12" :lg="10" :xl="10">

          <el-form ref="emailForm" :model="emailForm" label-width="100px">

            <el-form-item
              label="邮箱"
              prop="email"
              :rules="[
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]"
            >
              <el-input
                v-model="emailForm.email"
                autocomplete="off"
                type="email"
                placeholder="绑定邮箱"
              ><el-button
                slot="append"
                @click="postEmail"
              >绑定</el-button></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="24">
        <el-col :xs="16" :sm="16" :md="10" :lg="6" :xl="6">
          <el-form label-width="100px">
            <el-form-item label="账户密码">
              <el-button type="warning">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

    </el-card>

  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      emailForm: {
        age: '',

        email: null
      },
      delivery: false,
      dialogEmailVisible: false,
      dialogPasswordVisible: false,
      passwordForm: {
        oldPassword: null,
        password: null,
        checkPassword: null
      },
      emailRules: {
        checkEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      passwordRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度应该大于6', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请输入校验密码', trigger: 'blur' },
          { min: 6, message: '密码长度应该大于6', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    postEmail() {
      alert(this.emailForm.email)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 1.6% 1.6% 0.6%;
  padding: 0% 1%;
}
.el-row {
  max-width: 100%;
}
.shiyixia {
  margin-right: 10%;
}
</style>
