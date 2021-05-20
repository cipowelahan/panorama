import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Permission extends BaseModel {
  public static table = 'permissions'

  @column({ isPrimary: true, serialize: ((value) => Number(value)) })
  public id: number

  @column()
  public name: string
}