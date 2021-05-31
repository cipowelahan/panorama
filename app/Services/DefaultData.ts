import {
  ROLE_DEFAULT,
  USER_PERMISSION,
  ROLE_PERMISSION,
  PERMISSION_PERMISSION
} from 'App/Constants/RolePermission'

import Permission from 'App/Modules/Role/Repositories/Entities/Permission'
import Role from 'App/Modules/Role/Repositories/Entities/Role'
import User from 'App/Modules/User/Repositories/Entities/User'

class DefaultData {
  public async run(): Promise<string> {
    const permissions = await this.handlePermission()
    for (const roleDefault of Object.values(ROLE_DEFAULT)) {
      await Role.firstOrCreate({name: roleDefault})
    }

    const permissionsSync = permissions.map((permission) => permission.id)
    const superAdmin = await Role.findByOrFail('name', ROLE_DEFAULT.SUPERADMIN)
    await superAdmin.related('permissions').sync(permissionsSync)

    // HANDLE OTHER ROLE
    await this.handleRoleAdmin(permissions)
    await this.handleRoleStaff(permissions)

    // DEFAULT USER
    const users = await User.first()
    if (users) {
      return "update permissions and sync to superadmin"
    }
    else {
      const { defaultSuperAdmin } = await import('Config/values')
      const user = new User()
      user.fill(defaultSuperAdmin)
      await user.save()
      await user.related('roles').sync([superAdmin.id])
      return "update permissions and new superadmin"
    }
  }

  private async handlePermission(): Promise<Permission[]> {
    const syncId: Permission[] = []

    for (const userPermission of Object.values(USER_PERMISSION)) {
      const up = await Permission.firstOrCreate({ name: userPermission })
      syncId.push(up)
    }

    for (const rolePermission of Object.values(ROLE_PERMISSION)) {
      const rp = await Permission.firstOrCreate({ name: rolePermission })
      syncId.push(rp)
    }

    for (const permissionPermission of Object.values(PERMISSION_PERMISSION)) {
      const rp = await Permission.firstOrCreate({ name: permissionPermission })
      syncId.push(rp)
    }

    return syncId
  }

  private async handleRoleAdmin(permissions: Permission[]) {
    const permissionsSync: Array<number> = []

    const userPermission: Array<string> = []
    for (const up of Object.values(USER_PERMISSION)) {
      userPermission.push(up)
    }
    const filterUser = permissions.filter((permission) => userPermission.includes(permission.name))
    const userSync = filterUser.map((us) => us.id)
    permissionsSync.push(...userSync)

    const rolePermissionPermission: Array<string> = []
    for (const up of [ROLE_PERMISSION.LIST, ROLE_PERMISSION.SHOW, PERMISSION_PERMISSION.LIST, PERMISSION_PERMISSION.SHOW]) {
      rolePermissionPermission.push(up)
    }
    const filterRolePermission = permissions.filter((permission) => rolePermissionPermission.includes(permission.name))
    const rolePermissionSync = filterRolePermission.map((us) => us.id)
    permissionsSync.push(...rolePermissionSync)

    const admin = await Role.findByOrFail('name', ROLE_DEFAULT.ADMIN)
    await admin.related('permissions').sync(permissionsSync)
  }

  private async handleRoleStaff(permissions: Permission[]) {
    const permissionsSync: Array<number> = []

    const rolePermissionPermission: Array<string> = []
    for (const up of [ROLE_PERMISSION.LIST, ROLE_PERMISSION.SHOW, PERMISSION_PERMISSION.LIST, PERMISSION_PERMISSION.SHOW]) {
      rolePermissionPermission.push(up)
    }
    const filterRolePermission = permissions.filter((permission) => rolePermissionPermission.includes(permission.name))
    const rolePermissionSync = filterRolePermission.map((us) => us.id)
    permissionsSync.push(...rolePermissionSync)

    const staff = await Role.findByOrFail('name', ROLE_DEFAULT.STAFF)
    await staff.related('permissions').sync(permissionsSync)
  }
}

export default new DefaultData()