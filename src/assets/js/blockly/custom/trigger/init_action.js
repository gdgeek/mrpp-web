import Blockly from 'blockly'

export default {
  title: 'init_action',
  type: 'trigger',
  block: {
    init: function () {
      this.jsonInit({
        type: 'init_action',
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
      "self.handling['@init'] = function(self) \n\
  print('@init')\n" +
      statements_content +
      'end\n'
    return code
  },
  toolbox: {
    kind: 'block',
    type: 'init_action'
  }
}
