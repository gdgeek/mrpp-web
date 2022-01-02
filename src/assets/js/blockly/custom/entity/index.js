import Type from './type'
import Blockly from 'blockly'
import PolygenEntity from './polygen_entity'
import PictureEntity from './picture_entity'
import VideoEntity from './video_entity'
import Entity from './entity'


const EntityCategory = {
  kind: 'category',
  name: '实体',
  colour: Type.colour,
  contents: [
    Entity.toolbox,
    PolygenEntity.toolbox,
    PictureEntity.toolbox,
    VideoEntity.toolbox
  ]
}
function RegisterData(root, data) {
  Blockly.Blocks[data.title] = data.getBlock(root)
  Blockly.Lua[data.title] = data.getLua(root)
}
function EntityRegister(root) {
  RegisterData(root, Entity)
  RegisterData(root, PolygenEntity)
  RegisterData(root, PictureEntity)
  RegisterData(root, VideoEntity)
}
export { EntityCategory, EntityRegister }
