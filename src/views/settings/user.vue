<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <a class="header-icon" href="" />
        <p>用户：test33593245</p>
        <p>
          <i class="el-icon-picture">
            编辑用户头像
          </i>
        </p>
      </div>

      <h4>基本信息</h4>
      <div>

        <el-form
          ref="form"
          :model="form"
          class="form-body"
          label-width="80px"
        >
          <el-row :gutter="20">
            <el-col :span="6" style="width: 320px" :offset="2">
              <el-form-item label="昵称">
                <el-input placeholder="昵称" />
              </el-form-item>
              <el-form-item label="性别">
                <el-input placeholder="性别" />
              </el-form-item>
              <el-form-item label="居住地">
                <el-input placeholder="居住地" />
              </el-form-item>
              <el-form-item label="行业">
                <el-input placeholder="行业" />
              </el-form-item>
              <br>
              <el-form-item label="个人简介">
                <el-input
                  v-model="textarea"
                  style="width: 140%"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 10}"
                  placeholder="个人的简介"
                />
              </el-form-item>
              <el-form-item>
                <el-button style="width: 60%" type="primary" @click="onSubmit">
                  确定
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data: function() {
    return {
      textarea: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 1.6% 1.6% 0.6%;
  padding: 4% 1%;
}
.form-body {
  max-width: 100%;
  padding: 2% 0;
}
.header-icon{
 display: block;
 width: 120px;
 height: 120px;
 background: url(logo.jpg)no-repeat;
 background-size:100%;
 border-radius: 50%;
}
</style>
