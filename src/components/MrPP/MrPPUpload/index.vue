<template>
  <div>
    <div class="document-index">
      <el-card class="box-card-component" style="margin:18px 18px 0">
        <div slot="header" class="box-card-header">

          <h3>{{ title }}:</h3>{{ declared }}

        </div>
        <div style="position:relative;">
          <div class="progress-item">
            <span>解析文件</span>
            <el-progress :percentage="md5.percentage" />

          </div>
          <div class="progress-item">
            <span>上传文件</span>
            <el-progress :percentage="upload.percentage" />

          </div>
          <div class="progress-item">
            <span>保存信息</span>
            <el-progress :percentage="save.percentage" />
          </div>
          <el-divider />
          <el-button type="primary" :disabled="isdisabled" @click="selectFile()"><slot>11</slot></el-button>
        </div>

      </el-card>

    </div>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
import { fileOpen, fileMD5, fileHas, fileUrl, fileUpload, fileCos } from '@/assets/js/file.js'
import { postFile } from '@/api/files'

export default {
  name: 'MrPPUpload',
  props: {
    fileType: {
      type: String,
      default: '*'
    }
  },
  data: function() {
    return {
      title: '选择文件',
      declared: '请选择对应格式的文件进行上传操作',
      md5: { percentage: 0, status: '' },
      upload: { percentage: 0, status: '' },
      save: { percentage: 0, status: '' },
      isdisabled: false
    }
  },
  methods: {
    step(type) {
      const self = this
      switch (type) {
        case 'ready':
          self.title = '选择文件'
          self.declared = '请选择对应格式的文件进行上传操作'
          break
        case 'md5':
          self.title = '文件预处理'
          self.declared = '通过计算得到文件的 md5 编码'
          break
        case 'upload':
          self.title = '文件上传中'
          self.declared = '文件正在发送至服务器'
          break
        case 'succeed':
          self.title = '文件上传成功'
          self.declared = '文件已经被发送到服务器'
          break
        case 'failed':
          self.title = '文件上传失败'
          self.declared = '上传文件过程中遇到错误'
          break
      }
    },
    progress(p) {
      const ret = {}
      p = p > 1 ? 1 : p
      ret.percentage = Math.round(p * 100)
      if (p === 1) {
        ret.status = 'success'
      } else {
        ret.status = ''
      }
      return ret
    },
    /* savePicture(name, id) {

      const self = this
      const picture = { name, file_id: file, type: 'picture' }
      postPicture(name, id).then((response) => {
        console.log(response.data)
        self.save = self.progress(1)
        self.$router.push({ path: '/picture/view', query: { id: response.data.id }})
      }).catch(err => {
        console.log(err)
      })
    },*/
    saveFile(filename, md5, type, url) {
      const self = this
      self.step('succeed')
      self.upload = self.progress(1)
      postFile(filename, md5, type, url).then((response) => {
        self.save = self.progress(0.5)
        self.$emit('saveResource', filename, response.data.id).then(() => {
          self.save = self.progress(1)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    selectFile() {
      const self = this
      fileOpen(self.fileType).then(function(file) {
        self.step('md5')
        self.isdisabled = !self.isdisabled
        fileMD5(file, function(p) {
          self.md5 = self.progress(p)
        }, new SparkMD5()).then(function(md5) {
          const key = md5 + file.extension
          fileCos().then(cos => {
            fileHas(key, cos).then(function(has) {
              self.step('upload')
              let type = file.type
              if (type === '') {
                type = file.extension
              }
              if (has) {
                self.saveFile(file.name, md5, type, fileUrl(key, cos))
              } else {
                fileUpload(key, file, self.progress, cos
                ).then(data => {
                  self.saveFile(file.name, md5, type, fileUrl(key, cos))
                })
              }
            })
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
