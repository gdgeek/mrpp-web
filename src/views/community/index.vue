<template>
  <div id="CommuityIndex">
    <el-container>

      <br>
      <el-header>
        <el-card class="box-card">
          <el-row :gutter="0">
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <slot />
              &nbsp;
              1</el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" />
          </el-row>
        </el-card>

      </el-header>
      <el-main>
        <el-card class="box-card">
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              prop="date"
              label="日期"
              width="180"
            />
            <el-table-column
              prop="name"
              label="姓名"
              width="180"
            />
            <el-table-column
              prop="address"
              label="地址"
            />
          </el-table>
        </el-card>

      </el-main>
    </el-container>
    <mr-p-p-editor />

  </div>
</template>

<script>
import MrPPEditor from '@/components/MrPP/MrPPEditor.vue'
/*
import FroalaEditor from 'froala-editor'
FroalaEditor.DefineIcon('alert', { NAME: 'info', SVG_KEY: 'help' })
FroalaEditor.RegisterCommand('alert', {
  title: 'Hello',
  focus: false,
  undo: false,
  refreshAfterCallback: false,
  callback: function() {
    alert('Hello!')
  }
})*/
export default {
  name: 'CommuityIndex',
  components: {
    MrPPEditor
  },
  data() {
    return {

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],

      config: {
        attribution: false,
        language: 'zh_cn',
        //  toolbarButtons: [['bold',''], ['undo', 'redo', 'bold'], ['alert', 'clear', 'insert']],
        events: {
          initialized: function() {
            console.log('initialized')
          }
        }
      },
      model: 'Edit Your Content Here!'
    }
  }
}
</script>
