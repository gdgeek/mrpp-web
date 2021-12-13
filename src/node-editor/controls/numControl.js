import Rete from 'rete'
import VueNumControl from './numControl.vue'

export class NumControl extends Rete.Control {
  constructor(emitter, key, readonly) {
    super(key)
    this.a = 1
    this.component = VueNumControl
    this.props = { emitter, ikey: key, readonly }
  }

  setValue(val) {
    this.vueContext.value = val
  }
}
