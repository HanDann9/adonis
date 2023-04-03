import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Validator from 'App/validators/validator'

class CourseValidator extends Validator {
  protected schemas(type: string) {
    switch (type) {
      case 'create':
        return schema.create({
          name: schema.string({ trim: true }, [rules.unique({ table: 'courses', column: 'name' })]),
          description: schema.string({ trim: true }),
        })
      case 'update':
        return schema.create({
          name: schema.string({ trim: true }),
          description: schema.string({ trim: true }),
        })
      default:
        return schema.create({})
    }
  }
}

export default new CourseValidator()
