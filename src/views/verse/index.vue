<template>
  <div class="verse-index">
    <mr-p-p-verse-window ref="createdDialog" dialog-title="创建宇宙" dialog-submit="创 建" @submit="(form, item, imageId) =>submitCreate(form, imageId)" />
    <mr-p-p-verse-window ref="changedDialog" dialog-title="修改数据" dialog-submit="修 改" @submit="submitChange" />
    <mr-p-p-verse-qrcode ref="qrcode" />

    <br>
    <el-container>
      <el-header>
        <mr-p-p-header :sorted="sorted" :searched="searched" @search="search" @sort="sort">
          <el-button-group :inline="true">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-office-building"
              @click="createWindow()"
            ><span class="hidden-sm-and-down">创建宇宙</span></el-button>

          </el-button-group>
        </mr-p-p-header>
      </el-header>
      <el-main>
        <el-row :gutter="10">
          <el-col
            v-for="(item, index) in items"
            :key="index"
            :data="item"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
          >
            <mr-p-p-verse-card :item="item">
              <el-table
                v-if="item.info !== null"
                slot="info"
                :data="infoTable(item)"
                stripe
                style="width: 100%"
                size="mini"
              >

                <el-table-column
                  prop="value"
                  label=""
                />
              </el-table>

              <router-link slot="enter" :to="'/verse/editor?id='+item.id">
                <el-button type="primary" size="mini">编辑</el-button>
              </router-link>

              <el-button-group slot="buttons" style="float: right" :inline="true">
                <el-button
                  type="plain"
                  size="mini"
                  @click="qrcode(item.id)"
                >
                  <font-awesome-icon icon="qrcode" /></el-button>
                <el-button
                  type="plain"
                  size="mini"
                  icon="el-icon-edit"
                  @click="changedWindow(item)"
                />
                <el-button
                  type="plain"
                  size="mini"
                  icon="el-icon-delete"
                  @click="deletedWindow(item)"
                />
              &nbsp;
              </el-button-group>
            </mr-p-p-verse-card>
            <br>

          </el-col>
        </el-row>
      </el-main>
      <el-footer>

        <el-card class="box-card">
          <el-pagination
            :current-page="pagination.current"
            :page-count="pagination.count"
            :page-size="pagination.size"
            :total="pagination.total"
            layout="prev, pager, next, jumper"
            background
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-footer>

    </el-container>
    <br>
  </div>
</template>

<script>

import 'element-ui/lib/theme-chalk/index.css'
import { getVerses, postVerse, putVerse, deleteVerse } from '@/api/v1/verse'
import MrPPVerseCard from '@/components/MrPP/MrPPVerseCard'
import MrPPVerseQrcode from '@/components/MrPP/MrPPQRCodeVerse.vue'
import MrPPHeader from '@/components/MrPP/MrPPHeader'
import MrPPVerseWindow from '@/components/MrPP/MrPPVerseWindow/index.vue'
export default {
  name: 'VerseEditor',
  components: {
    MrPPVerseCard,
    MrPPHeader,
    MrPPVerseWindow,
    MrPPVerseQrcode
  },
  data() {
    return {
      dialogVisible: false,
      items: null,
      sorted: '-created_at',
      searched: '',
      pagination: { current: 1, count: 1, size: 20, total: 20 }
    }
  },
  computed: {
    dialogTitle() {
      return ''
    }
  },
  created: function() {
    this.refresh()
  },

  methods: {
    createWindow() {
      this.$refs.createdDialog.$emit('show')
    },
    changedDialog(item) {
      this.$refs.changedDialog.$emit('show', item)
    },
    infoTable(item) {
      const table = []
      const info = JSON.parse(item.info)
      if (info !== null) {
        table.push({
          value: '内容说明：' + info.description
        })
      }
      return table
    },
    submitChange(form, item, imageId) {
      const self = this
      const json = { description: form.desc }
      const data = { name: form.name, info: JSON.stringify(json), image_id: imageId }
      putVerse(item.id, data).then((response) => {
        self.refresh()
        this.$refs.changedDialog.$emit('hide')
      })
    },
    submitCreate(form, imageId) {
      const self = this
      const json = { description: form.desc }
      const data = { name: form.name, info: JSON.stringify(json), image_id: imageId }
      postVerse(data).then((response) => {
        console.log(response.data.id)
        self.$router.push({ path: '/verse/editor', query: { id: response.data.id }})
      })
    },
    handleCurrentChange: function(page) {
      this.pagination.current = page
      this.refresh()
      console.log(this.pagination.current)
    },
    changedWindow: function(item) {
      this.$refs.changedDialog.$emit('show', item)

      // qrcode
    },
    sort: function(value) {
      this.sorted = value
      this.refresh()
    },
    search: function(value) {
      this.searched = value
      this.refresh()
    },
    qrcode: function(id) {
      this.$refs.qrcode.$emit('open', id)
    },
    named: function(id, newValue) {
      const self = this
      const verse = { name: newValue }
      putVerse(id, verse).then((response) => {
        self.refresh()
      }).catch(err => {
        console.log(err)
      })
    },
    deletedWindow: function(item) {
      const self = this
      this.$confirm('此操作将永久销毁此宇宙, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        self.deleted(item.id)
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
    deleted: function(id) {
      const self = this

      deleteVerse(id).then((response) => {
        self.refresh()
      }).catch(function(error) {
        console.log(error)
      })
    },
    succeed: function(data) {
      console.log(data)
      this.items = data
    },
    refresh() {
      const self = this
      getVerses(self.sorted, self.searched, self.pagination.current)
        .then((response) => {
          console.log(response.headers)
          self.pagination = {
            current: parseInt(response.headers['x-pagination-current-page']),
            count: parseInt(response.headers['x-pagination-page-count']),
            size: parseInt(response.headers['x-pagination-per-page']),
            total: parseInt(response.headers['x-pagination-total-count'])
          }

          if (response.data) {
            self.succeed(response.data)
          }
        }).catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>
