import Route from '@ioc:Adonis/Core/Route'
import { ROLE_PERMISSION } from 'App/Constants/RolePermission'

Route
  .group(() => {
    
    Route
      .resource('roles', 'RoleController')
      .apiOnly()
      .middleware({
        'index': [`permissions:${ROLE_PERMISSION.LIST}`],
        'store': [`permissions:${ROLE_PERMISSION.CREATE}`],
        'show': [`permissions:${ROLE_PERMISSION.SHOW}`],
        'update': [`permissions:${ROLE_PERMISSION.UPDATE}`],
        'destroy': [`permissions:${ROLE_PERMISSION.DELETE}`],
      })

    // Route
    //   .resource('permissions', 'PermissionController')
    //   .apiOnly()
  })
  .namespace('App/Modules/Role/Controllers')
  .middleware('auth')
