/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
     */
    switch (error.code) {
      case 'E_UNAUTHORIZED_ACCESS':
        Logger.warn('You are not authorized to perform this action')
        const redirectUrl = ctx.request.url(true).includes('admin') ? '/admin/login' : '/login'
        return ctx.response.redirect(redirectUrl)
      case 'E_AUTHORIZATION_FAILURE':
        Logger.warn('You are not authorized to perform this action')
        return ctx.response.status(500).send('You are not authorized to perform this action')
      default:
        break
    }
    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }
}
