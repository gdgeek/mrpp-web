<template>
  <div>
    <el-tabs type="card">
      <el-tab-pane label="逻辑编辑" name="first" />
      <el-tab-pane label="代码查看" name="second" />
    </el-tabs>
    <div id="blocklyDiv" style="height: 600px; width: 100%" />
  </div>
</template>

<script>
import Blockly from 'blockly'
import toolbox from '@/assets/js/blockly/toolbox'
import { AddBlocks } from '@/assets/js/blockly/blocks'
import 'blockly/lua'
export default {
  name: 'Blockly',
  data() {
    return {
      workspace: null
    }
  },
  mounted() {
    AddBlocks()
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
      zoom: {
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        controls: true,
        wheel: true,
        pinch: true
      }
    })
    console.log(this.workspace)
  },
  methods: {}
}
</script>
