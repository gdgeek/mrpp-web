import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'
import AutoArrangePlugin from 'rete-auto-arrange-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
import LimitPlugin from '@/node-editor/plugins/limit'
// import AddComponent from '@/node-editor/components/addComponent'
// import AutoSavePlugin from '@/node-editor/plugins/autoSave'
import RandomStringPlugin from '@/node-editor/plugins/randomString'
import { Component } from './components/Component'

import {
  MetaRoot,
  Polygen,
  Picture,
  Video,
  Entity,
  Transparent,
  Rotate,
  LockedScale,
  ImageTarget,
  Toolbar,
  Button,
  Action
} from './type/metaEditor'

let editor_ = null
let engine_ = null

export const arrange = function() {
  console.log(editor_.nodes.length)
  if (editor_.nodes.length > 0) {
    editor_.trigger('arrange', editor_.nodes)
  }
}
export const toJson = function() {
  const json = editor_.toJSON()
  return json
}
export const fromJson = function(data) {
  editor_.fromJSON(data)
  // setTimeout(arrange, 100)
  // arrange()
}

export const firstTime = async function() {
  const comp = editor_.getComponent('MetaRoot')
  if (comp === null) { return }
  const node = await comp.createNode()
  node.position = [0, 0]
  editor_.addNode(node)
}

export const initMeta = async function(parameter) {
  const types = [
    MetaRoot,
    Entity,
    Polygen,
    Picture,
    Video,
    Transparent,
    Rotate,
    LockedScale,
    ImageTarget,
    Toolbar,
    Button,
    Action
  ]
  editor_ = new Rete.NodeEditor('MrPP@0.1.0', parameter.container)
  editor_.silent = true
  editor_.use(ConnectionPlugin)
  editor_.use(VueRenderPlugin)
  // editor_.use(AutoSavePlugin, { metaId: parameter.metaId, root: parameter.root })
  editor_.use(ContextMenuPlugin, {
    delay: 100,
    allocate(component) {
      if (typeof component.type_.allocate !== 'undefined') {
        return component.type_.allocate
      }

      return []
    },
    rename(component) {
      console.log(component)
      return component.name
    }
  })
  editor_.use(AutoArrangePlugin, { margin: { x: 50, y: 50 }, depth: 110 })
  editor_.use(AreaPlugin)
  editor_.use(LimitPlugin, [{ name: 'MetaRoot', max: 1, min: 1 }])
  editor_.use(RandomStringPlugin, [
    { component: 'Polygen', target: 'name' },
    { component: 'Video', target: 'name' },
    { component: 'Picture', target: 'name' },
    { component: 'Entity', target: 'name' },
    { component: 'Button', target: 'title' },
    { component: 'Action', target: 'title' }
  ])

  engine_ = new Rete.Engine('MrPP@0.1.0')
  types.forEach(type => {
    editor_.register(new Component(type, parameter.root))
  })
  // editor_.register(new AddComponent())

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
  // editor_.trigger('save')

  // setTimeout(arrange, 100)
}
