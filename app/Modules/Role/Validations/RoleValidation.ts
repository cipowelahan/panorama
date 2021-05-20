import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export class RoleValidationDto {
  public name: string
  public permissions: Array<number>
}

export class RoleValidation {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ escape: true, trim: true }, [ rules.unique({ table: 'roles', column: 'name'} ) ]),
    permissions: schema.array([rules.required()]).members(schema.number([rules.exists({ table: 'permissions', column: 'id' })]))
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    required: '{{ field }} is required'
  }
}