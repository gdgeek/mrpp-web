<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <h2>账号设置</h2>
        <p>用户：32154465455</p>
        <p>昵称：修改中</p>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <h4>绑定设置</h4>
        <el-row :gutter="20">
          <el-col :span="8" style="width: 320px" :offset="4">
            <div>
              <p>绑定手机：13739****54</p>
              <el-button style="width: 40%" type="primary">编辑</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" style="width: 320px" :offset="4">
            <div>
              <p>绑定邮箱：13739****54</p>
              <el-button style="width: 40%" type="primary">编辑</el-button>
            </div>
          </el-col>
        </el-row>
        <el-divider />

        <h4>密码设置</h4>
        <el-row :gutter="20">
          <el-col :span="8" style="width: 320px" :offset="4">
            <div>
              <p>修改密码</p>
              <el-button style="width: 40%" type="primary">确定</el-button>
            </div>
          </el-col>
        </el-row>
        <el-divider />

        <h4>消息提醒</h4>
        <el-row :gutter="20">
          <el-col :span="8" style="width: 320px" :offset="4">
            <div>
              <p>重要事件发生时，我将会收到邮件提醒</p>
              <el-button style="width: 40%" type="primary">编辑</el-button>
            </div>
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
.el-row {
  max-width: 100%;
  margin-bottom: 3%;
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
