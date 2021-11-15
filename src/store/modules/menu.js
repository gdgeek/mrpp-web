const state = {
  items: [
    {
      type: 'item',
      isHeader: true,
      name: '混合现实编程平台'
    }
  ]
}
function title() {
  const items = []
  items.push(
    {
      type: 'item',
      isHeader: true,
      name: '混合现实编程平台'
    }
  )
  return items
}
function tree(info) {
  const items = []
  info.forEach(
    function(item, index) {
      if (item.items) {
        items.push(
          {
            type: 'truee',
            icon: 'fa fa-' + item.icon,
            name: item.label,
            items: tree(item.items)
          }
        )
      } else {
        items.push(
          {
            type: 'item',
            icon: 'fa fa-' + item.icon,
            name: item.label,
            router: {
              name: item.url[0]
            }
          }
        )
      }
    }
  )
  return items
}
const mutations = {
  saveMenu(state, info) {
    state.items = title().concat(tree(info))
  }
}

export default {
  state,
  mutations
}
