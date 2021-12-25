<template>
  <div>
    <div v-show="visible" id="rete" ref="rete" />
  </div>
</template>

<script>
import { initMeta, process, firstTime, toJson, fromJson, arrange } from '@/node-editor/meta'

import { mapActions } from 'vuex'
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
    ...mapActions('meta', {
      saveMeta: 'saveMeta',
      createMeta: 'createMeta'
    }),
    createRete() {
      firstTime()
      const json = toJson()
      return this.createMeta(JSON.stringify(json))
    },
    process() {
      process()
    },
    arrange() {
      arrange()
    },
    load(data) {
      fromJson(JSON.parse(data))
    },
    save() {
      const json = toJson()
      return this.saveMeta(JSON.stringify(json))
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
