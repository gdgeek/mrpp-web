import Type from './type'

import ActionTrigger from './action_trigger'
import DestroyTrigger from './destroy_trigger'
import InitTrigger from './init_trigger'
import UpdateTrigger from './update_trigger'

const category = {
  kind: 'category',
  name: '数据',
  colour: Type.colour,
  contents: [
    ActionTrigger.toolbox,
    DestroyTrigger.toolbox,
    InitTrigger.toolbox,
    UpdateTrigger.toolbox
  ]
}
export default category
