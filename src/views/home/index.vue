<template>
  <div class="document-index">

    <el-container>
      <el-header>
        <br>

      </el-header>

      <el-main>
        <br>
        <el-card class="box-card">
          <div slot="header">
            <font-awesome-icon icon="globe" />
            <b id="title"> {{ title }}</b>

          </div>
          <div class="box-item">
            <aside style="margin-top: 15px">
              <p
                id="content"
                class="text-muted well well-sm no-shadow"
                style="margin: 20px"
                v-html="content"
              />
            </aside>
          </div>
        </el-card>

      </el-main>
      <el-footer>
        <small id="date" class="pull-right">{{ date }}</small>
      </el-footer>
    </el-container>
    <el-row :gutter="24" /></div>
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

