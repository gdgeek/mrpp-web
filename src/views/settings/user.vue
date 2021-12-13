<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <a class="header-icon" href="" />
        <p>用户：test33593245</p>
        <br>
      </div>

      <h4>个人资料</h4>
      <div>
        <!-- 信息表格开始 -->
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-row>
            <el-col :span="12" style="width: 520px" :offset="1">
              <el-form-item>
                <table class="form-table">
                  <tr><td> 性别:</td><td> {{ form.radio1 }} </td></tr>
                  <tr><td> 昵称: </td><td> {{ form.name }} </td></tr>
                  <tr><td> 行业: </td><td> {{ form.industry }} </td></tr>
                  <tr><td> 居住地: </td><td> {{ form.address }} </td></tr>
                  <tr><td>个人简介：</td></tr>
                </table>
                <div>
                  <el-input
                    v-model="form.textarea"
                    style="width: 60%"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 10 }"
                    :disabled="true"
                  />
                </div>
                <br>
                <el-button style="width: 32%" type="primary" @click="dialogFormVisible = true">
                  修改信息
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 表格结束 -->
      </div>
      <!-- 修改信息弹窗 -->
      <el-dialog title="修改个人资料" :visible.sync="dialogFormVisible">
        <el-form ref="addForm" :model="addForm" label-width="80px">
          <el-row>
            <el-col :span="12" :offset="3">

              <el-form-item label="性别">
                <el-radio-group v-model="addForm.radio1">
                  <el-radio-button label="男" />
                  <el-radio-button label="女" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="addForm.name" placeholder="昵称" autocomplete="off" />
              </el-form-item>
              <el-form-item label="行业">
                <el-input v-model="addForm.industry" placeholder="所在行业" />
              </el-form-item>
              <el-form-item label="居住地">
                <el-input v-model="addForm.address" placeholder="居住地" />
              </el-form-item>
              <br>
              <el-form-item label="个人简介">
                <el-input
                  v-model="addForm.textarea"
                  style="width: 140%"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                  placeholder="个人的简介"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 60%" @click="dialogFormVisible = false">保存</el-button>
              </el-form-item>

            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <!-- 修改信息弹窗结束 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data: function() {
    return {
      dialogFormVisible: false,
      form: {
        radio1: '男',
        radio2: '女',
        name: '',
        address: '',
        industry: '',
        textarea: ''
      },
      addForm: {
        radio1: '男',
        radio2: '女',
        name: '',
        address: '',
        industry: '',
        textarea: ''
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
.form-table td{
  font-size: 16px;
  font-weight:500;
  width: 100px;
}
.header-icon {
  display: block;
  width: 120px;
  height: 120px;
  background: url(logo.jpg) no-repeat;
  background-size: 100%;
  border-radius: 50%;
}
</style>
