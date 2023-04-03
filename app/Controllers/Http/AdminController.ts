import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminValidator from 'App/validators/AdminValidator'
import Admin from 'App/Models/Admin'

export default class AuthController {
  public async registerShow({ view }: HttpContextContract) {
    return view.render('admin/auth/register')
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await AdminValidator.validate(request.all(), 'create')
    const admin = await Admin.create(payload)
    await auth.use('admin').login(admin)
    return response.redirect('/')
  }

  public async loginShow({ view }: HttpContextContract) {
    return view.render('admin/auth/login')
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      await auth.use('admin').attempt(email, password)
      return response.redirect('/')
    } catch (error) {
      session.flash('form', 'Your email or password is incorrect')
      return response.redirect().back()
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('admin').logout()
    return response.redirect().toRoute('admin.login.show')
  }
}
