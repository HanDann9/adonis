import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

function customMessages() {
  return {
    'name.required': 'Name field is required',
    'email.required': 'Email field is required',
    'email.unique': 'An account with this email already exists',
    'password.required': 'Password field is required',
    // 'password.minLength': 'Password must be at least ' + PASSWORD_MIN_LENGTH + ' characters long',
    'password_confirmation.required': 'Password confirmation is required',
    'password_confirmation.confirmed': 'Password and confirm password does not match.',
    // 'password_confirmation.minLength': 'Password must be at least ' + PASSWORD_MIN_LENGTH + ' characters long',
    // 'role.array': `Role must be one of the following value : ${roleIds.join(',')}`,
  }
}

export class create {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'admins', column: 'email' })]),
    roles: schema.string(),
    password: schema.string({ trim: true }),
  })

  public messages = customMessages()
}
