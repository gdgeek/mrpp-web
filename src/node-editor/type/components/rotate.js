import { ComponentSocket } from '@/node-editor/sockets/sockets'

var RotateType = {
  title: 'Rotate',
  allocate: ['组件'],
  controls: [
    {
      type: 'vector3',
      key: 'speed',
      title: '速度',
      readonly: false
    }
  ],
  inputs: [],
  outputs: [
    {
      key: 'out',
      title: '组件',
      socket: ComponentSocket,
      multiConns: true
    }
  ]
}
export default RotateType
