<template>
  <div class="verse-code">
    <el-container>
      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div slot="header" class="clearfix">
            <router-link :to="'/verse/editor?id=' + id">
              <el-link :underline="false">【宇宙】</el-link>
            </router-link>
            / 【逻辑】
            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="save()">
                <font-awesome-icon icon="save" />
                保存
              </el-button>
            </el-button-group>
          </div>

          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="逻辑编辑" name="first" />
            <el-tab-pane label="代码查看" name="second" />
          </el-tabs>

          <div id="blocklyDiv" style="height: 600px; width: 100%" />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Blockly from 'blockly'
import toolbox from '@/assets/js/blockly/toolbox'
import 'blockly/lua'
export default {
  name: 'VerseCode',
  data() {
    return {
      loading: false,
      workspace: null
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.query.id)
    }
  },
  mounted() {
    
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: toolbox,
      grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
      move: {
        scrollbars: {
          horizontal: false,
          vertical: true
        },
        drag: true,
        wheel: false
      },
      zoom: { startScale: 1.0, maxScale: 3, minScale: 0.3, controls: true, wheel: true, pinch: true }
    })
    console.log(this.workspace)
  },
  methods: {}
}
</script>
