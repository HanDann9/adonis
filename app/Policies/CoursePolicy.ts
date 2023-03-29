import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Admin from 'App/Models/Admin'

export default class CoursePolicy extends BasePolicy {
  // Admin
  public async adminView(admin: Admin) {
    return admin.roles === 'root' || admin.roles === 'admin'
  }

  // User
  public async userView(user: User) {
    return user.roles === 'user'
  }
}
