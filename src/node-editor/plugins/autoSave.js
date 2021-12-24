/*!
 * rete-vue-render-plugin v0.5.1
 * (c) 2021 Vitaliy Stoliarov
 * Released under the MIT license.
 */
import { putMetaRete } from '@/api/v1/metaRete'

let editor_ = null
let root_ = -1

function install(editor, options) {
  editor_ = editor
  root_ = options.root
  editor.on(
    'process nodecreated noderemoved connectioncreated connectionremoved',
    e => {
      const data = JSON.stringify(editor.toJSON())
      if (editor.silent === false) {
        if (root_.$store.state.meta.data.reteData !== data) {
          // save()
        }
      }
      root_.$store.commit('setMetaReteData', data)
      return true
    }
  )
}
function save() {
  const json = editor_.toJSON()
  putMetaRete(root_.$store.state.meta.data.reteId, {
    meta_id: root_.$store.state.meta.data.id,
    data: JSON.stringify(json)
  }).then(response => {
    console.log(response)
  })
}
export default {
  name: 'rete-audosave',
  install: install,
  save: save
}
