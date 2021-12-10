<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <h2>账号设置</h2>
        <p>用户：id53365355</p>
        <span>昵称：eat-everyting</span>
      </div>

      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <h4>绑定设置</h4>
        <el-row>
          <el-col :span="8" style="width: 320px" :offset="4">
            <el-form-item label="已绑定邮箱" prop="checkPass">
              <el-button type="text" @click="dialogTableVisible = true">
                4336433125@163.com
              </el-button>
              <span><i class="el-icon-check" /></span>
            </el-form-item>
            <!-- if用来替换的 -->
            <el-form-item label="未绑定邮箱" prop="checkPass">
              <el-button type="text" @click="dialogTableVisible = true">
                验证邮箱
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />

        <h4>安全设置</h4>
        <el-row>
          <el-col :span="8" style="width: 320px" :offset="4">
            <el-form-item label="账户密码" prop="password">
              <el-button type="text" @click="dialogFormVisible = true">
                修改密码
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-divider /> -->
        <!-- 弹出的邮箱验证 -->
        <el-dialog title="绑定邮箱" :visible.sync="dialogTableVisible">
          <el-form :model="form" label-width="80px">
            <el-row>
              <el-col :span="12" :offset="5">
                <el-form-item label="邮箱地址" prop="checkEmail">
                  <el-input
                    v-model="form.checkEmal"
                    type="password"
                    autocomplete="off"
                  />
                </el-form-item>

                <el-form-item>
                  <el-button
                    style="width: 50%"
                    type="primary"
                    @click="dialogTableVisible = false"
                  >
                    发送
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>

        <!-- 弹出邮箱验证结束 -->

        <!-- 弹出的密码设置 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="form" label-width="80px">
            <el-row>
              <el-col :span="12" :offset="5">
                <el-form-item label="旧的密码" prop="password">
                  <el-input
                    v-model="form.oldpassword"
                    type="password"
                    autocomplete="off"
                  />
                </el-form-item>

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
                  <el-button
                    style="width: 50%"
                    type="primary"
                    @click="dialogFormVisible = false"
                  >
                    确认修改
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>
        <!-- 弹出的密码设置结束 -->
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
      dialogTableVisible: false,
      dialogFormVisible: false,
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
.shiyixia {
  margin-right: 10%;
}
</style>
