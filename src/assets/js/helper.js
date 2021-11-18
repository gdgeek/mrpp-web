import 'aframe'
function toFixedVector3 (vec, n) {
  const result = new THREE.Vector3()
  result.x = parseFloat(vec.x.toFixed(n))
  result.y = parseFloat(vec.y.toFixed(n))
  result.z = parseFloat(vec.z.toFixed(n))
  return result
}
export {
  toFixedVector3
}
