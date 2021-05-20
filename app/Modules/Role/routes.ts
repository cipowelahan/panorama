import Route from '@ioc:Adonis/Core/Route'
import PermissionController from './Controllers/PermissionController'

Route
  .group(() => {

  })
  .prefix('roles')
  .middleware('auth')

Route
  .group(() => {
    Route.get('/', (ctx) => new PermissionController().index(ctx))
    Route.post('/', (ctx) => new PermissionController().store(ctx))
    Route.get('/:id', (ctx) => new PermissionController().find(ctx))
    Route.put('/:id', (ctx) => new PermissionController().update(ctx))
    Route.delete('/:id', (ctx) => new PermissionController().destroy(ctx))
  })
  .prefix('permissions')
  .middleware('auth')
