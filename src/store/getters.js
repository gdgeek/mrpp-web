const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userData: state => state.user.data,
  wxOpenid: state => state.user.wxOpenid,
  menu: state => state.user.menu,
  name: state => state.user.name
}
export default getters
