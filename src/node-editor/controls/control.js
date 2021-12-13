import Rete from 'rete'
import VueNumControl from './numControl.vue'
import MetaControl from './metaControl.vue'

export class Control extends Rete.Control {
  constructor(emitter, data) {
    super(data.key)
    switch (data.type) {
      case 'meta':
        this.component = MetaControl
        break
      default:
        this.component = VueNumControl
    }

    this.props = { emitter, ikey: data.key, readonly: data.readonly, data }
  }

  setValue(val) {
    this.vueContext.value = val
  }
}
