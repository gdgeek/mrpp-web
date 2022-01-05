const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userData: state => state.user.data,
  wxOpenid: state => state.user.wxOpenid,
  menu: state => state.user.menu,
  name: state => state.user.name,
  evenOrOdd: state => (state.count % 2 === 0 ? 'even' : 'odd')
}
export default getters
