import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'
import AutoArrangePlugin from 'rete-auto-arrange-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import Store from '@/assets/js/rete/store'
import Limit from '@/assets/js/rete/limit'
import { Component } from './components/Component'
import { VerseComponent } from './components/verseComponent'

import { Meta } from './type'
let editor_ = null
let engine_ = null
export const arrange = function() {
  // editor_.arrange(node, editor_.nodes)
  editor_.trigger('arrange', editor_.nodes)
}
export const toJson = function() {
  const json = editor_.toJSON()
  return json
}
export const init = async function(container) {
//  MetaType a
  const types = [Meta]
  const verseComponent = new VerseComponent()

  editor_ = new Rete.NodeEditor('MrPP@0.1.0', container)
  editor_.use(ConnectionPlugin)
  editor_.use(VueRenderPlugin)
  editor_.use(ContextMenuPlugin)
  editor_.use(AutoArrangePlugin, { margin: { x: 50, y: 50 }, depth: 110 })
  editor_.use(AreaPlugin)
  editor_.use(Store)
  editor_.use(Limit, [{ name: 'Verse', max: 1, min: 1 }])

  engine_ = new Rete.Engine('MrPP@0.1.0')
  types.forEach(type => {
    editor_.register(new Component(type))
  })
  editor_.register(verseComponent)

  const verse = await verseComponent.createNode()
  verse.position = [0, 0]
  editor_.addNode(verse)
  editor_.on(
    'process nodecreated noderemoved connectioncreated connectionremoved',
    async() => {
      await engine_.abort()
      await engine_.process(editor_.toJSON())
    }
  )

  editor_.view.resize()
  AreaPlugin.zoomAt(editor_)
  editor_.trigger('process')
}
