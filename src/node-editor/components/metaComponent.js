import Rete from 'rete'
import { NumControl } from '../controls/numControl.js'
import { MetaSocket } from '../sockets/sockets'

export class MetaComponent extends Rete.Component {
  constructor() { super('Meta2') }

  builder(node) {
    var out1 = new Rete.Output('meta2', 'Meta', MetaSocket, true)
    var out2 = new Rete.Output('meta3', 'Meta2', MetaSocket)
    return node
      .addOutput(out1)
      .addControl(new NumControl(this.editor, 'num', true))
      .addOutput(out2)
  }

  worker(node, inputs, outputs) {
    outputs['meta2'] = node.data.num
  }
}
