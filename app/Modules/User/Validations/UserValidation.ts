import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export class UserStoreValidationDto {
  public name: string
  public email: string
  public password: string
}

export class UserStoreValidation {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({escape: true, trim: true }),
    email: schema.string({ escape: true, trim: true }, [ rules.email(), rules.unique({ table: 'users', column: 'email', where: { deleted_at: null }}) ]),
    password: schema.string({}, [ rules.minLength(6), rules.maxLength(18) ])
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    required: '{{ field }} is required',
    email: 'invalid format email on {{ field }}',
    'password.minLength': 'password min 6 character',
    'password.maxLength': 'password max 6 character',
    'password.string': 'password must contain character'
  }

}

export class UserUpdateValidationDto {
  public name: string
}

export class UserUpdateValidation {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({escape: true, trim: true }),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    required: '{{ field }} is required'
  }

}
