<template>
  <div v-show="visible" id="rete" ref="rete" />
</template>

<script>
import { initVerse, toJson, fromJson, arrange } from '@/node-editor/verse'
import { postVerseRete, putVerseRete } from '@/api/v1/verseRete'
export default {
  props: {
    verseId: {
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
  methods: {
    createRete() {
      const self = this
      const json = toJson()
      postVerseRete({
        verse_id: self.verseId,
        data: JSON.stringify(json)
      }).then(response => {
        console.log(response)
      })
    },
    arrange() {
      arrange()
    },
    load(data) {
      fromJson(JSON.parse(data))
    },
    save(id) {
      const self = this
      const json = toJson()

      putVerseRete(id, {
        id,
        verse_id: self.verseId,
        data: JSON.stringify(json)
      }).then(response => {
        console.log(response)
      })
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
