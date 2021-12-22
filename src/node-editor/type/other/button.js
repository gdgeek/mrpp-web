import { ButtonSocket, ActionSocket } from '@/node-editor/sockets/sockets'

var ButtonType = {
  title: 'Button',
  allocate: ['其他'],
  controls: [
    {
      type: 'string',
      key: 'title',
      title: '标题',
      default: '标题'
    },
    {
      type: 'icons',
      key: 'icon',
      title: '图标'
    }
  ],
  inputs: [
    {
      key: 'action-in',
      title: '动作',
      socket: ActionSocket,
      multiConns: true

    }
  ],
  outputs: [
    {
      key: 'button-out',
      title: '按钮',
      socket: ButtonSocket,
      multiConns: false
    }
  ]
}
export default ButtonType
