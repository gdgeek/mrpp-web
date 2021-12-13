import Rete from 'rete'
import { NumControl } from '../controls/numControl.js'
import { MetaSocket } from '../sockets/sockets'

export class MetaComponent extends Rete.Component {
  constructor() { super('Meta') }

  builder(node) {
    var out1 = new Rete.Output('meta', 'Meta', MetaSocket)
    return node.addControl(new NumControl(this.editor, 'num', true)).addOutput(out1)
  }

  worker(node, inputs, outputs) {
    outputs['meta'] = node.data.num
  }
}
