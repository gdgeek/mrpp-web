<template>
  <div class="container">
    <div class="main">
      <div class="title">
        <h4>混合现实编程平台</h4>
      </div>
      <!-- 手写开始 -->
      <div class="box">
        <div class="sub-title">Mixed Reality Programming Platform</div>
        <slot></slot>
      </div>
      <!-- 手写结束 -->

      <div class="box">增加内容</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>



<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.container {
  min-height: 100%;
  width: 100%;
  background-color: #d3d6de;
  overflow: hidden;
 
  .main {
    position: relative;
    width: 500px;
    max-width: 100%;
    padding: 80px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .box {
    position: relative;
    height: 100%;
    width: 500;
    max-width: 100%;
    padding: 10px 10px 10px 10px;
    margin: 0 auto;
    margin-bottom: 30px;
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
}
</style>
