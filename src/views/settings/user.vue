<template>
  <div>
    <el-row :gutter="10">
      <el-card class="box-card">
        <div slot="header">
          <p>
            <i class="el-icon-picture" />
            上传用户头像
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
            <el-col :span="6" style="width: 280px">
              <el-form-item label="昵称">
                <el-input placeholder="昵称" />
              </el-form-item>
              <el-form-item label="性别">
                <el-input placeholder="性别" />
              </el-form-item>
              <br>
              <el-form-item label="居住地">
                <el-input placeholder="居住地" />
              </el-form-item>
              <el-form-item label="行业">
                <el-input placeholder="行业" />
              </el-form-item>
              <br>
              <el-form-item label="个人简介">
                <el-input style="width: 160%" type="textarea" />
              </el-form-item>
              <!-- </el-col> -->

              <br>
              <!-- <el-col :span="9"> -->
              <el-form-item class="form-button">
                <el-button style="width: 60%" type="primary" @click="onSubmit">
                  确定
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>

      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'User',
  data: function() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 1.6% 2% 0.4%;
  padding: 4% 1%;
}
.form-body {
  display: block;
  height: 100%;
  max-width: 100%;
  padding: 1% 2%;
}
</style>
