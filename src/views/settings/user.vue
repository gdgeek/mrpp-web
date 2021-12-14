<template>
  <div>
    <el-card class="box-card">
      <div class="box-title">
        <h3 class="font-color">个人中心</h3>
        <small>用户昵称、头像、基本信息修改</small>
      </div>
      <el-divider />
      <div class="box-title">
        <h3 class="font-color">用户昵称</h3>
        <small>让MrPP社区的其它用户更容易认识您。</small>
      </div>
      <!-- 用户头像和昵称开始 -->
      <el-row :gutter="24">
        <el-col :xs="16" :sm="16" :md="12" :lg="10" :xl="10" offset="3">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="昵称" prop="username">
              <el-input
                v-model="form.username"
                placeholder="昵称"
                autocomplete="off"
              >
                <el-button slot="append">确定</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="头像">
              <img class="user-icon" href="" style="float: left">
              <div style="float: left">
                <el-button type="primary">
                  <i class="el-icon-upload el-icon--right" />
                  上传
                </el-button>
                <p class="user-explain">最大尺寸 1 MB。JPG、GIF 或 PNG。</p>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 用户头像和昵称结束 -->
      <el-divider />
      <div class="box-title">
        <h3 class="font-color">基本信息</h3>
        <small>请填写你的基本信息，以获得更有乐趣的个性化交互和体验。</small>
      </div>

      <!-- 用户基本信息开始 -->
      <el-row :gutter="24">
        <el-col :xs="16" :sm="16" :md="12" :lg="10" :xl="10" offset="3">
          <el-form
            ref="addForm"
            :model="addForm"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item label="性别">
              <el-radio-group v-model="addForm.radio1">
                <el-radio-button label="男"><i class="el-icon-male  el-icon--left" />男</el-radio-button>
                <el-radio-button label="女"><i class="el-icon-female el-icon--left" />女</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="行业" prop="industry">
              <el-input v-model="addForm.industry" placeholder="所在行业" />
            </el-form-item>
            <el-form-item label="居住地" prop="address">
              <el-input v-model="addForm.address" placeholder="居住地" />
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input
                v-model="addForm.textarea"
                style="width: 100%"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
                placeholder="个人的简介"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 150px"
                @click="dialogFormVisible = false"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 用户基本信息结束 -->

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
        username: ''
      },
      addForm: {
        radio1: '男',
        radio2: '女',
        industry: '',
        address: '',
        textarea: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, message: '昵称长度应该大于2', trigger: 'blur' }
        ],
        industry: [
          { required: true, message: '请输入所在行业', trigger: 'blur' },
          { min: 2, message: '行业长度应该大于2', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入居住地', trigger: 'blur' },
          { min: 2, message: '居住地长度应该大于2', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.addForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 1.6% 1.6% 0.6%;
}
.box-title {
  margin-bottom: 36px;
  line-height: 10px;
  padding: 2px 0;
  margin-left: 1%;
  color: #4d4f52;
}
.user-icon {
  display: block;
  margin-right: 12px;
  width: 130px;
  height: 130px;
  background: url(logo.jpg) no-repeat;
  background-size: 100%;
  border-radius: 5%;
}
.user-explain {
  font-size: 12px;
  line-height: 20px;
}
.font-color{
  font-weight:500;
}
</style>
