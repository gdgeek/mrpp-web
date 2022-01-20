import { AbilityBuilder, Ability } from '@casl/ability'
export class AbilityRouter {
  constructor(path) {
    this.path = path
  }
}
export function UpdateAbility($ability, roles) {
  const { can, rules } = new AbilityBuilder(Ability)
  if (roles === null) {
    roles = []
  }
  const guest = [
    '/site',
    '/site/logout',
    '/site/index',
    '/site/wechat-signup',
    '/site/binded-email',
    '/404'
  ]

  guest.forEach(item => {
    if (typeof item === 'string') {
      can('goto', AbilityRouter.name, { path: item })
    } else {
      can('goto', AbilityRouter.name, { path: { $regex: item }})
    }
  })

  if (roles.find(role => role === 'user')) {
    const menu = [
      '/site/logout',
      '/resource',
      /^\/polygen/,
      /^\/picture/,
      /^\/video/,
      /^\/home/,
      /^\/verse/,
      /^\/settings/,
      /^\/discovery/,
      /^\/community/
    ]

    menu.forEach(item => {
      if (typeof item === 'string') {
        can(['open', 'goto'], AbilityRouter.name, { path: item })
      } else {
        can(['open', 'goto'], AbilityRouter.name, { path: { $regex: item }})
      }
    })
    const router = ['/verse/editor', '/verse/meta/editor', '/verse/code']

    router.forEach(item => {
      if (typeof item === 'string') {
        can(['goto'], AbilityRouter.name, { path: item })
      } else {
        can(['goto'], AbilityRouter.name, { path: { $regex: item }})
      }
    })
  }

  $ability.update(rules)
}
