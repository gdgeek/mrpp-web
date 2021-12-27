<template>
  <div class="verse-index">
    <el-container>

      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="meta !== null" slot="header" class="clearfix">
            <router-link :to="'/verse/editor?id='+meta.verse.id">
              <el-link :underline="false"> 【宇宙】{{ meta.verse.name }}</el-link>
            </router-link>
            / 【元】{{ metaName }}
            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="arrange()"><font-awesome-icon icon="project-diagram" />  整理 </el-button>
              <el-button type="primary" size="mini" @click="save()"><font-awesome-icon icon="save" />  保存 </el-button>
            </el-button-group>
          </div>
          <rete-meta ref="rete" class="rete" />
        </el-card>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import ReteMeta from '@/components/Rete/ReteMeta.vue'

import { mapState, mapMutations, mapActions } from 'vuex'
import { getMeta } from '@/api/v1/meta'
import { getPolygen, getPicture, getVideo } from '@/api/resources'
export default {
  name: 'MetaEditor',
  components: {
    ReteMeta
  },
  data() {
    return {
      meta: null,
      loading: true
    }
  },
  computed: {
    ...mapState({
      metaName: state => state.meta.data.name,
      reteId: state => state.meta.data.reteId,
      metaReteData: state => state.meta.data.reteData,
      pictureList: state => state.resource.pictureList,
      videoList: state => state.resource.videoList,
      polygenList: state => state.resource.polygenList
    }),
    id() {
      return parseInt(this.$route.query.id)
    }
  },
  created() {
    const self = this
    getPolygen().then(response => {
      console.log(response.data)
      self.setPolygenList(response.data)
      console.log(self.polygenList)
    })

    getPicture().then(response => {
      console.log(response.data)
      self.setPictureList(response.data)
    })

    getVideo().then(response => {
      console.log(response.data)
      self.setVideoList(response.data)
      console.log(self.videoList)
    })

    self.setMetaId(this.id)

    getMeta(this.id).then(response => {
      self.meta = response.data
      self.setMetaData(self.meta)
      if (self.meta.data !== null) {
        self.setup(self.meta.data).then(data => {
          self.loading = false
        })
      } else {
        self.create({ name: self.meta.name, id: self.meta.id }).then(data => {
          self.saveMeta(JSON.stringify(data)).then((response) => {
            self.loading = false
          })
        })
      }
    })
  },
  methods: {
    ...mapMutations('meta', [
      'setMetaId',
      'setMetaData'

    ]),
    ...mapActions('meta', {
      saveMeta: 'saveMeta'
    }),
    ...mapMutations([
      'setPolygenList',
      'setPictureList',
      'setVideoList'
    ]),

    setup(data) {
      return this.$refs.rete.setup(data)
    },
    create() {
      return this.$refs.rete.create()
    },

    arrange() {
      this.$refs.rete.arrange()// .$emit('arrange')
    },
    save() {
      this.$refs.rete.save()// .$emit('arrange')
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
