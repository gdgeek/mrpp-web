<template>
  <div class="project-index">
    <br>
    <el-container>
      <el-header>

        <el-card class="box-card">
          <el-row :gutter="0">
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">

              <el-button-group :inline="true">
                <router-link to="/polygen/upload">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-upload"
                  ><span class="hidden-sm-and-down">上传模型</span></el-button>
                </router-link>
              </el-button-group>
&nbsp;
              <el-button-group :inline="true">
                <el-button
                  size="mini"
                  type="info"
                  icon="el-icon-chat-dot-square"
                ><span class="hidden-sm-and-down">名称排序</span></el-button>
                <el-button
                  size="mini"
                  type="info"
                  icon="el-icon-time"
                ><span class="hidden-sm-and-down">时间排序</span></el-button>
              </el-button-group>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-input
                size="mini"
                placeholder="搜索名称"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  size="mini"
                />
              </el-input>
            </el-col>
          </el-row>
        </el-card></el-header>
      <el-main>
        <el-row :gutter="10">
          <el-col
            v-for="(item, index) in items"
            :key="index"
            :data="item"
            :xs="12"
            :sm="12"
            :md="6"
            :lg="6"
            :xl="4"
          >
            <mr-p-p-card :item="item" />

            <br>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>

        <el-card class="box-card">
          <el-pagination layout="prev, pager, next" :total="50" />
        </el-card>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import { getPolygen } from '@/api/resources'
import MrPPCard from '@/components/MrPP/MrPPCard'
export default {
  components: {
    MrPPCard
  },
  data() {
    return {
      items: null,
      sort: 'created_at',
      search: '',
      pagination: { current: 1, count: 1, size: 20, total: 20 }
    }
  },

  created: function() {
    this.refresh()
  },
  methods: {
    succeed: function(data) {
      console.log(data)
      this.items = data
    },
    failed: function() {
      console.log('failed')
    },
    refresh() {
      const self = this
      getPolygen(self.sort, self.search, self.pagination.current)
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
          } else {
            self.failed('没有数据返回')
          }
        }).catch(function(error) {
          console.log(error)
          self.failed(JSON.parse(error.message))
        })
    }
  }
}
</script>
