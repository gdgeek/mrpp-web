<template>
  <div class="verse-index">
    <el-container>

      <el-main>
        <el-card class="box-card">
          <div v-if="data !== null" slot="header" class="clearfix">
            项目名称：{{ data.name }}
            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="arrange()"><font-awesome-icon icon="project-diagram" />  整理 </el-button>
              <el-button type="primary" size="mini" @click="save()"><font-awesome-icon icon="save" />  保存 </el-button>
            </el-button-group>
          </div>
          <Rete ref="rete" class="rete" />
        </el-card>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import Rete from '../../components/Rete.vue'

import { getVerse } from '@/api/v1/verse'
export default {
  name: 'App',
  components: {
    Rete
  },
  data() {
    return {
      data: null
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    const self = this
    getVerse(this.id).then(response => {
      console.log(response)
      self.data = response.data
    })
  },
  methods: {
    save() {
      const self = this
      this.$refs.rete.$emit('save', self.id)
    },
    arrange() {
      this.$refs.rete.$emit('arrange')
    }
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
