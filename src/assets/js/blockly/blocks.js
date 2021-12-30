
import Vector3Data from '@/assets/js/blockly/custom/data/vector3_data'
import TransformData from '@/assets/js/blockly/custom/data/transform_data'
import InitAction from '@/assets/js/blockly/custom/trigger/init_action'
import UpdateAction from '@/assets/js/blockly/custom/trigger/update_action'
import DestroyAction from '@/assets/js/blockly/custom/trigger/destroy_action'
import Blockly from 'blockly'

function AddBlocks() {
  Blockly.Blocks[Vector3Data.title] = Vector3Data.block
  Blockly.Lua[Vector3Data.title] = Vector3Data.lua
  Blockly.Blocks[TransformData.title] = TransformData.block
  Blockly.Lua[TransformData.title] = TransformData.lua
  Blockly.Blocks[InitAction.title] = InitAction.block
  Blockly.Lua[InitAction.title] = InitAction.lua
  Blockly.Blocks[UpdateAction.title] = UpdateAction.block
  Blockly.Lua[UpdateAction.title] = UpdateAction.lua
  Blockly.Blocks[DestroyAction.title] = DestroyAction.block
  Blockly.Lua[DestroyAction.title] = DestroyAction.lua
     

}

export { AddBlocks }
