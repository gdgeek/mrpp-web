import Rete from 'rete'
// import { NumControl } from '../controls/numControl.js'
import { MetaSocket } from '../sockets/sockets'

export class VerseComponent extends Rete.Component {
  constructor() {
    super('Verse')
  }

  builder(node) {
    var inp1 = new Rete.Input('aaaaa', 'Meta', MetaSocket)
    // var inp2 = new Rete.Input('num2', 'Number2', NumSocket)
    // var out = new Rete.Output('res', 'Number', NumSocket)

    // inp1.addControl(new NumControl(this.editor, 'num'))
    // inp2.addControl(new NumControl(this.editor, 'num2'))

    return node
      .addInput(inp1)
    // .addInput(inp2)
    // .addControl(new NumControl(this.editor, 'preview', true))
    // .addOutput(out)
  }

  worker(node, inputs, outputs) {
    /*
    var n1 = inputs['num'].length ? inputs['num'][0] : node.data.num1
    var n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2
    var sum = n1 + n2

    this.editor.nodes
      .find(n => n.id === node.id)
      .controls.get('preview')
      .setValue(sum)
    outputs['res'] = sum*/
  }
}
