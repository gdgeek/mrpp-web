import Rete from 'rete'
import { Control } from '../controls/control.js'
export class Component extends Rete.Component {
  constructor(type, root) {
    super(type.title)
    this.type_ = type
    this.root_ = root
  }

  builder(node) {
    if (typeof this.type_.controls !== 'undefined' &&
      this.type_.controls !== null) {
      this.type_.controls.forEach(ctrl => {
        node.addControl(new Control(this.editor, ctrl, this.root_))
      })
    }

    if (typeof this.type_.inputs !== 'undefined' &&
      this.type_.inputs !== null) {
      this.type_.inputs.forEach(input => {
        node.addInput(
          new Rete.Input(input.key, input.title, input.socket, input.multiConns)
        )
      })
    }
    if (
      typeof this.type_.outputs !== 'undefined' &&
      this.type_.outputs !== null
    ) {
      this.type_.outputs.forEach(output => {
        node.addOutput(
          new Rete.Output(
            output.key,
            output.title,
            output.socket,
            output.multiConns
          )
        )
      })
    }
    return node
  }

  worker(node, inputs, outputs) {
    // outputs['meta'] = node.data.num
  }
}
