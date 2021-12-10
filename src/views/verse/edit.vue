<template>
  <div class="verse-index">
    <br>
    <el-container>
      <el-header>
        <el-card class="box-card">
          12
        </el-card>
      </el-header>
      <el-main style="width:100%">
        <el-card class="box-card">
          <Rete class="rete" /> </el-card>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import Rete from '../../components/Rete.vue'

export default {
  name: 'App',
  components: {
    Rete
  }
}
</script>

<style lang="scss" scoped>

.content{
		width:100%;
	}
.rete{
    max-width:91vw;
		min-height:calc(73vh);
		max-height:calc(73vh);
	}
#rete{
		border-style:solid;
		border-width:1px;
	}
</style>
