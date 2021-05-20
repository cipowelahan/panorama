import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from './Permission'

export default class Role extends BaseModel {
  public static table = 'roles'

  @column({ isPrimary: true, serialize: ((value) => Number(value)) })
  public id: number

  @column()
  public name: string

  @manyToMany(() => Permission, {
    pivotTable: 'role_permissions',
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'permission_id'
  })
  public permissions: ManyToMany<typeof Permission>
}