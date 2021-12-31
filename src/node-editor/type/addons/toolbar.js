import { AddonSocket, ButtonSocket } from '@/node-editor/sockets/sockets'

var ToolbarType = {
  title: 'Toolbar',
  allocate: ['插件'],
  controls: [
    {
      type: 'bool',
      key: 'destory',
      title: '销毁',
      default: false
    }
  ],
  inputs: [
    {
      key: 'buttons',
      title: '按钮',
      socket: ButtonSocket,
      multiConns: true
    }
  ],
  outputs: [
    {
      key: 'out',
      title: '插件',
      socket: AddonSocket,
      multiConns: false
    }
  ]
}
export default ToolbarType
