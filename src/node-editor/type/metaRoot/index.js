import { EntitySocket } from '@/node-editor/sockets/sockets'

// import { MetaSocket } from '@/node-editor/sockets/sockets'
var MetaRootType = {
  title: 'MetaRoot',
  controls: [
    {
      type: 'transform',
      key: 'meta',
      readonly: true
    }
  ],
  inputs: null
}
export default MetaRootType
