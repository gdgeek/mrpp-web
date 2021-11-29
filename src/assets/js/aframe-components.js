import 'aframe'
import {toFixedVector3} from './helper.js'
const AFRAME = window.AFRAME
AFRAME.registerComponent('target-scale', {
  schema: {
    target: {
      type: 'number',
      default: 1
    },
    callback: {
      type: 'string',
      default: null
    }
  },
  init () {
    this.el.addEventListener('model-loaded', this.rescale.bind(this))
  },
  rescale () {

    const el = this.el
    const data = this.data
    const model = el.object3D
    const box = new THREE.Box3().setFromObject(model)
    const center = new THREE.Vector3()
    box.getCenter(center)
    console.log(center)
    const size = new THREE.Vector3()
    box.getSize(size)
    console.log(size)
    if (!size.x && !size.y && !size.z) {
      return
    }
    let scale = 1
    if (data.target) {
      scale = data.target / size.x
    }
    console.log(scale)
    el.setAttribute('position', {x: -center.x * scale, y: -center.y * scale, z: -center.z * scale})
    el.setAttribute('scale', `${scale} ${scale} ${scale}`)
    if (this.data.callback !== null) {
      window[this.data.callback](toFixedVector3(center, 5), toFixedVector3(size, 5))
    }
  }
})
