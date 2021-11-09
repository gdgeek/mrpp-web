<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="login-box">
    
    <transition name="page" mode="out-in">
      <router-view name="guest"></router-view>
    </transition>
    <br />

    <div class="login-box-body">
      <div class="site-index">
        <a
          href="/site/#collapseThree"
          data-toggle="collapse"
          data-parent="#accordion"
          ><i class="fa fa-flag"></i> 当前进行工作</a
        >
      </div>

      <div id="collapseThree" class="panel-collapse collapse">
        <div class="panel-body">
          <blockquote class="trello-board-compact">
            <a href="https://trello.com/b/oxFuPkQy/" target="_blank"
              >工作进度看板</a
            >
          </blockquote>
        </div>
      </div>
      <hr />
      <div class="site-index">
        <a href="/static/public/files/BP@MrPP.pdf" target="_blank"><i class="fa fa-money"></i> 平台商业计划书</a>
      </div>
    </div>
    <!-- /.login-box-body -->
    <br/>
    <div class="site-index"><a href="https://bujiaban.com" target="_blank"><i class="fa fa-home"></i> 上海不加班网络科技有限公司</a></div>
    
	  <div class="site-index"><a href="https://beian.miit.gov.cn/" target="_blank"><i class="fa fa-book"></i> 沪ICP备15039333号</a></div>
    
  </div>
  <!-- /.login-box -->
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  name: 'guest-content-wrap',
  script: null,
  beforeCreate () {
    document.querySelector('body').classList.add('login-page')
    this.script = document.createElement('script')
    this.script.type = 'text/javascript'
    this.script.src = 'https://p.trellocdn.com/embed.min.js'
    document.body.appendChild(this.script)
  },
  // 销毁前清除
  beforeDestroy () {
    document.querySelector('body').classList.remove('login-page')
    document.body.removeChild(this.script)
  },
  created () {
  }
}
</script>
