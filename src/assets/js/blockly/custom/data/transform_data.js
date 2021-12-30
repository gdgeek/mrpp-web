import Blockly from 'blockly'

export default {
  title: 'transform_data',
  type: 'data',
  block: {
    init: function () {
      this.jsonInit({
        type: 'transform_data',
        message0:
          '位置 %1 旋转 %2 缩放 %3',
        args0: [
          {
            type: 'input_value',
            name: 'position',
            check: 'Vector3'
          },
          {
            type: 'input_value',
            name: 'scale',
            check: 'Vector3'
          },
          {
            type: 'input_value',
            name: 'rotate',
            check: 'Vector3'
          }
        ],
        inputsInline: false,
        output: 'Transform',
        colour: 230,
        tooltip: '',
        helpUrl: ''
      })
    }
  },
  lua: function (block) {
    var value_position = Blockly.Lua.valueToCode(
      block,
      'position',
      Blockly.Lua.ORDER_ATOMIC
    )
    var value_scale = Blockly.Lua.valueToCode(
      block,
      'scale',
      Blockly.Lua.ORDER_ATOMIC
    )
    var value_rotate = Blockly.Lua.valueToCode(
      block,
      'rotate',
      Blockly.Lua.ORDER_ATOMIC
    )
    // TODO: Assemble Lua into code variable.
    var code =
      'CS.MrPP.Lua.Transform(' +
      value_position +
      ', ' +
      value_scale +
      ', ' +
      value_rotate +
      ')'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE]
  },
  toolbox: {
    kind: 'block',
    type: 'transform_data',
    inputs: {
      position: {
        shadow: {
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
      },
      rotate: {
        shadow: {
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
      },
      scale: {
        shadow: {
          type: 'vector3_data',
          inputs: {
            X: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1
                }
              }
            },
            Y: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1
                }
              }
            },
            Z: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1
                }
              }
            }
          }
        }
      }
    }
  }
}
/**
 * 
 * <value name="position">
<shadow type="vector3_data">
      <value name="X">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="Y">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="Z">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </shadow>
 </value>

<value name="scale">
<shadow type="vector3_data">
      <value name="X">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="Y">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="Z">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </shadow>
 </value>


<value name="rotate">
<shadow type="vector3_data">
      <value name="X">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="Y">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="Z">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </shadow>
 </value>
 */