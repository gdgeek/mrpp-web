import { ActionSocket } from '@/node-editor/sockets/sockets'

var ActionType = {
  title: 'Action',
  allocate: ['其他'],
  controls: [
    {
      type: 'string',
      key: 'title',
      title: '名称'
    }
  ],
  outputs: [
    {
      key: 'out',
      title: '动作',
      socket: ActionSocket,
      multiConns: true
    }
  ]
}
export default ActionType
