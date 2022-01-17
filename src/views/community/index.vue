<template>
  <div class="document-index">
    <div style="height: 300px;">
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import request from '@/utils/request'
export default {
  name: 'DocumentIndex',
  data() {
    return {
      title: '标题',
      content: '载入中....',
      date: 'Date: 2/10/2014'
    }
  },
  computed: {
    ...mapState({
      document: state => state.document.index
    })
  },
  created: function() {
    // (this.$can('create', 'Post'))
    request({
      url: this.document + 'posts/999',
      method: 'get'
    }).then(response => {
      this.title = response.data.title.rendered
      this.content = response.data.content.rendered
      this.date = response.data.date
    })
  },
  methods: {
    ...mapMutations(['setTitle', 'setSubTitle', 'setBreadcrumbs'])
  }
}
</script>

