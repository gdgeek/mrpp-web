<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账号设置</h3>
        <small>账号具体内容的配置和修改</small>
      </div>
      <el-row :gutter="24">

        <el-col :xs="16" :sm="16" :md="12" :lg="10" :xl="10">

          <el-form ref="emailForm" :model="emailForm" label-width="100px" style="min-width:300px">

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
                @click="postEmail('emailForm')"
              >绑定</el-button></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="24">
        <el-col :xs="16" :sm="16" :md="10" :lg="6" :xl="6">
          <el-form label-width="100px" style="min-width:300px">
            <el-form-item label="账户密码">
              <el-button-group>
                <el-button type="warning" @click="dialogPasswordVisible = true">修改密码</el-button>
                <el-button disabled type="warning" @click="dialogPasswordVisible = true">找回密码</el-button>
              </el-button-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 修改密码弹窗 -->
      <el-dialog title="修改密码" :visible.sync="dialogPasswordVisible" style="min-width:560px" @close="resetForm('passwordForm')">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="80px">
          <el-row :gutter="24">
            <el-col :xs="20" :sm="20" :md="14" :lg="14" :xl="14" :offset="4">
              <el-form-item label="旧的密码" prop="oldPassword">
                <el-input
                  v-model="passwordForm.oldPassword"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>

              <el-form-item label="新的密码" prop="password">
                <el-input
                  v-model="passwordForm.password"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>

              <el-form-item label="确认密码" prop="checkPassword">
                <el-input
                  v-model="passwordForm.checkPassword"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>

              <el-form-item>
                <el-button
                  style="width: 100%"
                  type="primary"
                  @click="changePassword('passwordForm')"
                >
                  确认修改
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <!-- 修改密码弹窗结束 -->

    </el-card>

  </div>
</template>

<script>

import { bindEmail, changePassword } from '@/api/servers'
export default {
  name: 'Account',
  data() {
    return {
      emailForm: {
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
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度应该大于6', trigger: 'blur' }
        ],
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
    changePassword(formName) {
      const self = this
      self.dialogPasswordVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('woprd')
          changePassword(self.passwordForm.oldPassword, self.passwordForm.password).then((response) => {
            self.$message({
              message: '密码修改成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    postEmail(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          bindEmail(self.emailForm.email).then((response) => {
            self.$message({
              message: '请到' + self.emailForm.email + '查收绑定邮件',
              type: 'warning'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 1.6% 1.6% 0.6%;
  padding: 0% 1%;
}
</style>
