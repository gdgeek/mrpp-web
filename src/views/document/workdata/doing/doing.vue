<template>
  <!-- 升级 el-submenu  包裹 el-menu-item-group   并级el-menu-item -->
  <el-menu>
    <el-menu-item index="2">
      <i class="el-icon-menu" />
      <span slot="title">导航</span>
    </el-menu-item>

    <el-submenu index="1">
      <template slot="title">
        <span>导航不变</span>
      </template>

      <el-menu-item-group class="fristfor">
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>

    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <span>导航不变</span>
      </template>

      <el-menu-item-group class="fristfor">
        <template slot="title">分组二</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>

    </el-submenu>
    <!-- 被搞晕了 -->

  </el-menu>
</template>

<script>
export default {
  name: 'Doing'
}
</script>

<style>

</style>
