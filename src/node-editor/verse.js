import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'
import AutoArrangePlugin from 'rete-auto-arrange-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import LimitPlugin from '@/node-editor/plugins/limit'
import MetaPlugin from '@/node-editor/plugins/meta'
import { Component } from '@/node-editor/components/Component'
import { Meta, Verse } from '@/node-editor/type/verseEditor'
import { Build } from '@/node-editor/factory'

let editor_ = null
let engine_ = null
export const arrange = function() {
  editor_.trigger('arrange', editor_.nodes)
}
export const toJson = function() {
  const json = editor_.toJSON()
  return json
}
export const process = async function() {
  editor_.trigger('process', { status: 'save' })
}
export const firstTime = async function() {
  const comp = editor_.getComponent('Verse')
  const node = await comp.createNode()
  node.position = [0, 0]
  editor_.addNode(node)

  editor_.view.resize()
  AreaPlugin.zoomAt(editor_)
  editor_.trigger('process', { status: 'first' })

  setTimeout(arrange, 100)
}
export const setup = function(data) {
  Build({ editor: editor_ }, JSON.parse(data)).then(node => {
    editor_.view.resize()
    setTimeout(arrange, 100)
  })
}
export const initVerse = async function({ container, verseId, root }) {
  const types = [Meta, Verse]
  editor_ = new Rete.NodeEditor('MrPP@0.1.0', container)
  editor_.use(ConnectionPlugin)
  editor_.use(VueRenderPlugin)
  editor_.use(ContextMenuPlugin)
  editor_.use(AutoArrangePlugin, { margin: { x: 50, y: 50 }, depth: 110 })
  editor_.use(AreaPlugin)
  editor_.use(LimitPlugin, [{ name: 'Verse', max: 1, min: 1 }])
  editor_.use(MetaPlugin, { verseId })
  engine_ = new Rete.Engine('MrPP@0.1.0')

  types.forEach(type => {
    const component = new Component(type, root)
    editor_.register(component)
    engine_.register(component)
  })
  editor_.on('process', async e => {
    if (typeof e === 'object' && typeof e.status === 'string') {
      if (e.status === 'save') {
        await engine_.abort()
        await engine_.process(editor_.toJSON(), null, function(data) {
          root.$store.dispatch('verse/saveVerse', data).then(response => {
            console.log(response)
          })
        })
      }
    }
  })

  editor_.view.resize()
  AreaPlugin.zoomAt(editor_)
  editor_.trigger('process', { status: 'init' })
}
export const fromJson = function(data) {
  editor_.silent = true
  editor_.fromJSON(data)
}
