import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async registerShow({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const { email, password, name, roles } = request.all()
    const user = await User.create({ email, password, name, roles })

    await auth.use('web').login(user)

    return response.redirect('/')
  }

  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/admin/login')
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      await auth.use('web').attempt(email, password)

      return response.redirect('/admin')
    } catch (error) {
      session.flash('form', 'Your email or password is incorrect')
      return response.redirect().back()
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('web').logout()

    return response.redirect().toRoute('admin.login.show')
  }

  public async show({ view, auth, bouncer }: HttpContextContract) {
    await bouncer.authorize('showAdmin')

    return view.render('pages/admin/index', { roles: auth.user?.roles })
  }
}