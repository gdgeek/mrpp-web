import Rete from 'rete'
import { Control } from '@/node-editor/controls/control'
export class Component extends Rete.Component {
  constructor(type, root) {
    super(type.title)
    this.type_ = type
    this.root_ = root
  }

  builder(node) {
    if (
      typeof this.type_.controls !== 'undefined' &&
      this.type_.controls !== null
    ) {
      this.type_.controls.forEach(ctrl => {
        node.addControl(new Control(this.editor, ctrl, this.root_))
      })
    }

    if (
      typeof this.type_.inputs !== 'undefined' &&
      this.type_.inputs !== null
    ) {
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
  worker(node, inputs, outputs, callback) {
    const data = {}
    data.type = this.type_.title
    if (
      typeof this.type_.controls !== 'undefined' &&
      this.type_.controls !== null
    ) {
      data.parameters = {}
      this.type_.controls.forEach(ctrl => {
        data.parameters[ctrl.key] = node.data[ctrl.key]

        console.log(JSON.stringify(ctrl.key))
        console.log(JSON.stringify(node.data[ctrl.key]))
        console.log(JSON.stringify(data.parameters))
      })
    }

    if (
      typeof this.type_.inputs !== 'undefined' &&
      this.type_.inputs !== null
    ) {
      data.chieldren = {}
      this.type_.inputs.forEach(input => {
        const items = inputs[input.key]
        data.chieldren[input.key] = []
        items.forEach(item => {
          data.chieldren[input.key].push(item)
        })
      })
    }

    if (
      typeof this.type_.outputs !== 'undefined' &&
      this.type_.outputs !== null
    ) {
      this.type_.outputs.forEach(output => {
        outputs[output.key] = data
      })
    }
    if (typeof this.type_.root !== 'undefined' && this.type_.root) {
      // alert(1)
      console.log(JSON.stringify(data))
      callback(JSON.stringify(data))
      // const data = {}
      // data.type = this.type_.title
      // alert(jsondata)
    }

    // alert(5)
    // outputs['num'] = node.data.num
  }
}
