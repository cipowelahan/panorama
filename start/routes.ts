import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.where('id', /^[0-9]+$/)

import "App/Modules/User/routes"
import "App/Modules/Role/routes"

Route.get('/', async () => {
  const healthCheck = await HealthCheck.getReport()
  return {
    appName: 'panorama',
    healthCheck: healthCheck
  }
})
