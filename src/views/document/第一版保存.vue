<template>
  <div class="test">
    <el-header style="text-align: right; font-size: 12px">搜索</el-header>
    <el-container
      style="height: 500px; border: 1px solid #eee; padding-left: 8px"
    >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><h4>介绍</h4></template>
            <el-menu-item-group>
              <template slot="title">开启旅程</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="初次使用">
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><h4>开发</h4></template>
            <el-menu-item-group>
              <template slot="title">进阶</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="示例">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><h4>帮助</h4></template>
            <el-menu-item-group>
              <template slot="title">支持</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="常见问题">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
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
  created: function() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-header {
  // 简单样式
  line-height: 60px;
  background: #cadbe2;
  // 复杂样式
  // line-height: 60px;
  // background: rgb(44, 210, 176);
  // background: linear-gradient(
  //   101deg,
  //   rgba(59, 219, 187, 0.776) 0%,
  //   rgba(34, 184, 214, 0.807) 66%
  // );
}

.el-aside {
  color: #333;
}
</style>
