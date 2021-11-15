<template>
  <div class="document-index">
    <!-- Main content -->
    <section class="invoice">
      <!-- title row -->
      <div class="row">
        <div class="col-xs-12">
          <h2 class="page-header">
            <i class="fa fa-globe"></i> <b id="title">{{title}} </b><small class="pull-right" id="date">{{date}}</small>
           
          </h2>
        </div>
        <!-- /.col -->
      </div>
      <!-- info row -->
      <div class="row invoice-info">
        <p v-html='content' class="text-muted well well-sm no-shadow" id="content" style="margin: 20px;"></p>
      </div>
      <!-- /.row -->
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DocumentIndex',
  data () {
    return {
      title: '标题',
      content: '载入中....',
      date: 'Date: 2/10/2014'
    }
  },
  computed: {
    ...mapState({
      document: state => state.api.document
    })
  },
  created: function () {
    this.setTitle('欢迎页面')
    this.setBreadcrumbs(['文档', '欢迎页面'])
    Vue.axios.get(this.document + 'posts/872')
      .then((response) => {
        this.title = response.data.title.rendered
        this.content = response.data.content.rendered
        this.date = response.data.date
      })
  },
  methods: {
    ...mapMutations([
      'setTitle',
      'setSubTitle',
      'setBreadcrumbs'
    ])
  }
}
</script>
