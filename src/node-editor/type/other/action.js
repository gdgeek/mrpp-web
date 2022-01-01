import { ActionSocket } from '@/node-editor/sockets/sockets'

var ActionType = {
  title: 'Action',
  allocate: ['其他'],
  controls: [
    {
      type: 'uuid',
      key: 'uuid'
    },
    {
      type: 'string',
      key: 'action',
      title: '动作'
    },
    {
      type: 'string',
      key: 'action_parameter',
      title: '参数'
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
