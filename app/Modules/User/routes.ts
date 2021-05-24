import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {

    Route
      .group(() => {
        Route.post('/register', 'AuthController.register')
        Route.post('/login', 'AuthController.login')
    
        Route
          .group(() => {
            Route.post('/logout', 'AuthController.logout')
            Route.post('/logout-all', 'AuthController.logoutAll')
            Route.get('/user', 'AuthController.getProfile')
            Route.put('/password', 'AuthController.changePassword')
            Route.put('/email', 'AuthController.changeEmail')
          })
          .middleware('auth')
    
      })
      .prefix('/auth')

      Route
        .resource('users', 'UserController')
        .apiOnly()
        .middleware({
          '*': ['auth']
        })

  })
  .namespace('App/Modules/User/Controllers')