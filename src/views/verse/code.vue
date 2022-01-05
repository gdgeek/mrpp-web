<template>
  <div class="verse-code">
    <el-container>

      <el-main>
        <el-card v-loading="loading" class="box-card">
          <div slot="header" class="clearfix">
            <router-link :to="'/verse/editor?id='+id">
              <el-link :underline="false"> 【宇宙】</el-link>
            </router-link>
            / 【逻辑】

            <el-button-group style="float: right">
              <el-button type="primary" size="mini" @click="save()"><font-awesome-icon icon="save" />  保存 </el-button>
            </el-button-group>
          </div>

          <blockly v-if="cybers !== null" ref="blockly" :cybers="cybers" />

        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Blockly from '@/components/Blockly.vue'

import { mapMutations } from 'vuex'
import { getVerse } from '@/api/v1/verse'
import { postVerseCyber } from '@/api/v1/verse-cyber'

export default {
  name: 'VerseCode',
  components: {
    Blockly
  },
  data() {
    return {
      loading: false,
      verse: null,
      cybers: null
    }
  },
  computed: {

    id() {
      return parseInt(this.$route.query.id)
    }
  },
  created() {
    const self = this

    getVerse(this.id, 'verseCybers,metas').then(response => {
      self.verse = response.data
      console.log(self.verse)
      if (self.verse.verseCybers.length === 0) {
        postVerseCyber({ verse_id: self.verse.id }).then(response => {
          self.cybers = [response.data]
        })
      } else {
        self.cybers = self.verse.verseCybers
      }
      if (typeof response.data.metas !== 'undefined') {
        response.data.metas.forEach(meta => {
          self.addMeta(meta)
        })
      }
    })
  },
  methods: {
    ...mapMutations('blockly', [
      'addMeta'
    ]),
    save() {
      this.$refs.blockly.save()
    }
  }
}
</script>
