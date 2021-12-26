/*!
 * rete-vue-render-plugin v0.5.1
 * (c) 2021 Vitaliy Stoliarov
 * Released under the MIT license.
 */

var randomWords = require('random-words')
function install(editor, options) {
  editor.on('nodecreate', component => {
    console.log(options)
    console.log(component)
    alert(11111)
    // component.data['name'] = 'adfse'
    // const meta = component.controls.get('meta')
    options.forEach((value, index, arr) => {
      // alert(value.component)
      // alert(component.name)

      if (value.component === component.name) {
        // alert(123)
        const control = component.controls.get(value.target)

        if (control !== null) {
          // alert(component.data[value.target])
          console.log('îiiiiiiiiiii')
          console.log(component.data)
          if (typeof component.data[value.target] === 'undefined') {
            // alert(component.data[value.target])
            component.data[value.target] = randomWords()
          }
        }
      }
    })

    return true
  })
}
export default {
  name: 'rete-randomwords',
  install: install
}
