import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RoleValidationDto } from '../Validations/RoleValidation';
import Role from './Entities/Role'

export default class RoleRepository {
  public async index({ request }: HttpContextContract) {
    const urlQuery = request.qs()
    return await Role
      .query()
      .if(urlQuery.search, (query) => {
        query.where('name', 'ilike', `%${urlQuery.search}%`)
      })
      .orderBy('name', 'asc')
  }

  public async find(id: number) {
    return await Role.findOrFail(id)
  }

  public async findWithPermissions(id: number) {
    return await Role.query().preload('permissions').where('id', id)
  }

  public async store(data: RoleValidationDto) {
    const role = new Role()
    role.name = data.name
    await role.save()
    await role.related('permissions').sync(data.permissions)
    return await this.find(role.id)
  }

  public async update(id: number, data: RoleValidationDto) {
    const role = await this.find(id)
    role.name = data.name
    await role.save()
    await role.related('permissions').sync(data.permissions)
    return this.find(role.id)
  }

  public async destroy(id: number) {
    const role = await this.find(id)
    await role.delete()
  }
}