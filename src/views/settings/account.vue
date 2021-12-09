<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <h2>账号设置</h2>
        <p>用户：id54465455</p>
        <p>昵称：欢乐豆子</p>
      </div>

      <el-form ref="form" :model="form" label-width="80px">
        <h4>绑定设置</h4>
        <el-row :gutter="20">
          <el-col :span="8" style="width: 320px" :offset="3">
            <el-form-item label="绑定手机" prop="pass">
              <el-input placeholder="13342453697" :disabled="true" />
            </el-form-item>
            <el-form-item>
              <el-button style="width: 60%" type="primary" @click="onSubmit">
                编辑
              </el-button>
            </el-form-item>
            <el-form-item label="绑定邮箱" prop="checkPass">
              <el-input placeholder="teseaccount@126.com" :disabled="true" />
            </el-form-item>
            <el-form-item>
              <el-button style="width: 60%" type="primary" @click="onSubmit">
                编辑
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />

        <h4>密码设置</h4>
        <el-row :gutter="20">
          <el-col :span="8" style="width: 320px" :offset="3">
            <el-form-item label="新的密码" prop="pass">
              <el-input
                v-model="ruleForm.pass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <el-button style="width: 60%" type="primary" @click="onSubmit">
                确定
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />

        <h4>消息提醒</h4>
        <el-row :gutter="20">
          <el-col :span="8" style="width: 320px" :offset="3">
            <el-form-item label="关闭消息">
              <el-switch v-model="delivery" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- <el-button /> -->
  </div>

  <!-- <el-divider />
        <el-divider /> -->
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      delivery: false,
      ruleForm: {
        pass: '',
        checkPass: ''
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
