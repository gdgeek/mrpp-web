import Logic from '@/assets/js/blockly/logic'
import Loop from '@/assets/js/blockly/loop' 
import Math from '@/assets/js/blockly/math' 
import Texts from '@/assets/js/blockly/texts' 
import List from '@/assets/js/blockly/list' 
import Colour from '@/assets/js/blockly/colour' 
import Vector3Data from '@/assets/js/blockly/custom/data/vector3_data'
import TransformData from '@/assets/js/blockly/custom/data/transform_data'
import InitAction from '@/assets/js/blockly/custom/trigger/init_action'

import UpdateAction from '@/assets/js/blockly/custom/trigger/update_action'
import DestroyAction from '@/assets/js/blockly/custom/trigger/destroy_action'
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
const Data = {
  kind: 'category',
  name: '数据',
  colour: '%{BKY_PROCEDURES_HUE}',
  contents: [
    Vector3Data.toolbox,
    TransformData.toolbox
  ]
}
const Trigger = {
  kind: 'category',
  name: '触发',
  colour: '%{BKY_PROCEDURES_HUE}',
  contents: [InitAction.toolbox, UpdateAction.toolbox, DestroyAction.toolbox]
}

export default {
  kind: 'categoryToolbox',
  contents: [
    Logic,
    Loop,
    Math,
    Texts,
    List,
    Colour,
    sep,
    Data,
    Trigger,
    sep,
    Variable,
    Procedure
  ]
}