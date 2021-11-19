<template>
  <div class="document-index">
    <el-row :gutter="20" style="margin-left:18px;margin-top:28px;margin-right:18px;">
      <el-col :sm="24">
        <el-alert
          :title="info.title"
          type="warning"
        >{{ info.description }}
          <el-progress style="width:100%" :percentage="50">1213</el-progress>
        </el-alert>
        <br>
      </el-col>

      <el-col :sm="16">
        <el-card class="box-card">
          <div slot="header">
            <font-awesome-icon icon="globe" />
            <b id="title">  模型名称：</b>
          </div>
          <div class="box-item">
            <aside style="margin-top: 15px" />
          </div>
        </el-card>
        <br>
      </el-col>

      <el-col :sm="8">
        <el-card class="box-card">
          <div slot="header">
            <font-awesome-icon icon="globe" />
            <b id="title" />
            <small id="date" class="pull-right" />
          </div>
          <div class="box-item">
            <aside style="margin-top: 15px" />
          </div>
        </el-card>
        <br>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SparkMD5 from 'spark-md5'
import { fileMD5, fileCos, fileUpload, fileHas, fileUrl } from '../../assets/js/file.js'
import 'aframe'
import Vue from 'vue'
import {} from '../../assets/js/aframe-components.js'
export default {
  name: 'PolygenView',
  data: function() {
    return {
      data: null,
      info: { class: 'info-box', icon: 'fa fa-cog fa-spin', title: '载入模型', description: '从服务器获得模型数据' },
      extent: { min: 0, max: 1 },
      model: null,
      step: 0,
      infobar: true
    }
  },
  computed: {

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
    self.info = { class: 'info-box bg-yellow', icon: 'fa fa-download', title: '获取信息', description: '从服务器下载模型数据信息' }
    self.extent = { min: 0, max: 0.1 }
    self.step = 0
    this.loadPolygen().then((data) => {
      self.data = data
      self.model = 'url(' + data.file.url + ')'
      if (self.prepare) {
        self.info = { class: 'info-box bg-yellow', icon: 'fa fa-download', title: '获取模型', description: '从服务器下载模型文件' }
        self.extent = { min: 0.1, max: 1 }
        self.step = 0
      } else {
        self.info = { class: 'info-box bg-yellow', icon: 'fa fa-cog fa-spin', title: '预处理', description: '从服务器下载模型文件' }
        self.extent = { min: 0.1, max: 0.2 }
        self.step = 0
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
      console.log(self.api + '/resources/' + id + '?type=polygen')
      Vue.axios.delete(self.api + '/resources/' + id + '?type=polygen').then((response) => {
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
      Vue.axios.put(this.api + '/resources/' + id, polygen)
        .then((response) => {
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
    updatePolygen(imageId, center, size) {
      const self = this
      self.info = { class: 'info-box bg-yellow', icon: 'fa fa-cog fa-spin', title: '预处理', description: '更新模型的相关信息' }
      self.extent = { min: 0.9, max: 1 }
      self.step = 0
      const info = JSON.stringify({ center, size })
      console.log(info)
      const polygen = { image_id: imageId, info }
      console.log(polygen)
      Vue.axios.put(this.api + '/resources/' + this.data.id, polygen)
        .then((response) => {
          self.info = { class: 'info-box bg-green', icon: 'fa fa-info', title: '处理完成', step: '渲染成功', description: '展示模型文件' }
          self.extent = { min: 0.9, max: 1 }
          self.step = 1
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
      self.info = { class: 'info-box bg-yellow', icon: 'fa fa-cog fa-spin', title: '预处理', description: '更新缩略图文件的相关信息' }
      self.extent = { min: 0.8, max: 0.9 }
      self.step = 0
      const file = { filename, md5, type, url }
      Vue.axios.post(this.api + '/files', file)
        .then((response) => {
          self.step = 0.5
          console.log(response.data)
          self.updatePolygen(response.data.id, center, size)
        }).catch(err => {
          console.log(err)
        })
    },
    infoCallback(center, size) {
      console.log(center)
      console.log(size)
      const self = this
      if (self.prepare) {
        self.info = { class: 'info-box bg-green', icon: 'fa fa-info', title: '处理完成', step: '渲染成功', description: '展示模型文件' }
        self.extent = { min: 0, max: 1 }
        self.step = 1
        return
      } else {
        self.info = { class: 'info-box bg-yellow', icon: 'fa fa-cog fa-spin', title: '预处理', description: '计算模型信息并更新' }
        self.extent = { min: 0.2, max: 0.3 }
        self.step = 0
      }
      this.screenshot().then(function(blob) {
        blob.name = self.data.name
        blob.extension = '.jpg'
        const file = blob
        self.info = { class: 'info-box bg-yellow', icon: 'fa fa-cog fa-spin', title: '预处理', description: '将渲染好的缩略图计算MD5' }
        self.extent = { min: 0.3, max: 0.4 }
        self.step = 0
        fileMD5(file, self.progress, new SparkMD5()).then(function(md5) {
          const key = md5 + file.extension
          self.info = { class: 'info-box bg-yellow', icon: 'fa fa-cog fa-spin', title: '预处理', description: '获取储存服务器信息' }
          self.extent = { min: 0.4, max: 0.5 }
          self.step = 0
          fileCos().then(cos => {
            self.info = { class: 'info-box bg-yellow', icon: 'fa fa-cog fa-spin', title: '预处理', description: '上传缩略图文件到服务器' }
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
    },
    loadPolygen() {
      return new Promise((resolve, reject) => {
        /*
        Vue.axios.get(this.api + '/resources/' + self.id + '?expand=image,file,author')
          .then((response) => {
            console.log(response.data)
            self.data = response.data
            resolve(response.data)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        //
        */
      })
    }
  }
}
</script>
