<template>
  <div>{{ metaId }}
    <div v-show="visible" id="rete" ref="rete" />
  </div>
</template>

<script>
import { initMeta, firstTime, toJson, save, fromJson, arrange } from '@/node-editor/meta'
import { postMetaRete } from '@/api/v1/metaRete'
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
    initMeta({
      container: self.$refs.rete,
      metaId: self.metaId,
      root: self
    })
  },

  beforeDestroy() {
    this.save()
  },
  methods: {
    createRete() {
      const self = this
      return new Promise((resolve, reject) => {
        firstTime()
        const json = toJson()
        postMetaRete({
          meta_id: self.metaId,
          data: JSON.stringify(json)
        }).then(response => {
          resolve(response.data)
        }).catch(e => {
          reject(e)
        })
      })
    },
    arrange() {
      arrange()
    },
    load(data) {
      fromJson(JSON.parse(data))
    },
    save() {
      save()
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
