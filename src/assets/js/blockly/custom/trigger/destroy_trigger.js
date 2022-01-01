import Blockly from 'blockly'

import TriggerType from './type'
const block = {
  title: 'destroy_trigger',
  type: TriggerType.name,
  colour: TriggerType.colour,
  getBlock(root){
    const block = {
      init: function () {
        this.jsonInit({
          type: 'destroy_trigger',
          message0: '初始化 %1 %2',
          args0: [
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
      var statements_content = Blockly.Lua.statementToCode(block, 'content')
      // TODO: Assemble Lua into code variable.
      var code =
        "self.handling['@destroy'] = function(self) \n\
  print('@destroy')\n" +
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
