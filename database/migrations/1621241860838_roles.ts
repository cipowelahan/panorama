import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableNameRole = 'roles'
  protected tableNamePermission = 'permissions'

  protected tableNameRoleUser = 'role_users'
  protected tableNameRolePermission = 'role_permissions'

  public async up () {
    this.schema.createTable(this.tableNameRole, (table) => {
      table.increments('id')
      table.string('name').unique()
    })

    this.schema.createTable(this.tableNamePermission, (table) => {
      table.increments('id')
      table.string('name').unique()
    })

    this.schema.createTable(this.tableNameRoleUser, (table) => {
      table.bigIncrements('id')
      table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('role_id').unsigned().references('id').inTable(this.tableNameRole).onDelete('CASCADE')
    })

    this.schema.createTable(this.tableNameRolePermission, (table) => {
      table.bigIncrements('id')
      table.integer('role_id').unsigned().references('id').inTable(this.tableNameRole).onDelete('CASCADE')
      table.integer('permission_id').unsigned().references('id').inTable(this.tableNamePermission).onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableNameRole)
    this.schema.dropTable(this.tableNamePermission)
    this.schema.dropTable(this.tableNameRoleUser)
    this.schema.dropTable(this.tableNameRolePermission)
  }
}
