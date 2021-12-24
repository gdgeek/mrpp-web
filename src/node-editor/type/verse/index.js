import { MetaSocket } from '@/node-editor/sockets/sockets'

// import { MetaSocket } from '@/node-editor/sockets/sockets'
var VerseType = {
  title: 'Verse',

  controls: [
    {
      type: 'verse-name',
      key: 'verse',
      readonly: true
    }
  ],

  inputs: [
    {
      key: 'meta-in',
      title: 'Meta',
      socket: MetaSocket,
      multiConns: true
    }
  ]
}
export default VerseType
