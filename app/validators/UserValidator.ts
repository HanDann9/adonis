import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Validator from 'App/validators/validator'

class UserValidator extends Validator {
  protected schemas(type: string) {
    switch (type) {
      case 'create':
        return schema.create({
          name: schema.string({ trim: true }),
          email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'admins', column: 'email' })]),
          roles: schema.string(),
          password: schema.string({ trim: true }),
        })
      case 'update':
        return schema.create({
          name: schema.string({ trim: true }),
          email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'admins', column: 'email' })]),
          roles: schema.string(),
          password: schema.string({ trim: true }),
        })
      default:
        return schema.create({})
    }
  }
}

export default new UserValidator()
