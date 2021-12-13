<template>
  <div class="verse-index">
    <mr-p-p-verse-window ref="createdDialog" dialog-title="创建宇宙" dialog-submit="创 建" @submit="(form, item) =>submitCreate(form)" />
    <mr-p-p-verse-window ref="changedDialog" dialog-title="修改数据" dialog-submit="修 改" @submit="submitChange" />

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
            <mr-p-p-card :item="item" @named="changedWindow" @deleted="deletedWindow">
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

              <router-link slot="enter" :to="'/verse/edit?id='+item.id">
                <el-button type="primary" size="mini">编辑</el-button>
              </router-link>
            </mr-p-p-card>
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
import 'element-ui/lib/theme-chalk/display.css'
import { getVerses, postVerse, putVerse, deleteVerse } from '@/api/v1/verse'
import MrPPCard from '@/components/MrPP/MrPPCard'
import MrPPHeader from '@/components/MrPP/MrPPHeader'
import MrPPVerseWindow from '@/components/MrPP/MrPPVerseWindow'
export default {
  components: {
    MrPPCard,
    MrPPHeader,
    MrPPVerseWindow
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
    createForm(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const json = { description: self.form.desc }
          const data = { name: self.form.name, info: JSON.stringify(json) }
          postVerse(data).then((response) => {
            console.log(response.data.id)
            self.refresh()
            // self.$router.push({ path: '/verse/edit', query: { id: response.data.id }})
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitChange(form, item) {
      const self = this
      const json = { description: form.desc }
      const data = { name: form.name, info: JSON.stringify(json) }
      putVerse(item.id, data).then((response) => {
        self.refresh()
        this.$refs.changedDialog.$emit('hide')
      })
    },
    submitCreate(form) {
      const self = this
      const json = { description: form.desc }
      const data = { name: form.name, info: JSON.stringify(json) }
      postVerse(data).then((response) => {
        console.log(response.data.id)
        self.$router.push({ path: '/verse/edit', query: { id: response.data.id }})
      })
    },

    changeForm(id, formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const json = { description: self.form.desc }
          const data = { name: self.form.name, info: JSON.stringify(json) }
          putVerse(id, data).then((response) => {
            console.log(response.data.id)
            self.$router.push({ path: '/verse/edit', query: { id: response.data.id }})
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCurrentChange: function(page) {
      this.pagination.current = page
      this.refresh()
      console.log(this.pagination.current)
    },
    changedWindow: function(item) {
      this.$refs.changedDialog.$emit('show', item)
    },
    sort: function(value) {
      this.sorted = value
      this.refresh()
    },
    search: function(value) {
      this.searched = value
      this.refresh()
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
