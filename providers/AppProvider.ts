import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready

    const Response = this.app.container.use('Adonis/Core/Response')

    Response.macro('sendData', function(data: any, message: string = "OK", codeHttp: number = 200) {
      return this.ctx!.response.status(codeHttp).send({
        code: codeHttp,
        message: message,
        data: data
      })
    })

    Response.macro('sendError', function(error: any = [], message: string = 'Error', codeHttp: number = 400) {
      return this.ctx!.response.status(codeHttp).send({
        code: codeHttp,
        message: message,
        errors: error
      })
    })
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
