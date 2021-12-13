<template>
  <div v-show="visible" id="rete" ref="rete" />
</template>

<script>
import { init, toJson, arrange } from '@/node-editor'
import { postVerseRete, putVerseRete } from '@/api/v1/verseRete'
export default {
  data() {
    return {
      visible: true
    }
  },
  mounted() {
    const self = this
    init(this.$refs.rete)
    this.$nextTick(function() {
      this.$on('save', self.save)
      this.$on('arrange', self.arrange)
    })
  },
  methods: {
    arrange() {
      arrange()
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
