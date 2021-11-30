<template>
  <div class="document-index">
    <el-row :gutter="20" style="margin-left:18px;margin-top:28px;margin-right:18px;">

      <el-col :sm="16">
        <el-card class="box-card">
          <div slot="header">
            <b id="title">  图片名称：</b> <span v-if="data">{{ data.name }}</span>
          </div>
          <div class="box-item" style="text-align:center">
            <el-image
              id="image"
              style="height: 300px;width:100%;"
              :src="picture"
              :fit="'contain'"
              @load="dealWith()"
            />

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
import { printVector2 } from '@/assets/js/helper'
import SparkMD5 from 'spark-md5'
import { fileMD5, fileCos, fileUpload, fileHas, fileUrl } from '@/assets/js/file.js'

export default {
  name: 'PictureView',
  data: function() {
    return {
      data: null,
      picture: null
    }
  },
  computed: {
    tableData() {
      if (this.data !== null && this.prepare) {
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
          text: printVector2(JSON.parse(this.data.info).size)
        }
        ]
      } else {
        return [
        ]
      }
    },
    id() {
      return this.$route.query.id
    },
    prepare() {
      return this.data != null && this.data.info !== null
    }
  },
  created: function() {
    const self = this
    getPictureOne(self.id).then((response) => {
      self.data = response.data
      console.log(response.data)
      self.picture = response.data.file.url
    })
  },
  methods: {
    getImageSize: function(imageEl) {
      var i = new Image() // 新建一个图片对象
      i.src = imageEl.src // 将图片的src属性赋值给新建图片对象的src
      console.log(i.src)
      return { 'x': i.width, 'y': i.height } // 返回图片的长宽像素
    },
    thumbnail: function(image, width, height) {
      return new Promise((resolve, reject) => {
        const image_type = 'image/jpeg'
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(image, 0, 0, width, height)
        canvas.toBlob(function(blob) {
          resolve(blob)
        }, image_type)
      })
    },
    save(file, md5, url, info) {
      const self = this
      postFile(file.name, md5, file.type, url).then((response) => {
        const picture = { image_id: response.data.id, info }
        putPicture(self.data.id, picture).then((response) => {
          self.data.image_id = response.data.image_id
          self.data.info = response.data.info
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    setup(size, image) {
      const self = this
      if (size.x !== 0) {
        const info = JSON.stringify({ size })
        if (size.x <= 1024) {
          const picture = { image_id: self.data.file.id, info }
          putPicture(self.data.id, picture).then((response) => {
            self.data.image_id = response.data.image_id
            self.data.info = response.data.info
          })
          return
        }
        self.thumbnail(image, 512, size.y * (512 / size.x)).then((blob) => {
          blob.name = self.data.name + '.thumbnail'
          blob.extension = '.jpg'
          const file = blob
          fileMD5(file, (p) => {}, new SparkMD5()).then(function(md5) {
            const key = md5 + file.extension
            fileCos().then(cos => {
              fileHas(key, cos).then(function(has) {
                if (has) {
                  self.save(file, md5, fileUrl(key, cos), info)
                } else {
                  fileUpload(key, file, (p) => {}, cos)
                    .then(data => {
                      self.save(file, md5, fileUrl(key, cos), info)
                    })
                }
              })
            })
          })
        })
      }
    },
    dealWith: function() {
      const self = this
      if (!self.prepare) {
        console.log(1)

        // alert(this.prepare)
        const image = document.getElementById('image')
        image.crossOrigin = 'anonymous'
        const size = this.getImageSize(image)

        console.log(size)
        console.log(image.complete)
        if (image.complete) {
          const size = this.getImageSize(image)
          console.log(size)
          if (size.x !== 0) {
            self.setup(size, image)
          } else {
            const id = setInterval(() => {
              const size = this.getImageSize(image)
              console.log(size)
              if (size.x !== 0) {
                self.setup(size, image)
                clearInterval(id)
              }
            }, 100)
          }
        }
      }
    },
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
