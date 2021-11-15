<template>
  <div class="container">
    <div class="main">
      <div class="title">
        <h4>混合现实编程平台</h4>
      </div>
      <!-- box start-->
      <div class="box">
        <div class="sub-title">Mixed Reality Programming Platform</div>
        <slot />
      </div>
      <!-- box end -->
      <!-- footer start -->
      <div class="footer">
        <div class="foot-summary linkcolor">
          <el-link
            href="https://trello.com/b/oxFuPkQy/"
            target="_blank"
            type="primary"
            :underline="false"
          ><i class="el-icon-s-flag" /> 当前进行工作 </el-link>
        </div>
        <hr>
        <div class="foot-summary linkcolor">
          <el-link type="primary" :underline="false"><i class="el-icon-picture" /> 平台商业计划书 </el-link>
        </div>
      </div>
      <div class="foot-tips linkcolor">
        <el-link href="https://bujiaban.com" target="_blank" :underline="false"><i class="el-icon-s-home" /> 上海不加班网络科技有限公司 </el-link>
        <br>
        <el-link href="https://beian.miit.gov.cn/" target="_blank" :underline="false"><i class="el-icon-s-order" /> 沪ICP备15039333号 </el-link>
      </div>
      <br>
      <!-- footer end -->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.linkcolor a{ color: rgb(28, 160, 212);}

.container {
  min-height: 100%;
  width: 100%;
  background-color: #d3d6de;
  overflow: hidden;

  .main {
    position: relative;
    width: 500px;
    max-width: 100%;
    padding: 70px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .box {
    position: relative;
    height: 100%;
    width: 500px;
    max-width: 100%;
    padding: 10px 10px 10px 10px;
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 3px;
    background-color: #fff;
    overflow: hidden;
  }
  .title {
    font-size: 35px;
    color: #444444;
    margin: 12px auto 30px auto;
    text-align: center;
    font-weight: bold;

  }
  .sub-title {
    font-size: 14px;
    padding: 10px 10px 10px 10px;
    text-align: center;
    color: #666;
  }
  .footer {
    height: 100%;
    padding: 10px 10px 10px 10px;
    border-radius: 3px;
    background-color: #fff;
    overflow: hidden;
  }
  .foot-summary {
    height: 46px;
    padding: 12px 10px;
  }
  .foot-tips {
    margin: 30px 0 70px 0;
    overflow: hidden;
  }
}
</style>
