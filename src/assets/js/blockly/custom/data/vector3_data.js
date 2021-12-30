import Blockly from 'blockly'

export default {
  title: 'vector3_data',
  type: 'data',
  block: {
    init: function () {
      this.jsonInit({
        type: 'block_type',
        message0: 'X %1 Y %2 X %3',
        args0: [
          {
            type: 'input_value',
            name: 'X',
            check: 'Number'
          },
          {
            type: 'input_value',
            name: 'Y',
            check: 'Number'
          },
          {
            type: 'input_value',
            name: 'Z',
            check: 'Number'
          }
        ],
        inputsInline: true,
        output: 'Vector3',
        colour: 230,
        tooltip: '',
        helpUrl: ''
      })
    }
  },
  lua: function (block) {
    var value_x = Blockly.Lua.valueToCode(block, 'X', Blockly.Lua.ORDER_ATOMIC)
    var value_y = Blockly.Lua.valueToCode(block, 'Y', Blockly.Lua.ORDER_ATOMIC)
    var value_z = Blockly.Lua.valueToCode(block, 'Z', Blockly.Lua.ORDER_ATOMIC)
    // TODO: Assemble Lua into code variable.
    var code = 'CS.UnityEngine.Vector3(' + [value_x, value_y, value_z] + ')'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE]
  },
  toolbox: {
    kind: 'block',
    type: 'vector3_data',
    inputs: {
      X: {
        shadow: {
          type: 'math_number',
          fields: {
            NUM: 0
          }
        }
      },
      Y: {
        shadow: {
          type: 'math_number',
          fields: {
            NUM: 0
          }
        }
      },
      Z: {
        shadow: {
          type: 'math_number',
          fields: {
            NUM: 0
          }
        }
      }
    }
  }
}
