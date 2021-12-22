import { EntitySocket, ComponentSocket } from '@/node-editor/sockets/sockets'

var EntityType = {
  title: 'Entity',
  allocate: ['实体'],
  controls: [
    {
      type: 'string',
      key: 'name',
      title: '名称',
      readonly: false
    },
    {
      type: 'transform',
      key: 'transfrom',
      readonly: false
    },
    {
      type: 'bool',
      key: 'active',
      title: '激活',
      readonly: false
    }
  ],
  inputs: [
    {
      key: 'entity-in',
      title: '实体',
      socket: EntitySocket,
      multiConns: true
    },
    {
      key: 'component-in',
      title: '组件',
      socket: ComponentSocket,
      multiConns: true
    }
  ],
  outputs: [
    {
      key: 'entity-out',
      title: '实体',
      socket: EntitySocket,
      multiConns: true
    }
  ]
}
export default EntityType
