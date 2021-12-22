import { EntitySocket, AddonSocket } from '@/node-editor/sockets/sockets'

console.log(EntitySocket)
// import { MetaSocket } from '@/node-editor/sockets/sockets'
var MetaRootType = {
  title: 'MetaRoot',
  controls: [
    {
      type: 'meta-name',
      key: 'name',
      title: '名称',
      readonly: false
    },
    {
      type: 'transform',
      key: 'meta-root',
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
      key: 'addon-in',
      title: '插件',
      socket: AddonSocket,
      multiConns: true
    }
  ]
}
export default MetaRootType
