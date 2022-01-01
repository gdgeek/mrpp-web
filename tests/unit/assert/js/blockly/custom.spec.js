import Vector3Data from '@/assets/js/blockly/custom/data/vector3_data'
import TransformData from '@/assets/js/blockly/custom/data/transform_data'
import InitTrigger from '@/assets/js/blockly/custom/trigger/init_trigger'
import UpdateTrigger from '@/assets/js/blockly/custom/trigger/update_trigger'
import DestroyTrigger from '@/assets/js/blockly/custom/trigger/destroy_trigger'
import ActionTrigger from '@/assets/js/blockly/custom/trigger/action_trigger'

import Blockly from 'blockly'
function AddBlockData(root, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(root)
}
function AddBlocks(root) {
  AddBlockData(root, Vector3Data)
  AddBlockData(root, TransformData)
  AddBlockData(root, InitTrigger)
  AddBlockData(root, UpdateTrigger)
  AddBlockData(root, DestroyTrigger)
  AddBlockData(root, ActionTrigger)
  /*
  AddBlockData(root, TransformData)
  AddBlockData(root, InitTrigger)
  AddBlockData(root, UpdateTrigger)
  AddBlockData(root, DestroyTrigger)
  AddBlockData(root, ActionTrigger)*/
}

describe('Counter.vue', () => {
  it('custom block', async() => {
    const root = {}
    AddBlocks(root)
  })
})
