import { Ability } from '@casl/ability'
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userData: state => state.user.data,
  menu: state => {
    return state.menu.data
  },
  ability() {
    return new Ability()
  }
}
export default getters
