<template>
  <div v-show="visible" id="rete" ref="rete" />
</template>

<script>
import { initVerse, firstTime, toJson, fromJson, arrange } from '@/node-editor/verse'

import { mapActions } from 'vuex'
export default {
  props: {
    verseId: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      visible: true
    }
  },
  mounted() {
    const self = this
    initVerse(self.$refs.rete, self.verseId, self)
  },
  beforeDestroy() {
    const json = toJson()
    this.saveVerse(JSON.stringify(json))
  },
  methods: {
    ...mapActions('verse', {
      saveVerse: 'saveVerse',
      createVerse: 'createVerse'
    }),
    createRete() {
      firstTime()
      const json = toJson()
      return this.createVerse(JSON.stringify(json))
    },
    arrange() {
      arrange()
    },
    load(data) {
      fromJson(JSON.parse(data))
    },
    save() {
      const json = toJson()
      return this.saveVerse(JSON.stringify(json))
    }
  }
}
</script>

<style>
#rete {
  width: 100%;
  height: 1000px;
}

.node .control input, .node .input-control input {
  width: 140px;
}

select, input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}
</style>
