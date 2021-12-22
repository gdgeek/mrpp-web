import { ComponentSocket } from '@/node-editor/sockets/sockets'

var TransparentType = {
  title: 'Transparent',
  allocate: ['组件'],
  controls: [
    {
      type: 'number',
      key: 'alpha',
      title: '透明度',
      readonly: false,
      default: 0.5
    }
  ],
  inputs: [],
  outputs: [
    {
      key: 'component-out',
      title: '组件',
      socket: ComponentSocket,
      multiConns: true
    }
  ]
}
export default TransparentType
