import Blockly from 'blockly'
import DataType from './type'
const data = {
  name: 'polygen_data'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root){
    const json = {
      type: 'polygen_entity',
      message0: '%{BKY_CAT_POLYGEN} %1',
      args0: [
        {
          type: 'field_dropdown',
          name: '<#Polygen>',
          options: [['None', 'None']]
        }
      ],
      output: 'Entity',
      colour: 230,
      tooltip: '',
      helpUrl: ''
    }
    return json


  },
  getBlock: function (root) {
    const block = {
      init: function () {
        this.jsonInit(block.getBlockJson(root))
      }
    }
    return block
  },
  getLua(root) {
    const lua = function (block) {
      var dropdown_polygen = block.getFieldValue('<#Polygen>')
      //alert(dropdown_polygen);
      // TODO: Assemble Lua into code variable.
      var code = 'CS.MrPP.Lua.Handler("polygen", "' + dropdown_polygen + '")'
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Lua.ORDER_NONE]
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block
