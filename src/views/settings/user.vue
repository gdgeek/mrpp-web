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
        <el-col :xs="16" :sm="16" :md="12" :lg="10" :xl="10" :offset="3">
          <el-form ref="nicknameForm" :model="nicknameForm" :rules="nicknameRules" label-width="80px">
            <el-form-item label="昵称" prop="nickname">
              <el-input
                v-model="nicknameForm.nickname"
                placeholder="昵称"
                autocomplete="off"
              >
                <el-button slot="suffix" style="margin-right:-5px" @click="submitNickname">确定</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                style="float: left"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <div style="float: left">

                <p class="user-explain">最大尺寸 2 MB。JPG、GIF、PNG。</p>
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
        <el-col :xs="16" :sm="16" :md="12" :lg="10" :xl="10" :offset="3">
          <el-form
            ref="infoForm"
            :model="infoForm"
            :rules="infoRules"
            label-width="80px"
          >
            <el-form-item label="性别">
              <el-radio-group v-model="infoForm.sex">
                <el-radio-button label="man"><i class="el-icon-male  el-icon--left" />男</el-radio-button>
                <el-radio-button label="woman"><i class="el-icon-female el-icon--left" />女</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="行业" prop="industry">
              <el-input v-model="infoForm.industry" placeholder="所在行业" />
            </el-form-item>
            <el-form-item label="居住地" prop="selectedOptions">
              <el-cascader
                v-model="infoForm.selectedOptions"
                size="large"
                :options="infoForm.options"
                style="width: 100%"
                @change="handleChange"
              />
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input
                v-model="infoForm.textarea"
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
                @click="saveInfo()"
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

import { mapGetters, mapMutations } from 'vuex'
import { putUserData } from '@/api/v1/user'
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
  name: 'User',
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  data: function() {
    return {
      imageUrl: '',
      nicknameForm: {
        nickname: ''
      },
      nicknameRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 2, message: '昵称长度应该大于2', trigger: 'blur' }
        ]
      },
      infoForm: {
        sex: 'man',
        industry: '',
        // address-options
        options: regionDataPlus,
        selectedOptions: [],
        textarea: ''
      },
      infoRules: {
        industry: [
          { required: true, message: '请输入所在行业', trigger: 'blur' },
          { min: 2, message: '行业长度应该大于2', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    const self = this
    self.nicknameForm.nickname = self.userData.nickname
    const info = JSON.parse(self.userData.info)

    if (info !== null) {
      if (typeof info.sex !== 'undefined') {
        self.infoForm.sex = info.sex
      }

      if (typeof info.industry !== 'undefined') {
        self.infoForm.industry = info.industry
      }
      if (typeof info.textarea !== 'undefined') {
        self.infoForm.textarea = info.textarea
      }
    }
  },
  methods: {
    ...mapMutations(['SET_DATA']),
    handleChange(value) {
      var ctt = CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]]
      console.log(ctt)
    },
    submitNickname() {
      const self = this
      this.$refs.nicknameForm.validate((valid) => {
        if (valid) {
          putUserData({ nickname: self.nicknameForm.nickname }).then(response => {
            console.log(response.data)
            self.refreshUserdata(response.data)
          })
        }
      })
    },
    refreshUserdata(data) {
      console.log(data.data)
      this.userData.nickname = data.data.nickname
      // this.$store.commit('SET_DATA', data.data)
      // this.SET_DATA(data.datae)
    },
    saveInfo() {
      const self = this
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          putUserData({ info: JSON.stringify(self.infoForm) }).then(response => {
            console.log(response.data)
            self.refreshUserdata(response.data)
          })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
.font-color{
  font-weight:500;
}
.user-explain {
  font-size: 12px;
  line-height: 20px;
}

.avatar-uploader {
  margin: 0 12px 12px 0;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 132px;
  height: 132px;
  line-height: 132px;
  text-align: center;
}
.avatar {
  width: 132px;
  height: 132px;
  display: block;
}
</style>

