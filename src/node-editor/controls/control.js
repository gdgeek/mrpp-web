import Rete from 'rete'
import VueNumControl from './numControl.vue'
import MetaControl from './metaControl.vue'

export class Control extends Rete.Control {
  constructor(emitter, data, root) {
    super(data.key)
    switch (data.type) {
      case 'meta':
        this.component = MetaControl
        break
      case 'num':
        this.component = VueNumControl
        break
      default:
        this.component = VueNumControl
    }

    this.props = {
      emitter,
      data,
      root
    }
  }

  setValue(val) {
    this.vueContext.value = val
    this.vueContext.update()
  }
}
