import 'aframe'
function toFixedVector3(vec, n){
   const result = new THREE.Vector3()
   result.x = vec.x.toFixed(n)
   result.y = vec.y.toFixed(n)
   result.z = vec.z.toFixed(n)
   return result
}
export {
    toFixedVector3
  }
  