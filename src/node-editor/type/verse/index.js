import { MetaSocket } from '@/node-editor/sockets/sockets'

var VerseType = {
  title: 'Verse',
  root: true,
  controls: [
    {
      type: 'verse-name',
      key: 'verse',
      readonly: true
    }
  ],

  inputs: [
    {
      key: 'metas',
      title: 'Meta',
      socket: MetaSocket,
      multiConns: true
    }
  ]
}
export default VerseType
