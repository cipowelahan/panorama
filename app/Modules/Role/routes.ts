import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    
    Route
      .resource('roles', 'RoleController')
      .apiOnly()

    Route
      .resource('permissions', 'PermissionController')
      .apiOnly()
  })
  .namespace('App/Modules/Role/Controllers')
  .middleware('auth')
