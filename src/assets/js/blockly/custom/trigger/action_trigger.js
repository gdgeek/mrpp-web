import Blockly from 'blockly'

import TriggerType from './type'
const block = {
  title: 'action_trigger',
  type: TriggerType.name,
  colour: TriggerType.colour,
  getBlock(root){
    const block = {
      init: function () {
        this.jsonInit({
          type: 'action_trigger',
          message0: '%{BKY_CAT_ACTION} %1 %2 %3',
          args0: [
            {
              type: 'field_dropdown',
              name: '<#Action>',
              options: function () {
                return [
                  ['option', 'OPTIONNAME'],
                  ['option2', 'OPTIONNAME2']
                ]
              }
            },
            {
              type: 'input_dummy'
            },
            {
              type: 'input_statement',
              name: 'content'
            }
          ],
          colour: TriggerType.colour,
          tooltip: '',
          helpUrl: ''
        })
      }
    }
    return block
  },
  getLua(root){
    const lua = function (block) {
      var dropdown_option = block.getFieldValue('<#Action>')
      var statements_content = Blockly.Lua.statementToCode(block, 'content')
      // TODO: Assemble Lua into code variable.
      var code = '..'

      var code =
        "self.handling['" +
        dropdown_option +
        "'] = function(self, parameter) \n\
  print('" +
        dropdown_option +
        "')\n" +
        statements_content +
        'end\n'

      return code
    }
    return lua
  },
  toolbox:{
    kind: 'block',
    type: block.title
  }
}

export default block