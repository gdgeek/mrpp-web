import Blockly from 'blockly'

export default {
  title: 'update_action',
  type: 'trigger',
  block: {
    init: function () {
      this.jsonInit({
        type: 'update_action',
        message0: '更新 %1 %2',
        args0: [
          {
            type: 'input_dummy'
          },
          {
            type: 'input_statement',
            name: 'content'
          }
        ],
        colour: 230,
        tooltip: '',
        helpUrl: ''
      })
    }
  },
  lua: function (block) {
    var statements_content = Blockly.Lua.statementToCode(block, 'content')
    // TODO: Assemble Lua into code variable.
    var code =
      "self.handling['@update'] = function(self, interval) \n\
print('@update')\n" +
      statements_content +
      'end\n'
    return code
  },
  toolbox: {
    kind: 'block',
    type: 'update_action'
  }
}
