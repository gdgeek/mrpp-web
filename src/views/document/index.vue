<template>
  <div>
    <!-- 试下这个布局 -->

    <!-- 布局记录 -->
    <el-container>
      <!--
      <el-header class="guide-header">
        <el-input
          v-model="input"
          size="mini"
          style="width:220px"
          placeholder="搜索名称"
          class="input-with-select"
          @keyup.enter.native="keyDown"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            size="mini"
            @click="search"
          />
        </el-input>
      </el-header> -->
      <el-container>
        <!-- 1 -->
        <!-- 1 end -->
        <el-aside width="180px" class="guide-sidebar">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title">
                <span class="sidebar-title">
                  <i class="el-icon-s-promotion" />
                  介绍
                </span>
              </template>
              <el-menu-item-group>
                <template slot="title">1-1</template>
                <el-menu-item index="1-1">来探险吧</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="1-2">
                <el-menu-item index="1-2">开启旅程</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 第一组结束 -->
            <el-submenu index="2">
              <template slot="title">
                <span class="sidebar-title">
                  <i class="el-icon-s-platform" />
                  开发
                </span>
              </template>
              <el-menu-item-group>
                <template slot="title">2-1</template>
                <el-menu-item index="2-1">创作进阶</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="2-2">
                <el-menu-item index="2-2">工程示例</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 第二组结束 -->
            <el-submenu index="3">
              <template slot="title">
                <span class="sidebar-title">
                  <i class="el-icon-s-help" />
                  帮助
                </span>
              </template>
              <el-menu-item-group>
                <template slot="title">3-1</template>
                <el-menu-item index="3-1">支持</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="3- 2">
                <el-menu-item index="3-2">常见问题</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="guide-main">Main</el-main>
      </el-container>
    </el-container>
    <!-- 布局结束 -->
  </div>
</template>

<script>
export default {
  name: 'DocumentIndex',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },
  computed: {},
  created: function () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.guide-header {
  // 简单样式
  position: fixed;
  z-index: 2;
  width: 100%;
  text-align: right;
  padding-right: 14em;
  line-height: 60px;
  background: #cadbe2;
}

.guide-sidebar {
  position: fixed;
  z-index: 1;
  overflow-x: hidden !important;
  overflow-y: scroll;
  height: 100%;
  padding: 50px 0;
  color: #333;
  // background-color: rgb(238, 241, 246);

  .sidebar-title {
    padding-left: 14px;
    font-weight: 600;
    line-height: 0px;
  }
}
.guide-main {
  margin-top: 70px;
  margin-left: 200px;
}
</style>
