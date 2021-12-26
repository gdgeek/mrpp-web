<template>
  <div class="verse-index">
    <el-container>

      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div v-if="data !== null" slot="header" class="clearfix">
            【宇宙】{{ verseName }}
            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="process()"><font-awesome-icon icon="project-diagram" />  触发 </el-button>
              <el-button type="primary" size="mini" @click="arrange()"><font-awesome-icon icon="project-diagram" />  整理 </el-button>
              <el-button type="primary" size="mini" @click="save()"><font-awesome-icon icon="save" />  保存 </el-button>
            </el-button-group>
          </div>
          <rete-verse :id="reteId" ref="rete" class="rete" :verse-id="id" />
        </el-card>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import ReteVerse from '@/components/Rete/ReteVerse.vue'

import { mapState, mapMutations } from 'vuex'
import { getVerse } from '@/api/v1/verse'
export default {
  name: 'VerseEditor',
  components: {
    ReteVerse
  },
  data() {
    return {
      data: null,
      loading: true
    }
  },
  computed: {
    ...mapState({
      verseName: state => state.verse.data.name,
      reteId: state => state.verse.data.reteId,
      verseReteData: state => state.verse.data.reteData
    }),
    id() {
      return parseInt(this.$route.query.id)
    }
  },
  created() {
    const self = this
    getVerse(this.id).then(response => {
      self.setVerseData(response.data)
      self.data = response.data
      // alert(response.data.data)
      self.loading = false
      this.setup(response.data.data)
      /*
      if (response.data.verseRetes != null && response.data.verseRetes.length > 0) {
        self.load(response.data.verseRetes[0].data)
        self.loading = false
      } else {
        self.createRete().then(data => {
          self.data.verseRetes = [data]
          self.setVerseReteId(data.id)
          self.loading = false
        })
      }*/
    })
  },
  methods: {
    ...mapMutations('verse', [
      'setVerseName',
      'setVerseReteId',
      'setVerseId',
      'setVerseData'

    ]),
    ...mapMutations([
      'setPolygenList',
      'setPictureList',
      'setVideoList'

    ]),

    createRete() {
      return this.$refs.rete.createRete()// $emit('load', data)
    },
    setup(data) {
      return this.$refs.rete.setup(data)
    },
    load(data) {
      this.$refs.rete.load(data)// $emit('load', data)
    },
    save() {
      this.$refs.rete.save()// .$emit('save', self.id)
    },
    process() {
      this.$refs.rete.process()// .$emit('arrange')
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
