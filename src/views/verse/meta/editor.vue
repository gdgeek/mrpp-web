<template>
  <div class="verse-index">
    <el-container>

      <el-main>
        <el-card class="box-card">
          <div v-if="meta !== null" slot="header" class="clearfix">
            元数据名称：{{ metaName }}
            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="arrange()"><font-awesome-icon icon="project-diagram" />  整理 </el-button>
              <el-button type="primary" size="mini" @click="save()"><font-awesome-icon icon="save" />  保存 </el-button>
            </el-button-group>
          </div>
          <rete-meta ref="rete" class="rete" :meta-id="id" />
        </el-card>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import ReteMeta from '@/components/Rete/ReteMeta.vue'

import { mapState, mapMutations } from 'vuex'
import { getMeta } from '@/api/v1/meta'
import { getPolygen, getPicture, getVideo } from '@/api/resources'
export default {
  name: 'MetaEditor',
  components: {
    ReteMeta
  },
  data() {
    return {
      meta: null
    }
  },
  computed: {
    ...mapState({
      metaName: state => state.meta.name
    }),
    id() {
      return this.$route.query.id
    }
  },
  created() {
    const self = this
    getPolygen().then(response => {
      console.log(response.data)
      // self.putPolygen(response.data)
    })
    getPicture().then(response => {
      // self.putPolygen(response.data)
      console.log(response.data)
    })
    getVideo().then(response => {
      console.log(response.data)
      // self.putPolygen(response.data)
    })
    getMeta(this.id).then(response => {
      self.meta = response.data
      self.putMetaName(response.data.name)
      if (self.meta.metaRetes != null && self.meta.metaRetes.length > 0) {
        // self.load(response.data.verseRetes[0].data)
      } else {
        // self.data.verseRetes = [self.createRete(self.data.id)]
      }
    })
  },
  methods: {
    ...mapMutations([
      'putMetaName',
      'putPolygens'
    ]),
    createRete(verseId) {
      this.$refs.rete.createRete(verseId)// $emit('load', data)
    },
    load(data) {
      this.$refs.rete.load(data)// $emit('load', data)
    },
    save() {
      const self = this
      this.$refs.rete.save(self.data.metaRetes[0].id, self.id)// .$emit('save', self.id)
    },
    arrange() {
      this.$refs.rete.arrange()// .$emit('arrange')
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
