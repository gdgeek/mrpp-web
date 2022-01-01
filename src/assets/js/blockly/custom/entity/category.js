import Type from './type'

import Vector3Data from './vector3_data'
import TransformData from './transform_data'

const category = {
  kind: 'category',
  name: '数据',
  colour: Type.colour,
  contents: [Vector3Data.toolbox, TransformData.toolbox]
}
export default category
