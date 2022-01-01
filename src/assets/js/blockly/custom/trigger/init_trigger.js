import Blockly from 'blockly'

import TriggerType from './type'
const block ={
  title: 'init_trigger',
  type: TriggerType.name,
  colour: TriggerType.colour,
  getBlock(root){
    const block = {
      init: function () {
        this.jsonInit({
          type: 'init_trigger',
          message0: '销毁 %1 %2',
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
        "self.handling['@init'] = function(self) \n\
    print('@init')\n" +
        statements_content +
        'end\n'
      return code
    }
    return lua
  },
  toolbox : {
    kind: 'block',
    type: block.title
  }
}
export default block