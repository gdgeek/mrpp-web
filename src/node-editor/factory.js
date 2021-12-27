
export function Build(editor, data, input = null) {
  return new Promise((resolve, reject) => {
    const component = editor.getComponent(data.type)

    component
      .createNode(data.parameters)
      .then(node => {
        editor.addNode(node)

        if (input !== null) {
          editor.connect(node.outputs.get('out'), input)
        }

        if (
          typeof data.chieldren !== 'undefined' &&
            data.chieldren !== null
        ) {
          const keys = Object.keys(data.chieldren)
          if (keys.length === 0) {
            resolve(node)
            return
          }

          let count = 0
          keys.forEach(key => {
            data.chieldren[key].forEach(item => {
              count++
            })
          })
          if (count !== 0) {
            keys.forEach(key => {
              data.chieldren[key].forEach(item => {
                Build(editor, item, node.inputs.get(key))
                  .then(node => {
                    --count
                    if (count === 0) {
                      resolve(node)
                    }
                  })
                  .catch(e => {
                    reject(e)
                  })
              })
            })
          } else {
            resolve(node)
          }
        } else {
          resolve(node)
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}
