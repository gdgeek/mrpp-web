<template>
  <div class="document-index">
    <el-row :gutter="20" style="margin-left:18px;margin-top:28px;margin-right:18px;">
      <el-col :sm="24" class="panel-group">
        <el-card v-if="window" class="box-card" shadow="never" style="color:#dfa234;background:#fcf6ec;border-color:#fcf6ec">
          <div slot="header" class="clearfix">
            <b>{{ info.title }}</b>
            <el-button style="float: right; padding: 4px 4px" icon="el-icon-close" circle @click="window= false" />
          </div>
          <div>
            {{ info.description }}<p />
            <el-progress :text-inside="true" :stroke-width="20" :percentage="70" />
          </div>
        </el-card>
        <br>
      </el-col>

      <el-col :sm="16">
        <el-card class="box-card">
          <div slot="header">
            <b id="title">  图片名称：</b> <span v-if="data">{{ data.name }}</span>
          </div>
          <div class="box-item">
            <div v-if="!prepare" style="height: 300px; width: 100%; text-align:center">
              <h5><font-awesome-icon icon="cog" /> 图片预处理...</h5>
              <br><br><br>

              <font-awesome-icon icon="cog" size="6x" pulse />
            </div>
            <a-scene
              v-show="prepare"
              id="a-scene"
              name="scene"
              background="color: #E0FFFF"
              embedded=""
              style="height: 300px; width: 100%"
            >
              <a-entity id="cameraWrapper" position="0 -1.6 1">
                <a-camera />
              </a-entity>

              <a-entity
                target-scale="target:1;callback:infoCallback"
                :gltf-model="model"
                position="0 0 0"
              />
            </a-scene>

          </div>

        </el-card>
        <br>
      </el-col>

      <el-col :sm="8">
        <el-card class="box-card">
          <div slot="header">

            <b>图片信息</b>:

          </div>
          <div class="box-item">
            <el-table
              :data="tableData"
              stripe
            >

              <el-table-column
                prop="item"
                label="条目"
              />
              <el-table-column
                prop="text"
                label="内容"
              />

            </el-table>

            <aside
              style="margin-top: 10px;margin-bottom: 30px;"
            >
              <el-button-group style="float: right;">
                <el-button type="primary" size="mini" @click="namedWindow()"><i class="el-icon-edit" />改名</el-button>
                <el-button type="primary" size="mini" @click="deleteWindow()"><i class="el-icon-delete" />删除</el-button>
              </el-button-group>
            </aside>
          </div>

        </el-card>
        <br>
      </el-col>

    </el-row>
  </div>
</template>
<script>
import { getPictureOne, putPicture, deletePicture } from '@/api/resources'
import { postFile } from '@/api/files'
import { printVector3 } from '@/assets/js/helper'
import SparkMD5 from 'spark-md5'
import { fileMD5, fileCos, fileUpload, fileHas, fileUrl } from '@/assets/js/file.js'

import 'aframe'

import {} from '../../assets/js/aframe-components.js'
export default {
  name: 'PictureView',
  data: function() {
    return {
      loading: true,
      window: true,
      data: null,
      info: { title: '载入图片', description: '从服务器获得图片数据' },
      extent: { min: 0, max: 1 },
      model: null,
      step: 0,
      infobar: true
    }
  },
  computed: {
    tableData() {
      if (this.data !== null && this.prepare) {
        console.log('============')
        console.log(JSON.parse(this.data.info))
        return [{
          item: '图片名称',
          text: this.data.name
        }, {
          item: '创建者',
          text: this.data.author.username
        }, {
          item: '创建时间',
          text: this.data.created_at
        }, {
          item: '图片尺寸',
          text: printVector3(JSON.parse(this.data.info).size)
        }, {
          item: '图片中心点',
          text: printVector3(JSON.parse(this.data.info).center)
        }
        ]
      } else {
        return [
        ]
      }
    },
    percentage() {
      const self = this
      return Math.round((((1 - self.step) * self.extent.min) + self.step * self.extent.max) * 100)
    },
    id() {
      return this.$route.query.id
    },
    prepare() {
      return this.data != null && this.data.info !== null
    },
    dataInfo() {
      if (this.prepare) {
        return JSON.parse(this.data.info)
      }
      return null
    },
    meshSize() {
      if (this.prepare) {
        return this.dataInfo.size
      }
      return '等待更新'
    },
    meshCenter() {
      if (this.prepare) {
        return this.dataInfo.center
      }
      return '等待更新'
    }
  },
  created: function() {
    window.infoCallback = this.infoCallback
    const self = this
    self.info = { title: '获取信息', description: '从服务器下载图片数据信息' }
    self.extent = { min: 0, max: 0.1 }

    getPictureOne(self.id).then((response) => {
      self.data = response.data
      console.log(response.data)
      self.model = 'url(' + response.data.file.url + ')'
      if (self.prepare) {
        self.window = false
        self.info = { title: '获取图片', description: '从服务器下载图片文件' }
        self.extent = { min: 0.1, max: 1 }
      } else {
        self.info = { title: '预处理', description: '从服务器下载图片文件' }
        self.extent = { min: 0.1, max: 0.2 }
      }
    })
  },
  methods: {

    deleteWindow: function() {
      const self = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        self.delete(self.data.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    delete: function(id) {
      const self = this
      console.log(self.api + '/resources/' + id + '?type=picture')

      deletePicture(id).then((response) => {
        self.$router.push({ path: '/picture/index' })
      }).catch(function(error) {
        console.log(error)
        self.failed(JSON.parse(error.message))
      })
    },
    namedWindow: function() {
      const self = this
      this.$prompt('请输入新名称', '修改图片名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputValue: self.data.name
      }).then(({ value }) => {
        self.named(self.data.id, value)
        this.$message({
          type: 'success',
          message: '新的图片名称: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    named: function(id, name) {
      const self = this
      const picture = { name }
      console.log(picture)
      putPicture(id, picture).then((response) => {
        self.data.name = response.data.name
      }).catch(err => {
        console.log(err)
      })
    },
    hidden() {
      this.infobar = false
    },
    progress(p) {
      this.step = p
    },
    updatePicture(imageId, center, size) {
      const self = this
      self.info = { title: '预处理', description: '更新图片的相关信息' }
      self.extent = { min: 0.9, max: 1 }
      const info = JSON.stringify({ center, size })
      console.log(info)
      const picture = { image_id: imageId, info }
      console.log(picture)
      putPicture(this.data.id, picture).then((response) => {
        self.info = { title: '处理完成', description: '展示图片文件' }
        self.extent = { min: 0.9, max: 1 }
        console.log(response.data)
        this.data.image_id = response.data.image_id
        this.data.info = response.data.info
        console.log(this.dataInfo)
        console.log(self.meshCenter)
      }).catch(err => {
        console.log(err)
      })
    },
    saveFile(filename, md5, type, url, center, size) {
      const self = this
      self.info = { title: '预处理', description: '更新缩略图文件的相关信息' }
      self.extent = { min: 0.8, max: 0.9 }
      postFile(filename, md5, type, url).then((response) => {
        self.step = 0.5
        console.log(response.data)
        self.updatePicture(response.data.id, center, size)
      }).catch(err => {
        console.log(err)
      })
    },
    infoCallback(center, size) {
      console.log(center)
      console.log(size)
      const self = this
      if (self.prepare) {
        self.info = { title: '处理完成', description: '展示图片文件' }
        self.extent = { min: 0, max: 1 }
        self.step = 1
        return
      } else {
        self.info = { title: '预处理', description: '计算图片信息并更新' }
        self.extent = { min: 0.2, max: 0.3 }
        self.step = 0
      }
      this.screenshot().then(function(blob) {
        blob.name = self.data.name
        blob.extension = '.jpg'
        const file = blob
        self.info = { title: '预处理', description: '将渲染好的缩略图计算MD5' }
        self.extent = { min: 0.3, max: 0.4 }
        self.step = 0
        fileMD5(file, self.progress, new SparkMD5()).then(function(md5) {
          const key = md5 + file.extension
          self.info = { title: '预处理', description: '获取储存服务器信息' }
          self.extent = { min: 0.4, max: 0.5 }
          self.step = 0
          fileCos().then(cos => {
            self.info = { title: '预处理', description: '上传缩略图文件到服务器' }
            self.extent = { min: 0.5, max: 0.8 }
            self.step = 0
            fileHas(key, cos).then(function(has) {
              self.progress(0)
              if (has) {
                self.progress(100)
                self.saveFile(file.name, md5, file.type, fileUrl(key, cos), center, size)
              } else {
                fileUpload(key, file, self.progress, cos
                ).then(data => {
                  self.progress(100)
                  self.saveFile(file.name, md5, file.type, fileUrl(key, cos), center, size)
                })
              }
            })
          })
        })
      })
      console.log(center)
      console.log(size)
    },
    screenshot() {
      return new Promise((resolve, reject) => {
        const canvas = document.querySelector('a-scene').components.screenshot.getCanvas('equirectangular')
        const context = canvas.getContext('2d')
        const imgData = context.getImageData(2048 + 512, 512, 1024, 1024)
        const temp = document.createElement('canvas')
        temp.width = 1024
        temp.height = 1024
        const tc = temp.getContext('2d')
        tc.putImageData(imgData, 0, 0)
        const type = 'image/jpeg'
        temp.toBlob(function(blob) {
          resolve(blob)
        }, type)
        console.log(type)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
