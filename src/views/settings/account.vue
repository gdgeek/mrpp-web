<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <h2>账号设置</h2>
        <p>用户：id53365355</p>
        <p>昵称：混合现实之旅</p>
      </div>

      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <h4>绑定设置</h4>
        <el-row :gutter="20">
          <el-col :span="8" style="width: 320px" :offset="3">
            <el-form-item label="绑定手机" prop="pass">
              <el-input placeholder="13342453697" :disabled="true" />
            </el-form-item>
            <el-form-item>
              <el-button style="width: 60%" type="primary">
                编辑
              </el-button>
            </el-form-item>
            <el-form-item label="绑定邮箱" prop="checkPass">
              <el-input placeholder="teseaccount@126.com" :disabled="true" />
            </el-form-item>
            <el-form-item>
              <el-button style="width: 60%" type="primary">
                编辑
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />

        <h4>密码设置</h4>
        <el-row :gutter="20">
          <el-col :span="8" style="width: 320px" :offset="3">
            <el-form-item label="新的密码" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input
                v-model="form.checkPassword"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <el-button style="width: 60%" type="primary">
                <!-- @click="onSubmit" -->
                修改密码
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-divider /> -->
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      delivery: false,
      form: {
        password: null,
        checkPassword: null
      },
      rules: {
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
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 1.6% 1.6% 0.6%;
  padding: 4% 1%;
}
.el-row {
  max-width: 100%;
}
// .user-icon{
//  display: block;
//  width: 120px;
//  height: 120px;
//  background: url(logo.jpg)no-repeat;
//  background-size:100%;
//  border-radius: 50%;
// }
</style>
