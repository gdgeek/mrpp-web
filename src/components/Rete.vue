<template>
  <div v-show="visible" id="rete" ref="rete" />
</template>

<script>
import { init, toJson, fromJson, arrange } from '@/node-editor'
import { postVerseRete } from '@/api/v1/verseRete'
export default {
  data() {
    return {
      visible: true
    }
  },
  mounted() {
    const self = this
    init(self.$refs.rete)
  },
  methods: {
    arrange() {
      arrange()
    },
    load(data) {
      fromJson(JSON.parse(data))
    },
    save(verseId) {
      const json = toJson()

      postVerseRete({
        verse_id: verseId,
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
