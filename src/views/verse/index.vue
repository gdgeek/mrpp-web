<template>
  <div class="verse-index">
    <el-dialog
      title="创建小宇宙"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item prop="name" label="名称">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="内容说明">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">创 建</el-button>
      </span>
    </el-dialog>
    <br>
    <el-container>
      <el-header>
        <mr-p-p-header :sorted="sorted" :searched="searched" @search="search" @sort="sort">
          <el-button-group :inline="true">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-office-building"
              @click="dialogVisible = true"
            ><span class="hidden-sm-and-down">创建小宇宙</span></el-button>

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
            <mr-p-p-card :item="item" @named="namedWindow" @deleted="deletedWindow">
              <router-link slot="router1" :to="'/verse/edit?id='+item.id">
                <el-button type="warning" size="mini">初始化</el-button>
              </router-link>
              <router-link slot="router2" :to="'/verse/edit?id='+item.id">
                <el-button type="primary" size="mini">编辑/el-button>
                </el-button></router-link>
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
export default {
  components: {
    MrPPCard,
    MrPPHeader
  },
  data() {
    return {
      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      items: null,
      sorted: 'created_at',
      searched: '',
      pagination: { current: 1, count: 1, size: 20, total: 20 }
    }
  },

  created: function() {
    this.refresh()
  },

  methods: {
    submitForm(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const json = { description: self.form.desc }
          const data = { name: self.form.name, info: JSON.stringify(json) }
          postVerse(data).then((response) => {
            console.log(response.data.id)
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
    namedWindow: function(item) {
      const self = this
      this.$prompt('请输入新名称', '修改宇宙名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputValue: item.name
      }).then(({ value }) => {
        self.named(item.id, value)
        this.$message({
          type: 'success',
          message: '新的宇宙名称: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
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
