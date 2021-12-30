import Logic from './logic'
import Loop from './loop' 
import Math from './math' 
import Texts from './texts' 
import List from './list' 
import Colour from './colour' 
const sep = {
  "kind": "sep"
}
const Variable = {
  kind: 'category',
  name: '变量',
  colour: '%{BKY_VARIABLES_HUE}',
  custom: 'VARIABLE'
}
const Procedure = {
  kind: 'category',
  name: '函数',
  colour: '%{BKY_PROCEDURES_HUE}',
  custom: 'PROCEDURE'
}

export default {
  kind: 'categoryToolbox',
  contents: [Logic, Loop, Math, Texts, List, Colour, sep, sep, Variable, Procedure]
}