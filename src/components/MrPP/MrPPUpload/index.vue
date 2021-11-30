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

          <el-button type="primary" @click="selectFile()">选择图片并上传</el-button>
        </div>

      </el-card>

    </div>
  </div>
</template>

<script>
/*
import SparkMD5 from 'spark-md5'
import { fileOpen, fileMD5, fileHas, fileUrl, fileUpload, fileCos } from '../../assets/js/file.js'

import { postFile } from '@/api/files'
/*
import { postPicture } from '@/api/resources'
*/

export default {
  name: 'MrPPUpload',
  props: {
    title: {
      type: String,
      default: ''
    },
    declared: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      md5: { percentage: 0 },
      upload: { percentage: 0 },
      save: { percentage: 0 }
    }
  },
  methods: {
    selectFile() {
      const self = this
      fileOpen('image/gif, image/jpeg, image/png').then(function(file) {
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

<style scoped>

</style>
