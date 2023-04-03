import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Admin from 'App/Models/Admin'

export default class CoursePolicy extends BasePolicy {
  public async view(admin: Admin) {
    return admin.roles === 'root' || admin.roles === 'admin'
  }

  public async create(admin: Admin) {
    return admin.roles === 'root' || admin.roles === 'user'
  }

  public async isPublished(admin: Admin) {
    return admin.roles !== 'guest'
  }

  public async update(admin: Admin) {
    return admin.roles === 'root'
  }

  public async delete(admin: Admin) {
    return admin.roles === 'root'
  }
}
