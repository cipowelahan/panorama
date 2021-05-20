import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PermissionValidationDto } from '../Validations/PermissionValidation';
import Permission from './Entities/Permission'

export default class PermissionRepository {
  public async index({ request }: HttpContextContract) {
    const urlQuery = request.qs()
    return await Permission
      .query()
      .if(urlQuery.search, (query) => {
        query.where('name', 'ilike', `%${urlQuery.search}%`)
      })
      .orderBy('name', 'asc')
  }

  public async find(id: number) {
    return await Permission.findOrFail(id)
  }

  public async store(data: PermissionValidationDto) {
    const permission = new Permission()
    permission.fill(data)
    await permission.save()
    return await this.find(permission.id)
  }

  public async update(id: number, data: PermissionValidationDto) {
    const permission = await this.find(id)
    permission.merge({ ...data })
    await permission.save()
    return this.find(permission.id)
  }

  public async destroy(id: number) {
    const permission = await this.find(id)
    await permission.delete()
  }
}