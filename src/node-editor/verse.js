import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'
import AutoArrangePlugin from 'rete-auto-arrange-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import LimitPlugin from '@/node-editor/plugins/limit'
import MetaPlugin from '@/node-editor/plugins/meta'
import { Component } from './components/Component'

import { Meta, Verse } from './type/verseEditor'
let editor_ = null
let engine_ = null
export const arrange = function() {
  editor_.trigger('arrange', editor_.nodes)
}
export const toJson = function() {
  const json = editor_.toJSON()
  return json
}

export const initVerse = async function(container, verseId, root) {
  const types = [Meta, Verse]
  editor_ = new Rete.NodeEditor('MrPP@0.1.0', container)
  editor_.silent = true
  // alert(editor_.silent)
  editor_.use(ConnectionPlugin)
  editor_.use(VueRenderPlugin)
  editor_.use(ContextMenuPlugin)
  editor_.use(AutoArrangePlugin, { margin: { x: 50, y: 50 }, depth: 110 })
  editor_.use(AreaPlugin)
  editor_.use(LimitPlugin, [{ name: 'Verse', max: 1, min: 1 }])
  editor_.use(MetaPlugin, { verseId })
  engine_ = new Rete.Engine('MrPP@0.1.0')
  types.forEach(type => {
    editor_.register(new Component(type, root))
  })

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
export const fromJson = function(data) {
  // alert(data)
  // const obj = JSON.parse(data)
  editor_.fromJSON(data)
}
