<template>
  <div v-show="visible" id="rete" ref="rete" />
</template>

<script>
import { initMeta, firstTime, toJson, fromJson, arrange } from '@/node-editor/meta'
import { postMetaRete, putMetaRete } from '@/api/v1/metaRete'
export default {
  props: {
    metaId: {
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
    initMeta(self.$refs.rete, self.metaId, self)
  },
  methods: {
    createRete() {
      const self = this
      firstTime()
      const json = toJson()
      postMetaRete({
        meta_id: self.metaId,
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

      putMetaRete(id, {
        id,
        meta_id: self.metaId,
        data: JSON.stringify(json)
      }).then(response => {
        console.log(response)
      })/**/
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
