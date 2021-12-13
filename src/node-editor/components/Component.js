import Rete from 'rete'
import { Control } from '../controls/control.js'
import { MetaSocket } from '../sockets/sockets'

export class Component extends Rete.Component {
  constructor(type) {
    super(type.title)
    this.type_ = type
  }

  builder(node) {
    var out1 = new Rete.Output('meta', 'Meta', MetaSocket)

    if (this.type_.controls !== null) {
      this.type_.controls.forEach(ctrl => {
        node.addControl(new Control(this.editor, ctrl))
      })
    }
    return node
      .addOutput(out1)
  }

  worker(node, inputs, outputs) {
    outputs['meta'] = node.data.num
  }
}
