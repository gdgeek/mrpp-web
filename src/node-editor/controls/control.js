import Rete from 'rete'
import VueNumControl from './numControl.vue'
import MetaControl from './metaControl.vue'
import TransformControl from './transformControl.vue'
import StringControl from './stringControl.vue'
import MetaNameControl from './metaNameControl.vue'
import BoolControl from './boolControl.vue'
import PolygenControl from './polygenControl.vue'
import VideoControl from './videoControl.vue'
import PictureControl from './pictureControl.vue'

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
      case 'transform':
        this.component = TransformControl
        break
      case 'string':
        this.component = StringControl
        break
      case 'meta-name':
        this.component = MetaNameControl
        break
      case 'bool':
        this.component = BoolControl
        break
      case 'polygen':
        this.component = PolygenControl
        break
      case 'video':
        this.component = VideoControl
        break
      case 'picture':
        this.component = PictureControl
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
