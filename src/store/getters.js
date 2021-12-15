const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  info: state => state.user.info,
  wxOpenid: state => state.user.wxOpenid,
  menu: state => state.user.menu,
  name: state => state.user.name
}
export default getters
