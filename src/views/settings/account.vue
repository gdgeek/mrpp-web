<template>
  <div>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h4>你的账户</h4>
          <p><i class="el-icon-picture" />上传用户头像</p>
        </div>
        <div style="position:relative;">
          <h4>基本信息</h4>
          <el-form ref="form" :inline="true" :model="form" label-width="80px">
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
              <el-input type="textarea" />
            </el-form-item>
            <br>
            <el-form-item size="large">
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>

          <el-divider />
          <h4>密码与安全</h4>
          <div>手机号：1321***3432</div>
          <div>修改密码：input</div>
          <div><span>邮箱绑定、</span><span>微信绑定</span></div>

          <el-divider />
          <h4>隐私</h4>

          <el-divider />
          <h4>偏好</h4>

        </div>

        <el-divider />
        <el-divider />

      </el-card>
    </el-col>
  </div>
</template>

<script>

export default {
  name: 'Account',
  data: function() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 24px 30px 0 30px;
    padding: 0 30px;
    /* width: 480px; */
  }
</style>
