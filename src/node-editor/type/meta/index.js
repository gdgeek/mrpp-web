import { MetaSocket } from '@/node-editor/sockets/sockets'

// import { MetaSocket } from '@/node-editor/sockets/sockets'
var MetaType = {
  title: 'Meta',
  controls: [
    {
      type: 'meta',
      key: 'meta',
      readonly: true
    }
  ],
  inputs: null,
  outputs: [
    {
      key: 'meta-out',
      title: 'Meta',
      socket: MetaSocket,
      multiConns: false
    }
  ]
}
export default MetaType
