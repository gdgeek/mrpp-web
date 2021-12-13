/*!
 * rete-vue-render-plugin v0.5.1
 * (c) 2021 Vitaliy Stoliarov
 * Released under the MIT license.
 */

Object.defineProperty(exports, '__esModule', { value: true })

let _editor = null
let _saving = null
let _saved = null
let _data = null
function install(editor, _ref3) {
  _editor = editor
}
function save(){
   if (_editor.silent) {
     return false
   }

   var data = JSON.stringify(_editor.toJSON())
   
   if (_saving) {
     _saving()
   }
   console.log(data)
   if (data != _data) {
     _data = data
    /* saveRete(_data, ).then(()=>{
      if (_saved) {
        _saved()
      }
     })*/
     // save
     /*
     $.post({
       url: MrPP.DB.options['url'],
       data: {
         json: MrPP.DB.data,
         serialization: '',
         options: MrPP.DB.options
       },
       success: function (result) {
         console.log('db success')
         if (MrPP.DB.on_saved) {
           MrPP.DB.on_saved()
         }
       }
     }).fail(function (result, result1, result2) {
       console.log(result)
       console.log(result1)
       console.log(result2)
     })*/
     return true
   } else {
     if (_saved){
        _saved()
     } 
     return false
   }
}
var index = {
  name: 'rete-store',
  install: install
}

exports.default = index
//# sourceMappingURL=vue-render-plugin.common.js.map
