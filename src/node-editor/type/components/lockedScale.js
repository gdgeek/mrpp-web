import { ComponentSocket } from '@/node-editor/sockets/sockets'

var LockedScaleType = {
  title: 'LockedScale',
  allocate: ['组件'],
  controls: [
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
export default LockedScaleType
