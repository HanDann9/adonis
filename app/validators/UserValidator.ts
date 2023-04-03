import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class create {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    roles: schema.string(),
    password: schema.string({ trim: true }),
  })
}
