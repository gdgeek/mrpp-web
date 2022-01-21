<template>
  <div id="CommuityPost">
    <el-container>

      <el-dialog
        :title="'test'"
        :visible.sync="dialog"
        width="70%"
      >
        <mr-p-p-message-from ref="editor" :data="item" @post="changeMessage" />
      </el-dialog>
      <!--
      <el-header>Header</el-header>
      -->
      <el-main>
        <el-row :gutter="0">
          <el-col :span="16">
            <el-container>
              <el-main>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span v-if="item === null">载入...</span>
                    <span v-else>{{ item.title }}</span>

                    <el-button-group v-if="item!==null && item.author_id === userData.id" style="float: right" :inline="true">
                      <el-button size="" style=" padding: 0 0 0 10px" type="text" @click="dialog = true">
                        修改内容
                      </el-button>
                      <el-button size="" style=" padding: 0 0 0 10px" type="text" @click="deletedWindow(item.id,deletedMessage )">
                        删除帖子
                      </el-button>
                    </el-button-group>
                  </div>
                  <el-skeleton v-if="item === null" :rows="6" animated />
                  <froalaView v-else v-model="item.body" />
                </el-card>
              </el-main>
            </el-container>
            <el-container>
              <el-main>
                <div class="block">
                  <el-timeline>

                    <el-timeline-item timestamp="现在就回复" placement="top">
                      <el-form ref="form" :model="form" :rules="rules" label-width="0px" class="demo-ruleForm">
                        <el-form-item label="" prop="body">
                          <froala id="edit" v-model="form.body" :tag="'textarea'" :config="config" />
                        </el-form-item>
                        <el-form-item>
                          <el-button style="float: right; padding: 5px 10px" @click="submitForm('form')"><font-awesome-icon icon="edit" />回复</el-button>
                        </el-form-item>
                      </el-form>
                    </el-timeline-item>
                    <div v-if="replies === null">
                      <el-timeline-item timestamp="loading..." placement="top">
                        <el-skeleton :rows="3" animated />
                      </el-timeline-item>
                    </div>
                    <div v-else>
                      <el-timeline-item v-for="reply in replies" :key="reply.id" :timestamp="reply.updated_at" placement="top">
                        <el-card :body-style="{ padding: '15px 10px 0px 20px' }">
                          <froalaView v-model="reply.body" />
                          <div style="float: right; padding: 5px 0px" class="bottom clearfix">

                            <span v-text="signature(reply)" /> 发布于<time class="time">{{ reply.updated_at }}</time>
                            &nbsp;
                            &nbsp;
                            <el-button v-if="reply.author_id === userData.id" icon="el-icon-delete" circle size="mini" @click="deletedWindow(reply.id,deletedReply )" />
                          </div>
                        </el-card>
                      </el-timeline-item>
                    </div>

                  </el-timeline>
                </div>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-main><el-card v-if="item" class="box-card"><mr-p-p-penk-card :user_id="item.author_id" /></el-card></el-main>
            </el-container>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import { postReply, deleteReply } from '@/api/v1/reply'
import { getMessage, deleteMessage, putMessage } from '@/api/v1/message'
import MrPPMessageFrom from '@/components/MrPP/MrPPMessageFrom.vue'
import MrPPPenkCard from '@/components/MrPP/MrPPPenkCard.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  name: 'CommunityPost',
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  components: {
    MrPPMessageFrom,
    MrPPPenkCard
  },
  data() {
    return {
      dialog: false,
      config: {
        attribution: false,
        language: 'zh_cn',
        //  toolbarButtons: [['bold',''], ['undo', 'redo', 'bold'], ['alert', 'clear', 'insert']],
        events: {
          initialized: function() {
            console.log('initialized')
          }
        }
      },
      form: {
        body: ''
      },
      rules: {
        body: [
          { required: true, message: '请填写内容', trigger: 'blur' },
          { min: 10, message: '长度至少10个字符', trigger: 'blur' }
        ]
      },
      item: null,
      replies: null

    }
  },
  created() {
    const self = this
    getMessage(this.$route.query.id).then(r => {
      console.log(r.data)
      self.item = {

        id: r.data.id,
        title: r.data.title,
        body: r.data.body,
        author_id: r.data.author_id,
        updated_at: r.data.updated_at
      }
      self.replies = []
      r.data.replies.forEach(item => {
        self.replies.push({
          id: item.id,
          body: item.body,
          updated_at: item.updated_at,
          info: item.info,
          author_id: item.author_id
        })
      })
    })
  },
  methods: {

    changeMessage: function(data) {
      const self = this
      putMessage(this.$route.query.id, data).then(response => {
        self.item = {
          id: response.data.id,
          title: response.data.title,
          body: response.data.body,
          updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          author_id: self.userData.id// .author_id
        }
        self.dialog = false
      })
    },
    signature(reply) {
      if (typeof reply.info !== 'undefined' && reply.info !== null) {
        const info = JSON.parse(reply.info)
        return info.signature
      }
      return null
    },
    clear() {
      this.resetForm('form')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postReply({ body: self.form.body, message_id: this.$route.query.id, info: JSON.stringify({ 'signature': self.userData.nickname }) }).then(r => {
            self.clear()
            if (self.replies === null) {
              self.replies = []
              console.error(r.data)
            }
            self.replies.unshift({
              id: r.data.id,
              body: r.data.body,
              updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
              info: r.data.info,
              author_id: self.userData.id
            })
            self.$message({
              message: '回复成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deletedWindow: function(id, deleted) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        deleted(id)
        this.$message({
          message: '确定删除'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deletedReply: function(id) {
      const self = this
      deleteReply(id).then((response) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        const replies = []
        self.replies.forEach(item => {
          if (item.id !== id) {
            replies.push(item)
          }
        })
        self.replies = replies
      }).catch(function(error) {
        console.log(error)
      })
    },
    deletedMessage: function(id) {
      const self = this
      deleteMessage(id).then((response) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        self.$router.push({ path: '/community/index' })
      }).catch(function(error) {
        console.log(error)
      })
    }

  }
}
</script>
