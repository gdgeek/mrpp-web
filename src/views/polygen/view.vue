<template>
  <div class="document-index">
    <el-row :gutter="20" style="margin:28px 18px 0">

      <el-col :sm="16">
        <el-card class="box-card">
          <div slot="header">
            <b id="title">  模型名称：</b> <span v-if="data">{{ data.name }}</span>
          </div>
          <div class="box-item">

            <a-scene
              id="a-scene"
              v-loading="expire"
              element-loading-text="正在预处理"
              element-loading-background="rgba(0, 0, 0, 0.8)"
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
                :gltf-model="file"
                position="0 0 0"
              />
            </a-scene>

          </div>

        </el-card>
        <br>
      </el-col>

      <el-col :sm="8">
        <el-card
          v-loading="expire"
          class="box-card"
          element-loading-text="正在预处理"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <div slot="header">
            <b>模型信息</b>:

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
import { getPolygenOne, putPolygen, deletePolygen } from '@/api/resources'
import { postFile } from '@/api/files'
import { printVector3 } from '@/assets/js/helper'
import SparkMD5 from 'spark-md5'
import { fileMD5, fileCos, fileUpload, fileHas, fileUrl } from '@/assets/js/file.js'

import 'aframe'

import {} from '@/assets/js/aframe-components.js'
export default {
  name: 'PolygenView',
  data: function() {
    return {
      data: null,
      file: null,
      expire: false
    }
  },
  computed: {
    tableData() {
      if (this.data !== null && this.prepare) {
        console.log(JSON.parse(this.data.info))
        return [{
          item: '模型名称',
          text: this.data.name
        }, {
          item: '创建者',
          text: this.data.author.username
        }, {
          item: '创建时间',
          text: this.data.created_at
        }, {
          item: '模型尺寸',
          text: printVector3(JSON.parse(this.data.info).size)
        }, {
          item: '模型中心点',
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
    self.expire = true
    getPolygenOne(self.id).then((response) => {
      self.data = response.data
      self.file = 'url(' + response.data.file.url + ')'
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
      console.log(self.api + '/resources/' + id + '?type=polygen')

      deletePolygen(id).then((response) => {
        self.$router.push({ path: '/polygen/index' })
      }).catch(function(error) {
        console.log(error)
        self.failed(JSON.parse(error.message))
      })
    },
    namedWindow: function() {
      const self = this
      this.$prompt('请输入新名称', '修改模型名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputValue: self.data.name
      }).then(({ value }) => {
        self.named(self.data.id, value)
        this.$message({
          type: 'success',
          message: '新的模型名称: ' + value
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
      const polygen = { name }
      console.log(polygen)
      putPolygen(id, polygen).then((response) => {
        self.data.name = response.data.name
      }).catch(err => {
        console.log(err)
      })
    },
    updatePolygen(imageId, center, size) {
      const self = this
      const info = JSON.stringify({ center, size })
      const polygen = { image_id: imageId, info }
      putPolygen(this.data.id, polygen).then((response) => {
        console.log(response.data)
        this.data.image_id = response.data.image_id
        this.data.info = response.data.info
        console.log(this.dataInfo)
        console.log(self.meshCenter)
        self.expire = false
      })
    },
    saveFile(filename, md5, type, url, center, size) {
      const self = this
      postFile(filename, md5, type, url).then((response) => {
        console.log(response.data)
        self.updatePolygen(response.data.id, center, size)
      })
    },
    infoCallback(center, size) {
      console.log(center)
      console.log(size)
      const self = this
      if (self.prepare) {
        self.expire = false
        return
      }
      this.screenshot().then(function(blob) {
        blob.name = self.data.name
        blob.extension = '.jpg'
        const file = blob

        fileMD5(file, (p) => {}, new SparkMD5()).then(function(md5) {
          const key = md5 + file.extension

          fileCos().then(cos => {
            fileHas(key, cos).then(function(has) {
              if (has) {
                self.saveFile(file.name, md5, file.type, fileUrl(key, cos), center, size)
              } else {
                fileUpload(key, file, (p) => {}, cos
                ).then(data => {
                  self.saveFile(file.name, md5, file.type, fileUrl(key, cos), center, size)
                })
              }
            })
          })
        })
      })
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
