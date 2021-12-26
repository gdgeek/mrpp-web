function createNode(editor, data, input) {
  return new Promise((resolve, reject) => {
    const component = editor.getComponent(data.type)
    component.createNode(data.parameters).then(node => {
      editor.addNode(node)
      editor.connect(node.outputs.get('out'), input)
      if (typeof data.chieldren !== 'undefined' && data.chieldren !== null) {
        let count = 0
        const keys = Object.keys(data.chieldren)
        keys.forEach(key => {
          data.chieldren[key].forEach(item => {
            createNode(editor, item, node, key).then(n => {
              ++count
              if (count === keys.length) {
                resolve(node)
              }
            })
          })
        })
      } else {
        resolve(node)
      }
    })
  })
}
export function Build({ editor }, data) {
  return new Promise((resolve, reject) => {
    const component = editor.getComponent(data.type)
    component.createNode(data.parameters).then(node => {
      editor.addNode(node)

      if (typeof data.chieldren !== 'undefined' && data.chieldren !== null) {
        let count = 0
        const keys = Object.keys(data.chieldren)
        keys.forEach(key => {
          data.chieldren[key].forEach(item => {
            createNode(editor, item, node.inputs.get(key)).then(n => {
              ++count
              if (count === keys.length) {
                resolve(node)
              }
            })
          })
        })
      } else {
        resolve(node)
      }
    })
  })
}
