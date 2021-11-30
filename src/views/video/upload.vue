<template>
  <div>

    <div class="document-index">
      <el-card class="box-card-component" style="margin-left:18px;margin-top:18px;margin-right:18px;">
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

          <el-button type="primary" @click="selectFile()">选择视频，并上传</el-button>
        </div>

      </el-card>

    </div>
  </div>
</template>

<script>

import SparkMD5 from 'spark-md5'
import { fileOpen, fileMD5, fileHas, fileUrl, fileUpload, fileCos } from '@/assets/js/file.js'
import { mapMutations } from 'vuex'
import { postFile } from '@/api/files'
import { postVideo } from '@/api/resources'
export default {
  name: 'VideoUpload',
  data: function() {
    return {
      icon: 'fa fa-folder-open',
      color: 'info-box bg-yellow',
      title: '选择文件',
      declared: '请选择视频文件进行上传操作',
      md5: { percentage: 0, status: '' },
      upload: { percentage: 0, status: '' },
      save: { percentage: 0, status: '' }
    }
  },
  methods: {
    ...mapMutations([
      'flashSetup'
    ]),
    step(type) {
      const self = this
      switch (type) {
        case 'ready':
          self.icon = 'fa fa-folder-open'
          self.color = 'info-box bg-yellow'
          self.title = '选择文件'
          self.declared = '请选择视频文件进行上传操作'
          break
        case 'md5':
          self.icon = 'fa fa-cogs'
          self.color = 'info-box bg-blue'
          self.title = '文件预处理'
          self.declared = '通过计算得到文件的 md5 编码'
          break
        case 'upload':
          self.icon = 'fa fa-upload'
          self.color = 'info-box bg-aqua'
          self.title = '文件上传中'
          self.declared = '文件正在发送至服务器'
          break
        case 'succeed':
          self.icon = 'fa fa-check'
          self.color = 'info-box bg-green'
          self.title = '文件上传成功'
          self.declared = '文件已经被发送到服务器'
          break
        case 'failed':
          self.icon = 'fa fa-times'
          self.color = 'info-box bg-red'
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
    saveVideo(name, file) {
      const self = this
      // const video = { name, file_id: file, type: 'video' }
      postVideo(name, file).then((response) => {
        console.log(response.data)
        self.save = self.progress(1)
        self.$router.push({ path: '/video/view', query: { id: response.data.id }})
      }).catch(err => {
        console.log(err)
      })
    },
    saveFile(filename, md5, type, url) {
      const self = this
      postFile(filename, md5, type, url).then((response) => {
        self.save = self.progress(0.5)
        self.saveVideo(filename, response.data.id)
      }).catch(err => {
        console.log(err)
      })
    },
    selectFile() {
      const self = this

      fileOpen('video/mp4,video/ogg').then(function(file) {
        self.step('md5')
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
                self.step('succeed')
                self.upload = self.progress(1)

                self.saveFile(file.name, md5, type, fileUrl(key, cos))
              } else {
                fileUpload(key, file, self.progress, cos
                ).then(data => {
                  self.saveFile(file.name, md5, type, fileUrl(key, cos))
                  self.step('succeed')
                  self.upload = self.progress(1)
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
